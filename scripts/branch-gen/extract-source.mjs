// Extrae de src/App.tsx los cuentos del catálogo (id, título, página 1 y las
// opciones de la decisión 1) a scripts/branch-gen/source.json.
//
// Las opciones se leen con un tokenizador de literales de cadena (no con un
// split por comas): el `match` de cada rama debe ser BYTE A BYTE la misma
// cadena que hay en App.tsx o el motor no encuentra la rama.
import fs from "node:fs";

const src = fs.readFileSync("src/App.tsx", "utf8");

// Lee un literal de cadena JS ("..." o '...') a partir de `start`.
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

// Devuelve todas las cadenas del array literal que empieza en `open` ("[").
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

function keyString(part, key) {
  const marker = "\n    " + key + ":";
  const at = part.indexOf(marker);
  if (at < 0) return "";
  let i = at + marker.length;
  while (i < part.length && /\s/.test(part[i])) i += 1;
  return readString(part, i)?.value ?? "";
}

function extract(varName, endMarker) {
  const start = src.indexOf(`const ${varName}`);
  const end = src.indexOf(endMarker, start);
  const block = src.slice(start, end);
  const parts = block.split(/\n  \{\n    id: "/).slice(1);
  const stories = [];
  for (const part of parts) {
    const id = part.split('"')[0];
    const choicesKey = part.indexOf("\n    choices: [");
    if (choicesKey < 0) {
      console.error("NO CHOICES", id);
      continue;
    }
    const choices = readStringArray(part, part.indexOf("[", choicesKey));
    if (!choices?.length) {
      console.error("CHOICES ILEGIBLES", id);
      continue;
    }
    stories.push({
      id,
      title: keyString(part, "title") || id,
      story: keyString(part, "story"),
      choices,
    });
  }
  return stories;
}

const b = extract("illustratedCatalogStories", "\nconst ageEightToTenReadings");
const a = extract("ageEightToTenReadings", "\nconst catalogStories");
const all = [...a, ...b].filter((s) => s.id !== "mila-brujula");
console.log("total (sin mila):", all.length);

const problems = all.filter(
  (s) =>
    s.choices.length < 2 ||
    !s.story ||
    s.choices.some((c) => !c.trim() || /^[,"']|["']$/.test(c.trim())),
);
console.log("cuentos con opciones/página 1 sospechosas:", problems.map((s) => s.id));
console.log(
  "reparto de nº de opciones:",
  JSON.stringify(
    all.reduce((acc, s) => ({ ...acc, [s.choices.length]: (acc[s.choices.length] || 0) + 1 }), {}),
  ),
);
fs.writeFileSync("scripts/branch-gen/source.json", JSON.stringify(all, null, 2));
console.log("escrito scripts/branch-gen/source.json");
