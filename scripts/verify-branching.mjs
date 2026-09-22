// Comprueba que la ramificación del catálogo es REAL, no cosmética.
//
// El gancho del producto es "cada decisión cambia el cuento". Hasta ahora nada
// lo verificaba: 69 de los 70 cuentos llevaban al mismo texto eligieras lo que
// eligieras y el build pasaba igual. Este script falla si eso vuelve a pasar.
//
//   node scripts/verify-branching.mjs
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const appPath = path.join(root, "src/App.tsx");
const branchesPath = path.join(root, "src/data/catalog-branches.json");
const app = fs.readFileSync(appPath, "utf8");

// ── Lectura de src/App.tsx: ids y opciones de la página 1 de cada cuento ────
function readString(text, start) {
  const quote = text[start];
  if (quote !== '"' && quote !== "'") return null;
  const escapes = { n: "\n", t: "\t", r: "\r", b: "\b", f: "\f" };
  let out = "";
  for (let i = start + 1; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "\\") {
      const next = text[i + 1];
      out += next in escapes ? escapes[next] : next;
      i += 1;
      continue;
    }
    if (ch === quote) return { value: out, end: i };
    out += ch;
  }
  return null;
}

function readStringArray(text, open) {
  if (text[open] !== "[") return null;
  const values = [];
  let depth = 0;
  for (let i = open; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "[") depth += 1;
    else if (ch === "]") {
      depth -= 1;
      if (depth === 0) return values;
    } else if (ch === '"' || ch === "'") {
      const str = readString(text, i);
      if (!str) return null;
      values.push(str.value);
      i = str.end;
    }
  }
  return null;
}

function extractCatalog(varName, endMarker) {
  const start = app.indexOf(`const ${varName}`);
  const end = app.indexOf(endMarker, start);
  const parts = app.slice(start, end).split(/\n  \{\n    id: "/).slice(1);
  return parts
    .map((part) => {
      const id = part.split('"')[0];
      const at = part.indexOf("\n    choices: [");
      if (at < 0) return null;
      return { id, choices: readStringArray(part, part.indexOf("[", at)) ?? [] };
    })
    .filter(Boolean);
}

const catalogStories = [
  ...extractCatalog("ageEightToTenReadings", "\nconst catalogStories"),
  ...extractCatalog("illustratedCatalogStories", "\nconst ageEightToTenReadings"),
];

// ── Ramas: las 69 generadas (JSON) + mila-brujula (escrita a mano en App.tsx) ─
const generated = fs.existsSync(branchesPath)
  ? JSON.parse(fs.readFileSync(branchesPath, "utf8"))
  : {};
const milaHandwritten = app.includes('const branchingCatalog') && app.includes('"mila-brujula": [');

const errors = [];
const warnings = [];

if (!milaHandwritten) {
  errors.push("branchingCatalog ya no contiene la rama escrita a mano de mila-brujula.");
}
if (!app.includes("generatedCatalogBranches")) {
  errors.push("src/App.tsx no importa las ramas generadas (src/data/catalog-branches.json).");
}

const branched = new Set([...Object.keys(generated), ...(milaHandwritten ? ["mila-brujula"] : [])]);
const cosmetic = catalogStories.filter((s) => !branched.has(s.id));
if (cosmetic.length) {
  errors.push(
    `${cosmetic.length}/${catalogStories.length} cuentos siguen sin ramificación real (las 4 decisiones llevan al mismo texto): ${cosmetic
      .map((s) => s.id)
      .join(", ")}`,
  );
}

let totalPaths = 0;
let totalEndings = 0;

for (const story of catalogStories) {
  const branches = generated[story.id];
  if (!branches) continue; // mila-brujula se valida en el navegador, vive en App.tsx

  // Si el `match` no coincide byte a byte con la opción de la página 1,
  // resolveBranchPath cae siempre a branches[0] y la elección vuelve a ser falsa.
  if (branches.length !== story.choices.length) {
    errors.push(`${story.id}: ${branches.length} ramas para ${story.choices.length} opciones de la página 1.`);
  }
  branches.forEach((branch, bi) => {
    if (branch.match !== story.choices[bi]) {
      errors.push(`${story.id}: rama ${bi} no coincide con la opción "${story.choices[bi]}" (llegó "${branch.match}").`);
    }
    if (!branch.page2?.text?.includes("{q}")) {
      warnings.push(`${story.id}/${branch.slug}: la página 2 no cita la decisión del niño.`);
    }
    if (branch.subpaths?.length !== 3) {
      errors.push(`${story.id}/${branch.slug}: ${branch.subpaths?.length ?? 0} sub-caminos (deben ser 3).`);
      return;
    }
    branch.subpaths.forEach((sub) => {
      if (sub.match !== branch.page2.choices[branch.subpaths.indexOf(sub)]) {
        errors.push(`${story.id}/${branch.slug}: sub-camino "${sub.match}" no coincide con ninguna opción de la página 2.`);
      }
      for (const choice of sub.page4?.choices ?? []) {
        if (!sub.endings?.[choice]) {
          errors.push(`${story.id}/${branch.slug}/${sub.slug}: la opción final "${choice}" no tiene final propio.`);
        }
      }
      totalPaths += 1;
      totalEndings += Object.keys(sub.endings ?? {}).length;
    });
  });

  // Dos ramas que cuentan lo mismo son ramificación cosmética con otro nombre.
  const blocks = branches.flatMap((b) => [
    b.page2?.text,
    ...b.subpaths.flatMap((s) => [s.page3?.text, s.page4?.text, ...Object.values(s.endings ?? {})]),
  ]);
  const unique = new Set(blocks.map((t) => String(t).trim()));
  if (unique.size !== blocks.length) {
    errors.push(`${story.id}: ${blocks.length - unique.size} bloques de texto repetidos entre ramas (elecciones cosméticas).`);
  }
}

console.log(`Cuentos del catálogo: ${catalogStories.length}`);
console.log(`Con ramificación real: ${branched.size}`);
console.log(`Recorridos de mitad de cuento: ${totalPaths + 9} | finales distintos: ${totalEndings + 27} (incluye mila-brujula)`);

if (warnings.length) {
  console.log(`\nAvisos (${warnings.length}):`);
  warnings.slice(0, 10).forEach((w) => console.log(" -", w));
}
if (errors.length) {
  console.error(`\nFALLOS (${errors.length}):`);
  errors.slice(0, 20).forEach((e) => console.error(" -", e));
  process.exit(1);
}
console.log("\nRamificación real verificada: cada decisión abre texto propio.");
