// Hoja de contacto para la revisión visual de las imágenes del modelo ramificado.
//
//   node scripts/branch-images-contact-sheet.mjs                 # todas las historias del manifiesto
//   node scripts/branch-images-contact-sheet.mjs mila-brujula    # una
//
// Escribe scripts/branch-images.<id>.html: rejilla con las 13 imágenes (1
// compartida + 3 ramas × 4), etiquetadas por rama y escena, con dimensiones y
// avisos de "falta" o proporción no apaisada. Para revisar a ojo continuidad de
// personaje, encuadre 16:9 y ausencia de texto antes de integrar.

import { readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { branchImageManifest } from "./branch-images.manifest.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const assets = join(root, "src", "assets");
const only = process.argv[2] || null;

let sharp = null;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  /* sin sharp no se muestran dimensiones */
}

async function inspect(file) {
  const path = join(assets, file);
  try {
    const size = (await stat(path)).size;
    if (size === 0) return { file, status: "vacía" };
    let meta = null;
    if (sharp) {
      const { width, height } = await sharp(path).metadata();
      meta = { width, height, ratio: +(width / height).toFixed(3) };
    }
    const buf = await readFile(path);
    return {
      file,
      status: "ok",
      size,
      ...meta,
      landscape: meta ? meta.ratio >= 1.4 && meta.ratio <= 1.95 : null,
      dataUri: `data:image/webp;base64,${buf.toString("base64")}`,
    };
  } catch {
    return { file, status: "falta" };
  }
}

for (const [id, plan] of Object.entries(branchImageManifest)) {
  if (only && id !== only) continue;
  const rows = [];
  rows.push({ label: "compartida · escena 1", ...(await inspect(`${id}-scene-1-v2.webp`)) });
  for (const branch of plan.branches) {
    for (let scene = 2; scene <= 5; scene += 1) {
      rows.push({
        label: `${branch.slug} · escena ${scene}`,
        ...(await inspect(`${id}-${branch.slug}-scene-${scene}-v2.webp`)),
      });
    }
  }
  const cells = rows
    .map((r) => {
      const warn = [];
      if (r.status !== "ok") warn.push(r.status.toUpperCase());
      if (r.landscape === false) warn.push(`ratio ${r.ratio} (no apaisado)`);
      const dims = r.width ? `${r.width}×${r.height} · ${r.ratio}` : "";
      const img =
        r.status === "ok"
          ? `<img src="${r.dataUri}" alt="${r.label}">`
          : `<div class="ph">${r.status}</div>`;
      return `<figure${warn.length ? ' class="warn"' : ""}>
        ${img}
        <figcaption><b>${r.label}</b><span>${dims}</span>${warn.length ? `<em>${warn.join(" · ")}</em>` : ""}</figcaption>
      </figure>`;
    })
    .join("\n");
  const html = `<!doctype html><meta charset="utf-8"><title>Hoja de contacto — ${id}</title>
<style>
  body{font:14px/1.5 system-ui,sans-serif;margin:0;padding:24px;background:#fffaf0;color:#161512}
  h1{font-size:1.3rem;margin:0 0 4px}
  p{color:#5b574c;margin:0 0 20px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
  figure{margin:0;background:#fff;border:1px solid #ded9cc;border-radius:12px;overflow:hidden}
  figure.warn{border-color:#c0392b;box-shadow:0 0 0 2px #c0392b33}
  img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:#eee}
  .ph{display:grid;place-items:center;aspect-ratio:16/9;background:#f4efe3;color:#9a5b22;font-weight:700}
  figcaption{padding:10px 12px;display:flex;flex-direction:column;gap:2px}
  figcaption span{color:#5b574c;font-size:.82rem;font-variant-numeric:tabular-nums}
  figcaption em{color:#c0392b;font-style:normal;font-weight:700;font-size:.82rem}
</style>
<h1>${id} — hoja de contacto (${rows.filter((r) => r.status === "ok").length}/${rows.length})</h1>
<p>Revisa a ojo: mismo personaje y ropa en las 13, encuadre apaisado 16:9, sin texto ni letras, continuidad de tono por rama.</p>
<div class="grid">
${cells}
</div>`;
  const out = join(root, "scripts", `branch-images.${id}.html`);
  await writeFile(out, html);
  console.log(`${id}: ${rows.filter((r) => r.status === "ok").length}/${rows.length} presentes → ${out}`);
}
