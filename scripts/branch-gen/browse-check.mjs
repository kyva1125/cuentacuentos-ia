// Recorre un cuento del catálogo EN EL NAVEGADOR, dos veces, eligiendo
// opciones distintas, y comprueba que las páginas 2-5 cambian de verdad.
//
// El verificador de datos (scripts/verify-branching.mjs) mira el JSON; esto
// mira lo que el niño ve. Sin esto no sabemos si el motor del lector está
// usando las ramas o sigue cayendo al texto plano.
//
//   node scripts/branch-gen/browse-check.mjs <id> [<id> ...]
//   (necesita `npm run dev -- --port 5175` corriendo)
import { chromium } from "playwright-core";
import fs from "node:fs";

const BASE = process.env.BROWSE_URL || "http://localhost:5175/";
const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error("No encuentro Chrome estable.");

const ids = process.argv.slice(2);
if (!ids.length) throw new Error("Uso: browse-check.mjs <id> [<id> ...]");

const stories = JSON.parse(fs.readFileSync("scripts/branch-gen/source.json", "utf8"));
const catalog = JSON.parse(fs.readFileSync("src/data/catalog-branches.json", "utf8"));

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const failures = [];

// Lee el texto del capítulo y las etiquetas de los botones de decisión.
async function readPage(page) {
  return page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")]
      .map((b) => b.innerText.trim())
      .filter((t) => t && t.length < 80);
    const paragraphs = [...document.querySelectorAll("p")]
      .map((p) => p.innerText.trim())
      .filter((t) => t.split(/\s+/).length > 15);
    return { text: paragraphs.join("\n"), buttons };
  });
}

async function playthrough(story, pickIndex) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  await page.goto(BASE, { waitUntil: "networkidle" });
  // Biblioteca -> el cuento pedido.
  await page.getByRole("button", { name: /biblioteca/i }).first().click();
  await page.waitForTimeout(400);
  // La biblioteca pagina de 9 en 9: hay que pasar páginas hasta dar con el cuento.
  let card = page.getByText(story.title, { exact: false }).first();
  for (let tries = 0; tries < 12 && (await card.count()) === 0; tries += 1) {
    await page.getByRole("button", { name: /^siguiente$/i }).first().click();
    await page.waitForTimeout(350);
    card = page.getByText(story.title, { exact: false }).first();
  }
  if ((await card.count()) === 0) throw new Error(`No encuentro "${story.title}" en la biblioteca.`);
  await card.scrollIntoViewIfNeeded();
  await card.click();
  await page.waitForTimeout(600);

  const pages = [];
  for (let step = 1; step <= 5; step += 1) {
    const snapshot = await readPage(page);
    pages.push(snapshot);
    if (step === 5) break;
    const choices = snapshot.buttons.filter((b) =>
      // Los botones de decisión son los que coinciden con las opciones del
      // capítulo; el resto es navegación ("Volver", "Siguiente"...).
      !/^(volver|siguiente|atrás|inicio|biblioteca|cerrar|leer)/i.test(b),
    );
    if (!choices.length) break;
    const label = choices[Math.min(pickIndex, choices.length - 1)];
    await page.getByRole("button", { name: label, exact: true }).first().click();
    await page.waitForTimeout(700);
  }
  await context.close();
  return { pages, consoleErrors };
}

for (const id of ids) {
  const story = stories.find((s) => s.id === id);
  if (!story) {
    failures.push(`${id}: no está en source.json`);
    continue;
  }
  const branchCount = catalog[id]?.length ?? 0;
  const runA = await playthrough(story, 0);
  const runB = await playthrough(story, branchCount - 1);

  console.log(`\n── ${story.title} (${id}) ──`);
  for (let i = 0; i < Math.max(runA.pages.length, runB.pages.length); i += 1) {
    const a = runA.pages[i]?.text ?? "";
    const b = runB.pages[i]?.text ?? "";
    const same = a.trim() === b.trim();
    console.log(
      `  página ${i + 1}: ${i === 0 ? "igual (correcto, es la portada)" : same ? "IGUAL ← la decisión no cambió nada" : "distinta ✓"}`,
    );
    if (i > 0 && same && a) failures.push(`${id}: la página ${i + 1} no cambia al elegir otra opción.`);
  }
  if (runA.pages.length < 5) failures.push(`${id}: el recorrido A se cortó en la página ${runA.pages.length}.`);
  if (runB.pages.length < 5) failures.push(`${id}: el recorrido B se cortó en la página ${runB.pages.length}.`);

  const errors = [...runA.consoleErrors, ...runB.consoleErrors].filter(
    (e) => !/favicon|ERR_CONNECTION_REFUSED|localhost:3[13]00/i.test(e),
  );
  if (errors.length) {
    failures.push(`${id}: ${errors.length} errores de consola. Primero: ${errors[0].slice(0, 160)}`);
  }
  console.log(`  recorrido A: ${runA.pages.length} páginas | recorrido B: ${runB.pages.length} páginas`);
  console.log(`  último texto A: ${runA.pages.at(-1)?.text.slice(0, 110)}…`);
  console.log(`  último texto B: ${runB.pages.at(-1)?.text.slice(0, 110)}…`);
}

await browser.close();

if (failures.length) {
  console.error(`\nFALLOS (${failures.length}):`);
  failures.forEach((f) => console.error(" -", f));
  process.exit(1);
}
console.log("\nEn el navegador, cada decisión abre páginas distintas.");
