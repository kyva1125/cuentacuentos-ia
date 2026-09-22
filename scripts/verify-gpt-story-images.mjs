import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { branchImageManifest, flattenPlan } from './branch-images.manifest.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = await readFile(join(root, 'src', 'App.tsx'), 'utf8');
const imageGenerator = await readFile(join(root, 'server', 'image-generation.js'), 'utf8');
const packageManifest = await readFile(join(root, 'package.json'), 'utf8');
const assets = join(root, 'src', 'assets');
const strict = process.argv.includes('--strict');

const storyIds = [...source.matchAll(/^\s+id: "([^"]+)"/gm)].map((match) => match[1]);
const setBody = source.match(/const fullyRegeneratedStoryIds = new Set\(\[([\s\S]*?)\]\);/)?.[1] ?? '';
const activeIds = new Set([...setBody.matchAll(/"([^"]+)"/g)].map((match) => match[1]));

const hashOf = async (file) => {
  try {
    const content = await readFile(file);
    if ((await stat(file)).size === 0) return { missing: true };
    return { hash: createHash('sha256').update(content).digest('hex') };
  } catch {
    return { missing: true };
  }
};

// ── 1. Secuencia plana de 5 escenas por cuento (una imagen distinta por capítulo) ──
const report = [];
const activeHashOwners = new Map();
for (const id of storyIds) {
  const results = await Promise.all(
    Array.from({ length: 5 }, (_, index) =>
      hashOf(join(assets, `${id}-scene-${index + 1}-v2.webp`)),
    ),
  );
  const hashes = results.filter((r) => r.hash).map((r) => r.hash);
  const missing = results
    .map((r, index) => (r.missing ? `scene-${index + 1}` : null))
    .filter(Boolean);
  report.push({
    id,
    active: activeIds.has(id),
    ready: activeIds.has(id) && missing.length === 0 && new Set(hashes).size === 5,
    missing: missing.length,
    duplicateWebp: hashes.length === 5 && new Set(hashes).size !== 5,
    hashes,
  });
  if (activeIds.has(id)) {
    hashes.forEach((hash, index) => {
      const owners = activeHashOwners.get(hash) ?? [];
      owners.push(`${id}:scene-${index + 1}`);
      activeHashOwners.set(hash, owners);
    });
  }
}
const sharedHashes = new Set(
  [...activeHashOwners.entries()]
    .filter(([, owners]) => new Set(owners.map((owner) => owner.split(':')[0])).size > 1)
    .map(([hash]) => hash),
);
for (const story of report) {
  story.duplicateAcrossStories = story.active && story.hashes.some((hash) => sharedHashes.has(hash));
  story.ready &&= !story.duplicateAcrossStories;
}
const pending = report.filter((story) => !story.ready);
const withDuplicateChapters = report.filter((s) => s.active && s.duplicateWebp);
const withSharedImages = report.filter((s) => s.duplicateAcrossStories);

// ── 2. Imágenes del modelo ramificado (D1+D2): 1 compartida + 3 ramas (pág. 2) ──
//    + 3 ramas × 3 sub-caminos × 3 (páginas 3-5) = 31 por historia.
const branchReport = [];
const branchHashOwners = new Map();
const planByStory = new Map();
for (const job of flattenPlan()) {
  if (!planByStory.has(job.storyId)) planByStory.set(job.storyId, []);
  planByStory.get(job.storyId).push(job);
}
for (const [id, jobs] of planByStory) {
  const openingExists = branchImageManifest[id]?.openingExists;
  const files = [];
  if (openingExists) files.push({ label: 'scene-1 (compartida)', file: `${id}-scene-1-v2.webp` });
  for (const job of jobs) files.push({ label: `${job.slug ?? 'scene-1'}-s${job.scene}`, file: job.file });
  const results = await Promise.all(files.map(({ file }) => hashOf(join(assets, file))));
  const present = results.filter((r) => r.hash);
  const missing = files.filter((_, index) => results[index].missing).map((f) => f.label);
  results.forEach((r, index) => {
    if (!r.hash) return;
    const owners = branchHashOwners.get(r.hash) ?? [];
    owners.push(`${id}:${files[index].label}`);
    branchHashOwners.set(r.hash, owners);
  });
  branchReport.push({
    id,
    expected: files.length,
    present: present.length,
    missing,
    duplicateWithinStory: present.length > 0 && new Set(present.map((r) => r.hash)).size !== present.length,
  });
}
const branchSharedHashes = new Set(
  [...branchHashOwners.entries()]
    .filter(([, owners]) => new Set(owners.map((o) => o.split(':')[0])).size > 1)
    .map(([hash]) => hash),
);
for (const story of branchReport) {
  story.ready =
    story.missing.length === 0 && !story.duplicateWithinStory && !branchSharedHashes.size;
}
const branchPending = branchReport.filter((s) => !s.ready);
const branchImagesFullyReady = branchReport.length > 0 && branchPending.length === 0;

// ── 3. Configuración de proveedor de imagen ──
// `image-generation.js` pasó a ser config-driven (base URL y modelo por
// entorno, para poder usar Together como pasarela). Estas comprobaciones
// seguían exigiendo el literal `https://api.openai.com/v1/images/generations` y
// el literal `^gpt-image-`, que ya no existen: `npm test` fallaba por eso desde
// entonces, no por las imágenes. Se comprueba lo que sigue importando: modelo
// por defecto de la familia GPT Image, override por OPENAI_IMAGE_MODEL,
// lista blanca de familias permitidas y el endpoint /images/generations.
const gptImageConfigured =
  /DEFAULT_IMAGE_MODEL\s*=\s*['"]gpt-image-/i.test(imageGenerator) &&
  /OPENAI_IMAGE_MODEL/.test(imageGenerator) &&
  /ALLOWED\s*=\s*\/[^\n]*gpt-image-/i.test(imageGenerator) &&
  /OPENAI_BASE_URL[^\n]*https:\/\/api\.openai\.com\/v1/.test(imageGenerator) &&
  /\/images\/generations/.test(imageGenerator);
const allCatalogStoriesUseGptSequences =
  storyIds.length === new Set(storyIds).size &&
  storyIds.every((id) => activeIds.has(id)) &&
  activeIds.size === storyIds.length;
const legacyImageProviderDisabled =
  !/leonardo:worker|leonardo-worker|flux[^\n]*image/i.test(packageManifest) &&
  !/api\.together[^\n]*images|cdn\.leonardo\.ai/i.test(imageGenerator);

// ── Salida ──
console.table(
  report.map(({ id, active, ready, missing, duplicateWebp, duplicateAcrossStories }) => ({
    id,
    active,
    ready,
    missing,
    duplicateWebp,
    duplicateAcrossStories,
  })),
);
console.log(`GPT WebP sequences ready: ${report.length - pending.length}/${report.length}`);
console.log(
  `Distinct image per chapter (within story): ${withDuplicateChapters.length === 0 ? 'yes, all 70' : 'NO — ' + withDuplicateChapters.map((s) => s.id).join(', ')}`,
);
console.log(
  `No image shared between stories: ${withSharedImages.length === 0 ? 'yes' : 'NO — ' + withSharedImages.map((s) => s.id).join(', ')}`,
);
console.log(`GPT Image configured for new chapters: ${gptImageConfigured ? 'yes' : 'no'}`);
console.log(`All catalog stories use GPT sequences: ${allCatalogStoriesUseGptSequences ? 'yes' : 'no'}`);
console.log(`Legacy image providers disabled: ${legacyImageProviderDisabled ? 'yes' : 'no'}`);

console.log('\n── Branch model images (per-decision-path) ──');
console.table(
  branchReport.map(({ id, present, expected, missing, duplicateWithinStory }) => ({
    id,
    present: `${present}/${expected}`,
    missing: missing.length,
    duplicateWithinStory,
  })),
);
console.log(
  `Branch images fully ready: ${branchImagesFullyReady ? 'yes' : `no — pending generation (${branchPending.map((s) => s.id).join(', ')}). Run: node --env-file=server/.env scripts/generate-branch-images.mjs --yes`}`,
);

// El fallo de `npm test` solo depende de la secuencia plana + config (lo que ya
// está en producción). Las imágenes de rama pendientes no rompen el build salvo
// que se pase --strict.
const hardFail =
  pending.length ||
  !gptImageConfigured ||
  !allCatalogStoriesUseGptSequences ||
  !legacyImageProviderDisabled;
const strictFail = strict && !branchImagesFullyReady;
if (hardFail || strictFail) process.exitCode = 1;
