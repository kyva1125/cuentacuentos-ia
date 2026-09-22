// Generación por lotes de las imágenes del modelo de lectura ramificada.
//
//   node scripts/generate-branch-images.mjs                 # DRY RUN: solo imprime el plan
//   node --env-file=server/.env scripts/generate-branch-images.mjs --yes
//   ... --story mila-brujula --slug canto --scene 3 --limit 4 --force --delay 2000
//
// Requiere OPENAI_API_KEY en el entorno (usa server/image-generation.js, que
// solo acepta modelos gpt-image-*). Sin --yes no llama a la API ni gasta nada.
//
// Salida: src/assets/<archivo>.webp  +  scripts/branch-images.report.json

import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { flattenPlan } from "./branch-images.manifest.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));

const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const val = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const options = {
  run: has("--yes"),
  force: has("--force"),
  story: val("--story", null),
  slug: val("--slug", null),
  scene: val("--scene", null) ? Number(val("--scene", null)) : null,
  limit: val("--limit", null) ? Number(val("--limit", null)) : Infinity,
  delayMs: Number(val("--delay", "1500")),
  outDir: join(root, val("--out", "src/assets")),
};

// ~coste orientativo por imagen, según la calidad configurada en server/.env.
// Estaba fijo en 0.04 (gpt-image-1 medium) y sobreestimaba x2.7 el presupuesto
// real, que hoy es Together + gpt-image-1.5 en calidad low (~$0.015/img).
const COST_PER_IMAGE_BY_QUALITY = { low: 0.015, medium: 0.04, high: 0.17 };
const COST_PER_IMAGE_USD =
  COST_PER_IMAGE_BY_QUALITY[process.env.OPENAI_IMAGE_QUALITY || "medium"] ?? 0.04;

let jobs = flattenPlan();
if (options.story) jobs = jobs.filter((j) => j.storyId === options.story);
if (options.slug) jobs = jobs.filter((j) => j.slug === options.slug);
if (options.scene) jobs = jobs.filter((j) => j.scene === options.scene);

async function fileReady(path) {
  try {
    return (await stat(path)).size > 0;
  } catch {
    return false;
  }
}

// Marca los que ya existen (para saltarlos salvo --force).
for (const job of jobs) {
  job.path = join(options.outDir, job.file);
  job.exists = await fileReady(job.path);
}

const todo = jobs
  .filter((j) => options.force || !j.exists)
  .slice(0, options.limit);
const skipped = jobs.length - todo.length;

console.log(
  `Plan: ${jobs.length} imágenes (${jobs.filter((j) => j.kind !== "opening").length} de rama/sub-camino). ` +
    `A generar ahora: ${todo.length}. Ya presentes / fuera de límite: ${skipped}.`,
);
console.table(
  todo.map((j) => ({
    story: j.storyId,
    file: j.file,
    scene: j.scene,
    prompt: j.prompt.replace(/\s+/g, " ").slice(0, 90) + "…",
  })),
);

if (!options.run) {
  console.log(
    `\nDRY RUN. Coste estimado si se generan las ${todo.length}: ~$${(todo.length * COST_PER_IMAGE_USD).toFixed(2)}.`,
  );
  console.log("Añade --yes (y OPENAI_API_KEY en el entorno) para generar de verdad.");
  process.exit(0);
}

if (!process.env.OPENAI_API_KEY) {
  console.error(
    "Falta OPENAI_API_KEY. Ejecuta:\n  node --env-file=server/.env scripts/generate-branch-images.mjs --yes\ncon la clave añadida a server/.env, o expórtala en el entorno.",
  );
  process.exit(1);
}

const { generateImage } = await import("../server/image-generation.js");

async function toBuffer(imageDataUrl) {
  if (imageDataUrl.startsWith("http")) {
    const res = await fetch(imageDataUrl);
    if (!res.ok) throw new Error(`descarga falló ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
  const base64 = imageDataUrl.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(base64, "base64");
}

await mkdir(options.outDir, { recursive: true });
const report = [];
let ok = 0;
let failed = 0;

for (const [index, job] of todo.entries()) {
  const tag = `[${index + 1}/${todo.length}] ${job.file}`;
  let lastError = null;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const { model, imageDataUrl } = await generateImage(job.prompt);
      const buffer = await toBuffer(imageDataUrl);
      if (!buffer.length) throw new Error("imagen vacía");
      await mkdir(dirname(job.path), { recursive: true });
      await writeFile(job.path, buffer);
      const sha256 = createHash("sha256").update(buffer).digest("hex");
      report.push({
        file: job.file,
        storyId: job.storyId,
        slug: job.slug,
        scene: job.scene,
        bytes: buffer.length,
        sha256,
        model,
        at: new Date().toISOString(),
      });
      ok += 1;
      lastError = null;
      console.log(`${tag} ✓ ${(buffer.length / 1024).toFixed(0)} KB (${model})`);
      break;
    } catch (error) {
      lastError = error;
      console.warn(`${tag} intento ${attempt} falló: ${error.message}`);
      if (attempt === 1) await new Promise((r) => setTimeout(r, 3000));
    }
  }
  if (lastError) {
    failed += 1;
    console.error(`${tag} ✗ ${lastError.message}`);
  }
  if (index < todo.length - 1) {
    await new Promise((r) => setTimeout(r, options.delayMs));
  }
}

const reportPath = join(root, "scripts", "branch-images.report.json");
await writeFile(
  reportPath,
  JSON.stringify(
    { generatedAt: new Date().toISOString(), ok, failed, images: report },
    null,
    2,
  ),
);
console.log(`\nHecho: ${ok} ok, ${failed} con error. Informe: ${reportPath}`);
console.log(
  "Siguiente: reconstruir (npm run build) para que import.meta.glob recoja los nuevos webp, revisión visual y luego integrar en branchingCatalog.",
);
if (failed) process.exitCode = 1;
