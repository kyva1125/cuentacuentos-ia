// Prueba rápida de generación de imagen contra Together (clave de server/.env).
// NO toca el proyecto: guarda el resultado en scripts/_tryimage/ y lo abre.
//
//   node scripts/try-image.mjs "un zorro valiente en un bosque, estilo cuento, sin texto"
//   node scripts/try-image.mjs "..." --quality medium
//   node scripts/try-image.mjs "..." --model black-forest-labs/FLUX.1.1-pro --w 1440 --h 800
//   node scripts/try-image.mjs "..." --n 3            (genera 3 variantes)
//
// gpt-image-1.5: Together ignora el tamaño -> siempre 1024x1024. quality low|medium|high.
// FLUX.1.1-pro: respeta --w/--h (ancho <=1440, alto múltiplo de 32).

import { exec } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const args = process.argv.slice(2);
const prompt = args.filter((a) => !a.startsWith("--") && args[args.indexOf(a) - 1]?.startsWith("--") !== true)[0]
  || args.find((a) => !a.startsWith("--"));
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};

if (!prompt) {
  console.error('Uso: node scripts/try-image.mjs "tu prompt" [--quality low] [--model ...] [--w 1440 --h 800] [--n 1]');
  process.exit(1);
}

const model = flag("model", "openai/gpt-image-1.5");
const quality = flag("quality", "low");
const n = Number(flag("n", "1"));
const width = flag("w", null);
const height = flag("h", null);

// clave desde el entorno o desde server/.env
let key = process.env.TOGETHER_API_KEY;
if (!key) {
  try {
    const env = await readFile(join(root, "server", ".env"), "utf8");
    key = env.match(/^TOGETHER_API_KEY=(.+)$/m)?.[1]?.trim();
  } catch {}
}
if (!key) {
  console.error("Falta TOGETHER_API_KEY (en el entorno o en server/.env).");
  process.exit(1);
}

const body = { model, prompt, n };
if (model.startsWith("openai/")) {
  body.size = "1536x1024"; // Together lo ignora para gpt-image; sale 1024x1024
  body.quality = quality;
} else {
  body.width = Number(width || 1440);
  body.height = Number(height || 800);
}

const costHint = model.startsWith("openai/")
  ? { low: 0.015, medium: 0.04, high: 0.16 }[quality] ?? 0.04
  : 0.04;

console.log(`Modelo: ${model}${model.startsWith("openai/") ? ` (quality=${quality})` : ` (${body.width}x${body.height})`}  ·  n=${n}  ·  ~$${(costHint * n).toFixed(3)}`);
console.log("Generando…");

const started = Date.now();
const res = await fetch("https://api.together.xyz/v1/images/generations", {
  method: "POST",
  headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  body: JSON.stringify(body),
  signal: AbortSignal.timeout(180000),
});
const data = await res.json();
if (!res.ok || !data.data) {
  console.error(`Error ${res.status}:`, JSON.stringify(data).slice(0, 400));
  process.exit(1);
}

const outDir = join(root, "scripts", "_tryimage");
await mkdir(outDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const saved = [];
for (const [i, item] of data.data.entries()) {
  const src = item.url || (item.b64_json && `data:image/png;base64,${item.b64_json}`);
  if (!src) continue;
  const bytes = src.startsWith("http")
    ? Buffer.from(await (await fetch(src)).arrayBuffer())
    : Buffer.from(src.split(",")[1], "base64");
  const file = join(outDir, `${stamp}_${model.split("/").pop()}_${i + 1}.jpg`);
  await writeFile(file, bytes);
  saved.push({ file, kb: Math.round(bytes.length / 1024) });
}

const secs = ((Date.now() - started) / 1000).toFixed(1);
console.log(`\nListo en ${secs}s:`);
for (const s of saved) console.log(`  ${s.file}  (${s.kb} KB)`);
console.log(`\nCoste aprox: ~$${(costHint * saved.length).toFixed(3)}  ·  crédito Together ~$4`);

// abrir la primera (Windows)
if (saved[0] && process.platform === "win32") {
  exec(`start "" "${saved[0].file}"`);
}
