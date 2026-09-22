// Genera, para cada cuento del catálogo (excepto mila-brujula, que ya es el
// modelo de referencia), un árbol de ramas real con la misma forma que Mila:
//   - decisión 1 -> una rama por cada una de las 4 opciones ya existentes
//   - decisión 2 -> 3 sub-caminos dentro de la rama (page3 + page4 propias)
//   - decisiones 3-4 se citan en el capítulo siguiente; la última elige el
//     final del sub-camino; un cierre por rasgo dominante.
// Reutiliza las imágenes ya existentes del catálogo: esto es solo texto.
//
// IMPORTANTE: se pide UNA RAMA POR PETICIÓN. Pedir las 4 juntas es lo que
// bloqueó la sesión anterior: los modelos disponibles razonan antes de
// escribir y agotaban el presupuesto de tokens en el razonamiento, dejando
// `content` vacío. Una rama entra holgada en 16k tokens (~13k de razonamiento
// + ~2k de JSON) y cada rama se guarda por separado, así que una caída no
// pierde el trabajo ya hecho.
//
//   node --env-file=server/.env scripts/branch-gen/generate.mjs
//   ... --only=<id>   un solo cuento
//   ... --force       regenerar lo ya guardado
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(import.meta.dirname, "..", "..");
const sourcePath = path.join(root, "scripts/branch-gen/source.json");
const outDir = path.join(root, "scripts/branch-gen/output");
const partsDir = path.join(outDir, "branches");
fs.mkdirSync(partsDir, { recursive: true });

const providers = [
  process.env.OPENCODE_GO_API_KEY && {
    name: "OpenCode Go",
    apiKey: process.env.OPENCODE_GO_API_KEY,
    baseUrl: "https://opencode.ai/zen/go/v1",
    model: process.env.OPENCODE_GO_MODEL || "deepseek-flash",
    headers: () => ({ "x-opencode-session": crypto.randomUUID() }),
    jsonMode: false,
  },
  process.env.DEEPSEEK_API_KEY && {
    name: "DeepSeek",
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseUrl: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
    model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
    jsonMode: true,
  },
  process.env.TOGETHER_API_KEY && {
    name: "Together AI",
    apiKey: process.env.TOGETHER_API_KEY,
    baseUrl: "https://api.together.xyz/v1",
    model: process.env.TOGETHER_TEXT_MODEL || "Qwen/Qwen3.5-9B",
    // Qwen razona por defecto y se come el presupuesto de salida sin escribir
    // nada; sin esto nunca llega a emitir el JSON.
    extraBody: { chat_template_kwargs: { enable_thinking: false } },
    jsonMode: false,
  },
].filter(Boolean);
if (!providers.length) {
  throw new Error("Falta configurar un proveedor de texto (usa --env-file=server/.env).");
}

const stories = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const CONCURRENCY = Number(
  process.argv.find((a) => a.startsWith("--concurrency="))?.split("=")[1] || 4,
);
const MAX_TOKENS = 16000;
const FORCE = process.argv.includes("--force");
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1];

function buildPrompt(story, branchIndex) {
  const others = story.choices
    .filter((_, i) => i !== branchIndex)
    .map((c) => `"${c}"`)
    .join(", ");
  const optionList = story.choices.map((c, i) => `${i + 1}. "${c}"`).join(" | ");
  return [
    "Eres coautor de CuentosMati, una app de cuentos interactivos en español para niños de 8 a 12 años. Estás convirtiendo un cuento de elección cosmética en uno con ramificación REAL: cada decisión del niño tiene que cambiar de verdad lo que pasa después.",
    "",
    `CUENTO: ${story.title}`,
    `PÁGINA 1 (ya fija, no la reescribas): ${story.story}`,
    `LAS 4 OPCIONES de la decisión 1: ${optionList}`,
    "",
    `Escribe SOLO la rama de la opción ${branchIndex + 1}: "${story.choices[branchIndex]}".`,
    `Esta rama tiene que ser claramente distinta de las que saldrían de ${others}: otro lugar, otro objeto, otro problema. Un niño que juegue dos veces debe notar de inmediato que leyó otro cuento.`,
    "",
    "Responde SOLO con JSON válido (sin markdown, sin comentarios) con esta forma exacta:",
    "{",
    '  "page2": {',
    '    "text": "<80-110 palabras. Empieza citando la decisión, con la marca {q} tal cual: \'Al elegir {q}, ...\'. Cuenta qué pasa EN CONCRETO por haber tomado esta rama. Termina con un problema claro sin resolver.>",',
    '    "choices": ["<opción A>", "<opción B>", "<opción C>"]',
    "  },",
    '  "subpaths": [',
    "    {",
    '      "match": "<igual a page2.choices[0], copiado EXACTO>",',
    '      "page3": {',
    '        "text": "<70-100 palabras. Empieza con \'Después de {q}, ...\' (usa {q} tal cual). Avanza la trama de forma propia de este sub-camino y termina en un problema nuevo y concreto.>",',
    '        "choices": ["<opción A>", "<opción B>", "<opción C>"]',
    "      },",
    '      "page4": {',
    '        "text": "<70-100 palabras. Empieza con \'Con {q}, ...\' (usa {q} tal cual). Resuelve el problema de page3 y deja planteada la situación final.>",',
    '        "choices": ["<opción A>", "<opción B>", "<opción C>"]',
    "      },",
    '      "endings": {',
    '        "<page4.choices[0] EXACTO>": "<40-60 palabras: final feliz y concreto de esa elección>",',
    '        "<page4.choices[1] EXACTO>": "<40-60 palabras: final feliz y concreto, distinto del anterior>",',
    '        "<page4.choices[2] EXACTO>": "<40-60 palabras: final feliz y concreto, distinto de los anteriores>"',
    "      },",
    '      "close": {',
    '        "bravery": "<12-20 palabras, frase final cálida sobre la valentía del personaje>",',
    '        "ingenuity": "<12-20 palabras, frase final cálida sobre su ingenio>",',
    '        "friendship": "<12-20 palabras, frase final cálida sobre la amistad>"',
    "      }",
    "    }",
    "  ]",
    "}",
    "",
    "Reglas:",
    '- "subpaths" debe tener EXACTAMENTE 3 elementos, uno por cada opción de page2, en el mismo orden, y "match" copiado letra por letra.',
    "- Cada sub-camino es una variación REAL: distinto lugar, objeto o reto. Nunca reformules el mismo texto con otras palabras.",
    "- Los 3 finales de un sub-camino deben contar cosas distintas, no el mismo final maquillado.",
    '- Usa "{q}" literal (llave, q, llave) donde toca citar la decisión anterior; el motor lo sustituye solo.',
    "- Las opciones son cortas (4-9 palabras), concretas y de acciones distintas entre sí.",
    "- Español neutro, cálido y curioso, frases claras, sin violencia ni miedo intenso.",
    "- No inventes personajes nuevos: usa el personaje y el tono de la página 1.",
  ].join("\n");
}

async function callModel(prompt, repairNote) {
  const messages = [
    {
      role: "system",
      content:
        "Eres un autor experto de cuentos infantiles interactivos en español, especializado en ramificación narrativa real (cada decisión cambia el cuento). Respondes siempre con JSON válido, sin texto adicional, sin backticks.",
    },
    { role: "user", content: repairNote ? `${prompt}\n\n${repairNote}` : prompt },
  ];
  let lastError = null;
  for (const provider of providers) {
    try {
      const response = await fetch(`${provider.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${provider.apiKey}`,
          "Content-Type": "application/json",
          ...(provider.headers?.() || {}),
        },
        body: JSON.stringify({
          model: provider.model,
          messages,
          temperature: 0.85,
          max_tokens: MAX_TOKENS,
          ...(provider.extraBody || {}),
          ...(provider.jsonMode ? { response_format: { type: "json_object" } } : {}),
        }),
        signal: AbortSignal.timeout(300000),
      });
      if (!response.ok) {
        lastError = new Error(
          `${provider.name} respondió ${response.status}: ${(await response.text()).slice(0, 300)}`,
        );
        console.error(String(lastError.message));
        continue;
      }
      const data = await response.json();
      const choice = data.choices?.[0];
      const content = choice?.message?.content?.trim();
      if (!content) {
        lastError = new Error(
          `${provider.name} devolvió contenido vacío (finish_reason=${choice?.finish_reason}, reasoning_tokens=${data.usage?.completion_tokens_details?.reasoning_tokens}).`,
        );
        console.error(String(lastError.message));
        continue;
      }
      return content;
    } catch (error) {
      lastError = error;
      console.error(`${provider.name} lanzó excepción: ${String(error?.message || error)}`);
    }
  }
  throw lastError || new Error("Ningún proveedor de texto respondió.");
}

function validateBranch(parsed) {
  const errors = [];
  if (!parsed?.page2?.text || parsed.page2.text.length < 60) {
    errors.push("page2.text falta o es muy corto.");
  }
  if (!parsed?.page2?.text?.includes("{q}")) {
    errors.push("page2.text debe citar la decisión con {q}.");
  }
  if (!Array.isArray(parsed?.page2?.choices) || parsed.page2.choices.length !== 3) {
    errors.push("page2.choices debe tener exactamente 3 opciones.");
  }
  if (!Array.isArray(parsed?.subpaths) || parsed.subpaths.length !== 3) {
    errors.push(
      `subpaths debe tener exactamente 3 elementos (tiene ${parsed?.subpaths?.length ?? "nada"}).`,
    );
    return errors;
  }
  parsed.subpaths.forEach((sub, si) => {
    const expected = parsed.page2?.choices?.[si];
    if (expected && sub.match !== expected) {
      errors.push(
        `subpaths[${si}].match debe ser exactamente "${expected}" (llegó "${sub.match}").`,
      );
    }
    for (const page of ["page3", "page4"]) {
      if (!sub?.[page]?.text || sub[page].text.length < 60) {
        errors.push(`subpaths[${si}].${page}.text falta o es muy corto.`);
      }
      if (!sub?.[page]?.text?.includes("{q}")) {
        errors.push(`subpaths[${si}].${page}.text debe citar la decisión con {q}.`);
      }
      if (!Array.isArray(sub?.[page]?.choices) || sub[page].choices.length !== 3) {
        errors.push(`subpaths[${si}].${page}.choices debe tener 3 opciones.`);
      }
    }
    const page4Choices = sub?.page4?.choices ?? [];
    const endingKeys = Object.keys(sub?.endings ?? {});
    if (page4Choices.length === 3 && endingKeys.length !== 3) {
      errors.push(`subpaths[${si}].endings debe tener una clave por cada opción de page4.`);
    }
    for (const choice of page4Choices) {
      if (!sub?.endings?.[choice] || sub.endings[choice].length < 40) {
        errors.push(`subpaths[${si}].endings["${choice}"] falta o es muy corto.`);
      }
    }
    for (const trait of ["bravery", "ingenuity", "friendship"]) {
      if (!sub?.close?.[trait] || sub.close[trait].length < 20) {
        errors.push(`subpaths[${si}].close.${trait} falta o es muy corto.`);
      }
    }
    // Un sub-camino que repite el texto de otro no es una rama real.
    parsed.subpaths.slice(0, si).forEach((other, oi) => {
      if (other?.page3?.text && other.page3.text === sub?.page3?.text) {
        errors.push(
          `subpaths[${si}].page3.text es idéntico al de subpaths[${oi}]: escribe un camino distinto.`,
        );
      }
    });
  });
  return errors;
}

function extractJson(raw) {
  let trimmed = raw.trim().replace(/^```json\s*|^```\s*|```$/g, "");
  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first >= 0 && last > first) trimmed = trimmed.slice(first, last + 1);
  return JSON.parse(trimmed);
}

async function generateBranch(story, branchIndex) {
  const partFile = path.join(partsDir, `${story.id}.${branchIndex}.json`);
  if (!FORCE && fs.existsSync(partFile)) {
    return { ok: true, cached: true, branch: JSON.parse(fs.readFileSync(partFile, "utf8")) };
  }
  const prompt = buildPrompt(story, branchIndex);
  let lastErrors = "";
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const repairNote = lastErrors
        ? `Tu respuesta anterior tenía estos problemas. Corrígelos y responde otra vez con el JSON COMPLETO de la rama:\n${lastErrors}`
        : "";
      const parsed = extractJson(await callModel(prompt, repairNote));
      const errors = validateBranch(parsed);
      if (errors.length === 0) {
        const branch = {
          match: story.choices[branchIndex],
          page2: parsed.page2,
          subpaths: parsed.subpaths,
        };
        fs.writeFileSync(partFile, JSON.stringify(branch, null, 2));
        return { ok: true, attempt, branch };
      }
      lastErrors = errors.slice(0, 10).join("\n");
    } catch (error) {
      lastErrors = String(error?.message || error);
    }
  }
  return { ok: false, error: lastErrors };
}

async function generateStory(story) {
  const outFile = path.join(outDir, `${story.id}.json`);
  if (!FORCE && fs.existsSync(outFile)) return { id: story.id, status: "saltado (ya existe)" };

  const branches = [];
  const failures = [];
  for (let i = 0; i < story.choices.length; i += 1) {
    const result = await generateBranch(story, i);
    if (!result.ok) {
      failures.push(`rama ${i + 1} ("${story.choices[i]}"): ${result.error}`);
      continue;
    }
    branches.push(result.branch);
  }
  if (failures.length) {
    fs.writeFileSync(path.join(outDir, `${story.id}.FAILED.txt`), failures.join("\n\n"));
    return {
      id: story.id,
      status: `FALLÓ (${failures.length}/${story.choices.length} ramas): ${failures[0].slice(0, 160)}`,
    };
  }
  fs.rmSync(path.join(outDir, `${story.id}.FAILED.txt`), { force: true });
  fs.writeFileSync(outFile, JSON.stringify({ id: story.id, branches }, null, 2));
  return { id: story.id, status: `ok (${branches.length} ramas)` };
}

async function runPool(items, worker, concurrency) {
  const results = [];
  let index = 0;
  async function next() {
    while (index < items.length) {
      const current = items[index++];
      const result = await worker(current);
      results.push(result);
      console.log(`[${results.length}/${items.length}] ${result.id}: ${result.status}`);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, next));
  return results;
}

const targets = ONLY ? stories.filter((s) => s.id === ONLY) : stories;
if (!targets.length) throw new Error(`No hay ningún cuento con id "${ONLY}".`);
console.log(
  `Generando ramificación real para ${targets.length} cuento(s), ${CONCURRENCY} en paralelo...`,
);
const results = await runPool(targets, generateStory, CONCURRENCY);
const failed = results.filter((r) => r.status.startsWith("FALLÓ"));
console.log(`\nListo. OK: ${results.length - failed.length}, fallidos: ${failed.length}`);
if (failed.length) console.log("Fallidos:", failed.map((f) => f.id).join(", "));
