// Fusiona scripts/branch-gen/output/*.json en src/data/catalog-branches.json,
// el mapa que `branchingCatalog` (src/App.tsx) mezcla con la rama escrita a
// mano de `mila-brujula`.
//
// Los datos generados NO se pegan dentro de App.tsx: son ~25k líneas y el
// archivo ya tiene 4.9k. Van en un JSON aparte que App.tsx importa.
//
// Añade el `slug` que pide el tipo StoryBranch/StorySubPath (nombre de archivo
// de una futura imagen por rama); hoy ninguna de las 69 tiene imágenes propias,
// así que el lector cae a la secuencia plana de 5 escenas del catálogo.
//
//   node scripts/branch-gen/assemble.mjs
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const outDir = path.join(root, "scripts/branch-gen/output");
const sourcePath = path.join(root, "scripts/branch-gen/source.json");
const targetPath = path.join(root, "src/data/catalog-branches.json");

const stories = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

function slugify(label, fallback) {
  const slug = label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .filter((word) => word.length > 3)
    .slice(0, 2)
    .join("-");
  return slug || fallback;
}

function uniqueSlug(label, index, used) {
  let slug = slugify(label, `op${index + 1}`);
  while (used.has(slug)) slug = `${slug}-${index + 1}`;
  used.add(slug);
  return slug;
}

const catalog = {};
const problems = [];
const missing = [];

for (const story of stories) {
  const file = path.join(outDir, `${story.id}.json`);
  if (!fs.existsSync(file)) {
    missing.push(story.id);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const branchSlugs = new Set();
  const branches = data.branches.map((branch, bi) => {
    const subSlugs = new Set();
    return {
      match: branch.match,
      slug: uniqueSlug(branch.match, bi, branchSlugs),
      page2: { text: branch.page2.text, choices: branch.page2.choices },
      subpaths: branch.subpaths.map((sub, si) => ({
        match: sub.match,
        slug: uniqueSlug(sub.match, si, subSlugs),
        page3: { text: sub.page3.text, choices: sub.page3.choices },
        page4: { text: sub.page4.text, choices: sub.page4.choices },
        endings: sub.endings,
        close: sub.close,
      })),
    };
  });

  // El `match` de cada rama debe ser byte a byte una opción de la página 1 de
  // App.tsx; si no, resolveBranchPath cae siempre a la rama 0 y volvemos a
  // tener elecciones cosméticas.
  branches.forEach((branch, bi) => {
    if (branch.match !== story.choices[bi]) {
      problems.push(`${story.id}: rama ${bi} match "${branch.match}" != opción "${story.choices[bi]}"`);
    }
    branch.subpaths.forEach((sub, si) => {
      if (sub.match !== branch.page2.choices[si]) {
        problems.push(`${story.id}/${branch.slug}: sub-camino ${si} match "${sub.match}" != opción "${branch.page2.choices[si]}"`);
      }
      const endingKeys = Object.keys(sub.endings);
      const missingEnding = sub.page4.choices.filter((c) => !endingKeys.includes(c));
      if (missingEnding.length) {
        problems.push(`${story.id}/${branch.slug}/${sub.slug}: sin final para ${JSON.stringify(missingEnding)}`);
      }
    });
  });
  if (branches.length !== story.choices.length) {
    problems.push(`${story.id}: ${branches.length} ramas para ${story.choices.length} opciones`);
  }
  catalog[story.id] = branches;
}

const ids = Object.keys(catalog);
const pathCount = ids.reduce(
  (total, id) => total + catalog[id].reduce((n, b) => n + b.subpaths.length, 0),
  0,
);
const endingCount = ids.reduce(
  (total, id) =>
    total +
    catalog[id].reduce(
      (n, b) => n + b.subpaths.reduce((m, s) => m + Object.keys(s.endings).length, 0),
      0,
    ),
  0,
);

console.log(`cuentos ensamblados: ${ids.length}/${stories.length}`);
if (missing.length) console.log(`sin generar todavía (${missing.length}):`, missing.join(", "));
console.log(`recorridos de mitad de cuento: ${pathCount} | finales distintos: ${endingCount}`);
if (problems.length) {
  console.error(`\nPROBLEMAS (${problems.length}):`);
  problems.slice(0, 30).forEach((p) => console.error(" -", p));
  process.exitCode = 1;
}

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`\nescrito ${path.relative(root, targetPath)}`);
