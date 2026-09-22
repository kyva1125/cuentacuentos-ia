// Ilustraciones de los cuentos. La config vive en el servidor para que el
// navegador nunca elija modelo.
//
// Variables de entorno:
//   OPENAI_API_KEY       clave del proveedor de imagen (OpenAI o gateway compatible)
//   OPENAI_BASE_URL      base del endpoint (def. https://api.openai.com/v1)
//   OPENAI_IMAGE_MODEL   def. gpt-image-1
//                        · GPT Image:  gpt-image-1 | openai/gpt-image-1.5
//                        · FLUX (Together): black-forest-labs/FLUX.1.1-pro | FLUX.1-dev
//   OPENAI_IMAGE_QUALITY low | medium | high   (solo GPT Image, def. medium)
//   OPENAI_IMAGE_SIZE    "ANCHOxALTO"  (def. 1536x1024; FLUX admite p.ej. 1440x800)

const DEFAULT_IMAGE_MODEL = "gpt-image-1";
const ALLOWED = /(^|\/)gpt-image-|flux/i; // familias permitidas

export async function generateImage(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Falta configurar OPENAI_API_KEY para generar ilustraciones.");
  }

  const model = process.env.OPENAI_IMAGE_MODEL || DEFAULT_IMAGE_MODEL;
  if (!ALLOWED.test(model)) {
    throw new Error(
      "OPENAI_IMAGE_MODEL debe ser GPT Image (gpt-image-1) o FLUX (black-forest-labs/FLUX.1.1-pro).",
    );
  }

  const baseUrl = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const size = process.env.OPENAI_IMAGE_SIZE || "1536x1024";
  const isFlux = /flux/i.test(model);

  let body;
  if (isFlux) {
    const [w, h] = size.split("x").map(Number);
    body = { model, prompt, n: 1, width: w || 1440, height: h || 800 };
  } else {
    body = {
      model,
      prompt,
      n: 1,
      size,
      quality: process.env.OPENAI_IMAGE_QUALITY || "medium",
    };
  }

  const response = await fetch(`${baseUrl}/images/generations`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(180000),
  });

  if (!response.ok) {
    throw new Error(
      `El proveedor de imagen respondió ${response.status}: ${(await response.text()).slice(0, 300)}`,
    );
  }

  const data = await response.json();
  const item = data.data?.[0];
  const image = item?.url || item?.b64_json;
  if (!image) throw new Error("El proveedor no devolvió una imagen.");
  return {
    model,
    imageDataUrl: image.startsWith("http") ? image : `data:image/png;base64,${image}`,
  };
}
