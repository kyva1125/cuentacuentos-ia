// Imprime recorridos completos de un cuento ramificado, tal como los leería un
// niño: página 1, la decisión, la página que sale de esa decisión, etc.
// Sirve para el repaso manual de calidad (el verificador comprueba estructura,
// no si el cuento se sostiene).
//
//   node scripts/branch-gen/preview.mjs <id>            dos recorridos opuestos
//   node scripts/branch-gen/preview.mjs <id> 0 2 1 0    un recorrido concreto
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const stories = JSON.parse(fs.readFileSync(path.join(root, "scripts/branch-gen/source.json"), "utf8"));
const catalog = JSON.parse(fs.readFileSync(path.join(root, "src/data/catalog-branches.json"), "utf8"));

const id = process.argv[2];
const story = stories.find((s) => s.id === id);
if (!story) throw new Error(`No existe el cuento "${id}".`);
const branches = catalog[id];
if (!branches) throw new Error(`"${id}" todavía no tiene ramas generadas.`);

const quote = (label) => `“${label}”`;

function play(picks) {
  const branch = branches[picks[0]];
  const sub = branch.subpaths[picks[1]];
  const d3 = sub.page3.choices[picks[2]];
  const d4 = sub.page4.choices[picks[3]];
  const lines = [];
  lines.push(`PÁGINA 1: ${story.story}`);
  lines.push(`   → decide: ${quote(branch.match)}`);
  lines.push(`PÁGINA 2: ${branch.page2.text.replace(/\{q\}/g, quote(branch.match))}`);
  lines.push(`   → decide: ${quote(sub.match)}`);
  lines.push(`PÁGINA 3: ${sub.page3.text.replace(/\{q\}/g, quote(sub.match))}`);
  lines.push(`   → decide: ${quote(d3)}`);
  lines.push(`PÁGINA 4: ${sub.page4.text.replace(/\{q\}/g, quote(d3))}`);
  lines.push(`   → decide: ${quote(d4)}`);
  lines.push(`FINAL:    ${sub.endings[d4]} ${sub.close.bravery}`);
  return lines.join("\n\n");
}

const manual = process.argv.slice(3).map(Number);
const runs = manual.length === 4 ? [manual] : [[0, 0, 0, 0], [branches.length - 1, 2, 2, 2]];

console.log(`${story.title} (${id})\n`);
runs.forEach((picks, i) => {
  console.log("=".repeat(76));
  console.log(`RECORRIDO ${i + 1}  [${picks.join(" ")}]`);
  console.log("=".repeat(76));
  console.log(play(picks));
  console.log();
});
