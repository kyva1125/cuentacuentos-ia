import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import pg from "pg";
import { generateImage } from "./image-generation.js";
import { storeImage, mediaStorageEnabled } from "./media-storage.js";

const app = express();
const port = Number(process.env.PORT || 3100);
const deepSeekApiKey = process.env.DEEPSEEK_API_KEY;
const deepSeekBaseUrl =
  process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
const deepSeekModel = process.env.DEEPSEEK_MODEL || "deepseek-chat";
const togetherApiKey = process.env.TOGETHER_API_KEY;
const togetherTextModel = process.env.TOGETHER_TEXT_MODEL || "Qwen/Qwen3.5-9B";
const openCodeGoApiKey = process.env.OPENCODE_GO_API_KEY;
const openCodeGoModel = process.env.OPENCODE_GO_MODEL || "glm-5.3-flash";
const origins = (
  process.env.ALLOWED_ORIGINS ||
  "http://localhost:5173,http://localhost:5175,http://127.0.0.1:5173,http://127.0.0.1:5175,http://192.168.0.250:5175,https://cuentos.benielstudio.app"
).split(",");
const databaseUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
const mercadoPagoAccessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
// OJO: son dos hosts distintos en producción y no se pueden mezclar.
// PUBLIC_URL     = base del API (MONICA) — es donde Mercado Pago envía el
//                  webhook `notification_url`. Si apunta al frontend, los
//                  pagos no se acreditan nunca.
// APP_PUBLIC_URL = base de la app (Vercel) — es a donde vuelve el padre tras
//                  pagar (`back_urls`). Si apunta al API, el padre aterriza en
//                  una respuesta JSON en vez de en sus monedas.
// En local ambas coinciden, por eso APP_PUBLIC_URL cae a PUBLIC_URL.
const publicUrl = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
const appPublicUrl = (process.env.APP_PUBLIC_URL || publicUrl).replace(
  /\/$/,
  "",
);
const pool = databaseUrl
  ? new pg.Pool({
      connectionString: databaseUrl,
      ssl: /^true$/i.test(process.env.DATABASE_SSL || "")
        ? { rejectUnauthorized: false }
        : false,
    })
  : null;

app.disable("x-powered-by");
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});
app.use(express.json({ limit: "32kb" }));
app.use(
  cors({
    origin(origin, done) {
      done(null, !origin || origins.includes(origin));
    },
  }),
);

const clean = (value, max) =>
  String(value || "")
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, max);
const emailOf = (value) => clean(value, 320).toLowerCase();
const auth = (req, res, next) => {
  const token = req.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!jwtSecret || !token)
    return res.status(401).json({ error: "Inicia sesión para continuar." });
  try {
    req.parent = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res
      .status(401)
      .json({ error: "Tu sesión terminó. Inicia sesión otra vez." });
  }
};
const issueToken = (parent) =>
  jwt.sign({ sub: parent.id, email: parent.email }, jwtSecret, {
    expiresIn: "7d",
  });
const parentView = (parent) => ({
  id: parent.id,
  name: parent.name,
  email: parent.email,
  credits: parent.credits,
});
const emptyTraits = { bravery: 0, ingenuity: 0, friendship: 0 };
const safeTraits = (value) =>
  Object.fromEntries(
    Object.keys(emptyTraits).map((key) => [
      key,
      Math.min(Math.max(Number(value?.[key]) || 0, 0), 10000),
    ]),
  );
const safeList = (value, maxItems = 500, maxLength = 80) =>
  Array.isArray(value)
    ? [
        ...new Set(value.map((item) => clean(item, maxLength)).filter(Boolean)),
      ].slice(0, maxItems)
    : [];
const childView = (child) => ({
  id: child.id,
  nickname: child.nickname,
  avatar: child.avatar,
  age: child.age,
  traits: { ...emptyTraits, ...(child.traits || {}) },
  completedStories: Number(child.completed_stories) || 0,
  completedStoryIds: child.completed_story_ids || [],
  unlockedStoryIds: child.unlocked_story_ids || [],
  inventory: child.inventory || [],
});
const storyCreditCost = Number(process.env.STORY_CREDIT_COST || 20);
const welcomeCreditGrant = 20;
const creditPlans = {
  inicio: { name: "Inicio", credits: 100, amount: 1.99 },
  aventura: { name: "Aventura", credits: 300, amount: 4.99 },
  biblioteca: { name: "Biblioteca", credits: 700, amount: 9.99 },
};
async function settleMercadoPagoPayment(paymentId) {
  if (!pool || !mercadoPagoAccessToken || !paymentId) return false;
  const response = await fetch(
    `https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`,
    { headers: { Authorization: `Bearer ${mercadoPagoAccessToken}` } },
  );
  if (!response.ok)
    throw new Error(`Mercado Pago respondió ${response.status}.`);
  const payment = await response.json();
  if (payment.status !== "approved" || !payment.external_reference)
    return false;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const orderResult = await client.query(
      "SELECT * FROM payment_orders WHERE id = $1 FOR UPDATE",
      [payment.external_reference],
    );
    const order = orderResult.rows[0];
    if (
      !order ||
      order.status === "approved" ||
      Number(payment.transaction_amount) !== Number(order.amount)
    ) {
      await client.query("COMMIT");
      return false;
    }
    await client.query(
      "UPDATE parents SET credits = credits + $1 WHERE id = $2",
      [order.credits, order.parent_id],
    );
    await client.query(
      "INSERT INTO credit_ledger (id, parent_id, delta, reason) VALUES ($1, $2, $3, $4)",
      [randomUUID(), order.parent_id, order.credits, "mercado_pago"],
    );
    await client.query(
      "UPDATE payment_orders SET status = $1, mercado_pago_payment_id = $2, approved_at = NOW() WHERE id = $3",
      ["approved", String(payment.id), order.id],
    );
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
async function chargeForStory(parentId) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const account = await client.query(
      "SELECT id, credits FROM parents WHERE id = $1 FOR UPDATE",
      [parentId],
    );
    const parent = account.rows[0];
    if (!parent) throw new Error("Cuenta no encontrada.");
    if (parent.credits < storyCreditCost) {
      const error = new Error(
        "No tienes créditos suficientes para crear una aventura.",
      );
      error.code = "INSUFFICIENT_CREDITS";
      throw error;
    }
    const updated = await client.query(
      "UPDATE parents SET credits = credits - $1 WHERE id = $2 RETURNING credits",
      [storyCreditCost, parentId],
    );
    await client.query(
      "INSERT INTO credit_ledger (id, parent_id, delta, reason) VALUES ($1, $2, $3, $4)",
      [randomUUID(), parentId, -storyCreditCost, "story_creation"],
    );
    await client.query("COMMIT");
    return updated.rows[0].credits;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
async function refundStory(parentId) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updated = await client.query(
      "UPDATE parents SET credits = credits + $1 WHERE id = $2 RETURNING credits",
      [storyCreditCost, parentId],
    );
    await client.query(
      "INSERT INTO credit_ledger (id, parent_id, delta, reason) VALUES ($1, $2, $3, $4)",
      [randomUUID(), parentId, storyCreditCost, "story_refund"],
    );
    await client.query("COMMIT");
    return updated.rows[0]?.credits;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
async function ask(prompt) {
  const providers = [
    openCodeGoApiKey && {
      apiKey: openCodeGoApiKey,
      baseUrl: "https://opencode.ai/zen/go/v1",
      model: openCodeGoModel,
      name: "OpenCode Go",
      isTogether: false,
      // OpenCode Go rechaza /chat/completions sin este encabezado de sesión.
      headers: { "x-opencode-session": randomUUID() },
    },
    deepSeekApiKey && {
      apiKey: deepSeekApiKey,
      baseUrl: deepSeekBaseUrl,
      model: deepSeekModel,
      name: "DeepSeek",
      isTogether: false,
    },
    togetherApiKey && {
      apiKey: togetherApiKey,
      baseUrl: "https://api.together.ai/v1",
      model: togetherTextModel,
      name: "Together AI",
      isTogether: true,
    },
  ].filter(Boolean);
  if (!providers.length)
    throw new Error("Falta configurar un proveedor de texto.");
  let lastError = null;
  for (const provider of providers) {
    const response = await fetch(`${provider.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${provider.apiKey}`,
        "Content-Type": "application/json",
        ...(provider.headers || {}),
      },
      body: JSON.stringify({
        model: provider.model,
        messages: [
          {
            role: "system",
            content:
              "Eres un autor experto de cuentos infantiles seguros, imaginativos y naturales en español.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.9,
        max_tokens: 2600,
        ...(provider.isTogether
          ? { chat_template_kwargs: { enable_thinking: false } }
          : {}),
      }),
      signal: AbortSignal.timeout(180000),
    });
    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.trim();
      if (content) return content;
      lastError = new Error(`${provider.name} devolvió una respuesta vacía.`);
      continue;
    }
    lastError = new Error(
      `${provider.name} respondió ${response.status}: ${(await response.text()).slice(0, 300)}`,
    );
    if (response.status !== 402) break;
  }
  throw lastError || new Error("No pudimos generar el cuento.");
}
function parseStory(value) {
  const characterDesign =
    value.match(/PERSONAJE:\s*([^\n]+)/i)?.[1]?.trim() || "";
  const title =
    value.match(/TITULO:\s*([^\n]+)/i)?.[1]?.trim() || "Una aventura nueva";
  const story =
    value
      .match(/CUENTO:\s*([\s\S]*?)(?=\n(?:ESCENA|OPCION_1):|$)/i)?.[1]
      ?.trim() ||
    value
      .replace(/^TITULO:\s*[^\n]+\n*/i, "")
      .split(/\n(?:ESCENA|OPCION_1):/i)[0]
      .trim();
  const choices = [...value.matchAll(/OPCION_\d+:\s*([^\n]+)/gi)].map((match) =>
    match[1].trim(),
  );
  const visualScene = value.match(/ESCENA:\s*([^\n]+)/i)?.[1]?.trim() || story;
  return { title, story, choices, characterDesign, visualScene };
}

function illustrationPrompt(characterDesign, story) {
  return `Create ONE wide 16:9 illustration for this exact Maticuentos story page. STRICT CHARACTER REFERENCE SHEET — reproduce the protagonist EXACTLY as described on every single page, with the same face shape, same skin or fur color, same hair color and shape, same eye color, same clothing colors, same accessory and same body proportions; do not restyle, recolor, age or redress the character: ${clean(characterDesign, 350)}. Scene brief (show these visible actions, objects, setting, and outcome only): ${clean(story, 700)}. This must be a narrative consequence, not a character pose: visibly change the action and at least two of the setting, framing, supporting character, or key object when the choice changes. Composition: show the protagonist actively doing the central action, with the important object or character clearly visible; do not invent a different event, costume, or extra protagonist. Art direction: cinematic children's storybook scene, soft digitally painted texture, gentle expressive child proportions, warm earth-and-teal palette, clear narrative action readable on mobile, cozy believable lighting, rich but uncluttered environment. Do not use photorealism, anime, plastic 3D render, generic gouache, collage, split panels, character-sheet layout, text, letters, logo, watermark, signature, weapons, scary content or unrelated background characters.`;
}

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/api/auth/register", async (req, res) => {
  if (!pool || !jwtSecret)
    return res
      .status(503)
      .json({ error: "El registro aún no está configurado." });
  const name = clean(req.body.name, 80);
  const email = emailOf(req.body.email);
  const password = String(req.body.password || "");
  const childName = clean(req.body.childName, 40);
  const childAvatar = clean(req.body.childAvatar, 40);
  const childAge = Number(req.body.childAge) || 7;
  if (
    name.length < 2 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    password.length < 8 ||
    childName.length < 2 ||
    childAge < 3 ||
    childAge > 12
  )
    return res
      .status(400)
      .json({
        error:
          "Completa los datos del adulto y un perfil infantil de 3 a 12 años.",
      });
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const parent = {
      id: randomUUID(),
      name,
      email,
      credits: welcomeCreditGrant,
    };
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        "INSERT INTO parents (id, name, email, password_hash, credits) VALUES ($1, $2, $3, $4, $5)",
        [parent.id, name, email, passwordHash, parent.credits],
      );
      const childId = randomUUID();
      await client.query(
        "INSERT INTO child_profiles (id, parent_id, nickname, avatar, age) VALUES ($1, $2, $3, $4, $5)",
        [childId, parent.id, childName, childAvatar || null, childAge],
      );
      await client.query(
        "INSERT INTO credit_ledger (id, parent_id, delta, reason) VALUES ($1, $2, $3, $4)",
        [randomUUID(), parent.id, welcomeCreditGrant, "welcome"],
      );
      await client.query("COMMIT");
      parent.child = childView({
        id: childId,
        nickname: childName,
        avatar: childAvatar || null,
        age: childAge,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
    res
      .status(201)
      .json({
        token: issueToken(parent),
        parent: parentView(parent),
        child: parent.child,
      });
  } catch (error) {
    if (error.code === "23505")
      return res
        .status(409)
        .json({ error: "Ya existe una cuenta con este correo." });
    console.error(error);
    res.status(500).json({ error: "No pudimos crear la cuenta." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  if (!pool || !jwtSecret)
    return res
      .status(503)
      .json({ error: "El inicio de sesión aún no está configurado." });
  try {
    const result = await pool.query(
      "SELECT id, name, email, password_hash, credits FROM parents WHERE email = $1",
      [emailOf(req.body.email)],
    );
    const parent = result.rows[0];
    if (
      !parent ||
      !(await bcrypt.compare(
        String(req.body.password || ""),
        parent.password_hash,
      ))
    )
      return res
        .status(401)
        .json({ error: "Correo o contraseña incorrectos." });
    const child = await pool.query(
      "SELECT * FROM child_profiles WHERE parent_id = $1 ORDER BY created_at ASC LIMIT 1",
      [parent.id],
    );
    res.json({
      token: issueToken(parent),
      parent: parentView(parent),
      child: child.rows[0] ? childView(child.rows[0]) : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No pudimos iniciar sesión." });
  }
});

app.get("/api/account", auth, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, credits FROM parents WHERE id = $1",
      [req.parent.sub],
    );
    if (!result.rows[0])
      return res.status(401).json({ error: "Cuenta no encontrada." });
    res.json({ parent: parentView(result.rows[0]) });
  } catch {
    res.status(500).json({ error: "No pudimos consultar tu cuenta." });
  }
});

app.get("/api/pixel-progress", auth, async (req, res) => {
  if (!pool) return res.status(503).json({ error: "El guardado en cuenta aún no está configurado." });
  try {
    const result = await pool.query(
      "SELECT pixel_progress, pixel_progress_revision FROM child_profiles WHERE parent_id = $1 ORDER BY created_at ASC LIMIT 1",
      [req.parent.sub],
    );
    if (!result.rows[0]) return res.status(404).json({ error: "No encontramos el perfil infantil." });
    res.json({ progress: result.rows[0].pixel_progress, revision: result.rows[0].pixel_progress_revision });
  } catch (error) {
    console.error("pixel-progress/get:", error);
    res.status(500).json({ error: "No pudimos recuperar el progreso." });
  }
});

app.put("/api/pixel-progress", auth, async (req, res) => {
  if (!pool) return res.status(503).json({ error: "El guardado en cuenta aún no está configurado." });
  const { progress, revision } = req.body || {};
  if (!Number.isInteger(revision) || revision < 0 || !progress || typeof progress !== "object" || Array.isArray(progress) || !Array.isArray(progress.unlockedCharacters) || !progress.characters || typeof progress.characters !== "object") {
    return res.status(400).json({ error: "El progreso enviado no es válido." });
  }
  try {
    const result = await pool.query(
      "UPDATE child_profiles SET pixel_progress = $1, pixel_progress_revision = pixel_progress_revision + 1 WHERE id = (SELECT id FROM child_profiles WHERE parent_id = $2 ORDER BY created_at ASC LIMIT 1) AND pixel_progress_revision = $3 RETURNING pixel_progress_revision",
      [progress, req.parent.sub, revision],
    );
    if (result.rows[0]) return res.json({ revision: result.rows[0].pixel_progress_revision });
    const current = await pool.query(
      "SELECT pixel_progress_revision FROM child_profiles WHERE parent_id = $1 ORDER BY created_at ASC LIMIT 1",
      [req.parent.sub],
    );
    if (!current.rows[0]) return res.status(404).json({ error: "No encontramos el perfil infantil." });
    res.status(409).json({ error: "La partida cambió en otro dispositivo. Tus cambios siguen en este navegador; abre Guardar progreso para elegir cuál conservar." });
  } catch (error) {
    console.error("pixel-progress/put:", error);
    res.status(500).json({ error: "No pudimos guardar el progreso en la cuenta." });
  }
});

app.post("/api/payments/checkout", auth, async (req, res) => {
  if (!pool || !mercadoPagoAccessToken || !publicUrl)
    return res
      .status(503)
      .json({ error: "Los pagos con Mercado Pago aún no están configurados." });
  const plan = creditPlans[clean(req.body.planId, 30)];
  if (!plan)
    return res.status(400).json({ error: "El paquete elegido no es válido." });
  try {
    const orderId = randomUUID();
    await pool.query(
      "INSERT INTO payment_orders (id, parent_id, plan_id, credits, amount, currency, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        orderId,
        req.parent.sub,
        clean(req.body.planId, 30),
        plan.credits,
        plan.amount,
        "PEN",
        "pending",
      ],
    );
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mercadoPagoAccessToken}`,
          "Content-Type": "application/json",
          "X-Idempotency-Key": orderId,
        },
        body: JSON.stringify({
          items: [
            {
              id: clean(req.body.planId, 30),
              title: `CuentosMati · ${plan.name}`,
              quantity: 1,
              unit_price: plan.amount,
              currency_id: "PEN",
            },
          ],
          external_reference: orderId,
          notification_url: `${publicUrl}/api/payments/mercadopago`,
          back_urls: {
            success: `${appPublicUrl}/?payment=success`,
            pending: `${appPublicUrl}/?payment=pending`,
            failure: `${appPublicUrl}/?payment=failure`,
          },
          auto_return: "approved",
          metadata: { parent_id: req.parent.sub, credits: plan.credits },
        }),
      },
    );
    const preference = await response.json();
    if (!response.ok || !preference.init_point)
      throw new Error(preference.message || "No se pudo crear el checkout.");
    await pool.query(
      "UPDATE payment_orders SET mercado_pago_preference_id = $1 WHERE id = $2",
      [String(preference.id), orderId],
    );
    res.json({ checkoutUrl: preference.init_point });
  } catch (error) {
    console.error(error);
    res
      .status(502)
      .json({ error: "No pudimos abrir Mercado Pago. Inténtalo de nuevo." });
  }
});

app.post("/api/payments/mercadopago", async (req, res) => {
  const paymentId = req.body?.data?.id || req.query["data.id"];
  try {
    if (paymentId) await settleMercadoPagoPayment(paymentId);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/api/child/profile", auth, async (req, res) => {
  if (!pool)
    return res
      .status(503)
      .json({ error: "El perfil aún no está configurado." });
  try {
    const result = await pool.query(
      "SELECT * FROM child_profiles WHERE parent_id = $1 ORDER BY created_at ASC LIMIT 1",
      [req.parent.sub],
    );
    if (!result.rows[0])
      return res
        .status(404)
        .json({ error: "No encontramos el perfil infantil." });
    res.json({ child: childView(result.rows[0]) });
  } catch (error) {
    console.error("child/profile:", error);
    res.status(500).json({ error: "No pudimos recuperar el perfil infantil." });
  }
});

app.put("/api/child/profile", auth, async (req, res) => {
  if (!pool)
    return res
      .status(503)
      .json({ error: "El perfil aún no está configurado." });
  const traits = safeTraits(req.body.traits);
  const completedStoryIds = safeList(req.body.completedStoryIds);
  const unlockedStoryIds = safeList(req.body.unlockedStoryIds);
  const inventory = safeList(req.body.inventory, 200, 60);
  const completedStories = Math.max(
    completedStoryIds.length,
    Math.min(Math.max(Number(req.body.completedStories) || 0, 0), 10000),
  );
  try {
    const result = await pool.query(
      "UPDATE child_profiles SET traits = $1, completed_stories = $2, completed_story_ids = $3, unlocked_story_ids = $4, inventory = $5 WHERE id = (SELECT id FROM child_profiles WHERE parent_id = $6 ORDER BY created_at ASC LIMIT 1) RETURNING *",
      [
        traits,
        completedStories,
        completedStoryIds,
        unlockedStoryIds,
        inventory,
        req.parent.sub,
      ],
    );
    if (!result.rows[0])
      return res
        .status(404)
        .json({ error: "No encontramos el perfil infantil." });
    res.json({ child: childView(result.rows[0]) });
  } catch {
    res.status(500).json({ error: "No pudimos guardar el perfil infantil." });
  }
});

app.get("/api/child/stories", auth, async (req, res) => {
  if (!pool)
    return res
      .status(503)
      .json({ error: "Los cuentos aún no están configurados." });
  try {
    const result = await pool.query(
      "SELECT id, title, content, current_step, updated_at FROM stories WHERE parent_id = $1 ORDER BY updated_at DESC",
      [req.parent.sub],
    );
    res.json({
      stories: result.rows.map((story) => ({
        id: story.id,
        title: story.title,
        ...story.content,
        storyStep: story.current_step,
        updatedAt: story.updated_at,
      })),
    });
  } catch {
    res
      .status(500)
      .json({ error: "No pudimos recuperar los cuentos del niño." });
  }
});

app.put("/api/child/stories/:id", auth, async (req, res) => {
  if (!pool)
    return res
      .status(503)
      .json({ error: "Los cuentos aún no están configurados." });
  const id = clean(req.params.id, 80);
  const title = clean(req.body.title, 160);
  const currentStep = Math.min(Math.max(Number(req.body.storyStep) || 1, 1), 5);
  const content = req.body.content;
  if (
    !/^[0-9a-f-]{36}$/i.test(id) ||
    !title ||
    !content ||
    typeof content !== "object"
  )
    return res.status(400).json({ error: "El cuento no es válido." });
  try {
    const child = await pool.query(
      "SELECT id FROM child_profiles WHERE parent_id = $1 ORDER BY created_at ASC LIMIT 1",
      [req.parent.sub],
    );
    const existing = await pool.query("SELECT id FROM stories WHERE id = $1", [
      id,
    ]);
    if (existing.rows[0]) {
      const updated = await pool.query(
        "UPDATE stories SET title = $1, content = $2, current_step = $3, updated_at = NOW() WHERE id = $4 AND parent_id = $5 RETURNING id",
        [title, content, currentStep, id, req.parent.sub],
      );
      if (!updated.rows[0])
        return res.status(404).json({ error: "No encontramos este cuento." });
    } else
      await pool.query(
        "INSERT INTO stories (id, parent_id, child_profile_id, title, content, current_step) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          id,
          req.parent.sub,
          child.rows[0]?.id || null,
          title,
          content,
          currentStep,
        ],
      );
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "No pudimos guardar el cuento del niño." });
  }
});

async function toImageBuffer(imageDataUrl) {
  if (imageDataUrl.startsWith("http")) {
    const r = await fetch(imageDataUrl);
    if (!r.ok) throw new Error(`descarga de imagen ${r.status}`);
    return Buffer.from(await r.arrayBuffer());
  }
  return Buffer.from(imageDataUrl.split(",")[1] || "", "base64");
}

app.post("/api/images/generate", auth, async (req, res) => {
  const prompt = clean(req.body.prompt, 1200);
  if (!prompt)
    return res
      .status(400)
      .json({ error: "Escribe una descripción para la imagen." });
  const storyId = /^[0-9a-z-]{6,64}$/i.test(req.body.storyId || "")
    ? req.body.storyId
    : null;
  const step = Math.min(Math.max(Number(req.body.step) || 0, 0), 8);

  try {
    const gen = await generateImage(prompt);
    let imageUrl = gen.imageDataUrl;
    let persisted = false;
    // Persistir en el FTP: una URL estable que no caduca y que releer/ramificar
    // no vuelve a pagar. Si falla, se usa la URL efímera del proveedor.
    if (mediaStorageEnabled && storyId && step) {
      try {
        const buffer = await toImageBuffer(gen.imageDataUrl);
        const stored = await storeImage(
          buffer,
          `cuentos/${req.parent.sub}/${storyId}/${step}.jpg`,
        );
        if (stored) {
          imageUrl = stored;
          persisted = true;
        }
      } catch (error) {
        console.error("persist image:", error.message);
      }
    }
    res.json({ model: gen.model, imageDataUrl: imageUrl, persisted });
  } catch (error) {
    res
      .status(502)
      .json({ error: error.message || "No se pudo generar la imagen." });
  }
});

// Lista corta e ilustrativa; la pasada de modelo hace el trabajo fino.
const CHARACTER_BLOCKLIST =
  /\b(sex\w*|porno\w*|puta|puto|mierda|coño|joder|verga|pene|vagina|droga\w*|coca[ií]na|hero[ií]na|matar|asesin\w*|viola\w*|nazi|hitler|suicid\w*|arma\w*|pistola|cuchillo|sangre|desnud\w*)\b/i;

const FALLBACK_CHARACTERS = [
  "Rumi, una zorra curiosa",
  "Tobi, un topo inventor",
  "Nena, una gata exploradora",
  "Pío, un pájaro cartero",
  "Momo, un caracol viajero",
  "Fara, una luciérnaga guía",
];

// Devuelve SIEMPRE un personaje apto. Solo llama al modelo si el texto es
// sospechoso (insulto, galimatías, caracteres raros); si ya parece válido lo
// deja tal cual para no añadir latencia ni coste.
async function salvageCharacter(raw) {
  const input = clean(raw, 80).replace(/\s+/g, " ").trim();
  if (input.replace(/\s/g, "").length < 2) return { character: "", changed: false };

  const letters = input.replace(/[^\p{L}]/gu, "");
  const vowels = (input.match(/[aeiouáéíóúü]/gi) || []).length;
  const gibberish =
    letters.length >= 4 && vowels / Math.max(letters.length, 1) < 0.22;
  const blocked = CHARACTER_BLOCKLIST.test(input);
  const weird = /(.)\1{3,}/.test(input) || /[^\p{L}\p{N}\s'’.\-]/u.test(input);
  if (!blocked && !gibberish && !weird) return { character: input, changed: false };

  try {
    const reply = await ask(
      `Eres el filtro de personajes de una app de cuentos para niños de 8 a 12 años. Un niño escribió esto como su personaje: "${input}". Devuelve SIEMPRE un personaje válido, seguro y apto: un nombre corto más una frase cálida, máximo 12 palabras en total. Reglas: nada de violencia, armas, sexo, drogas, odio, marcas comerciales ni personas reales. Si es un insulto o algo inapropiado, invéntate un personaje amable que suene parecido o al azar. Si es un galimatías tipo "dfmgdfmg", conviértelo en un nombre pronunciable y dale un oficio simpático, por ejemplo "Dafmi, una ardilla que colecciona botones". Si ya es un personaje válido, respétalo y solo mejóralo un poco. Responde SOLO con JSON: {"character": "...", "changed": true|false}`,
    );
    const match = reply.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      const character = clean(parsed.character, 90).replace(/\s+/g, " ").trim();
      if (character.length >= 2)
        return { character, changed: Boolean(parsed.changed) || blocked };
    }
  } catch {
    /* cae a reglas locales */
  }

  const stripped = input.replace(/[^\p{L}\s'’-]/gu, "").trim();
  if (blocked || gibberish || stripped.replace(/\s/g, "").length < 2) {
    return {
      character:
        FALLBACK_CHARACTERS[Math.floor(Math.random() * FALLBACK_CHARACTERS.length)],
      changed: true,
    };
  }
  return { character: stripped, changed: stripped !== input };
}

app.post("/api/stories", auth, async (req, res) => {
  if (!pool)
    return res
      .status(503)
      .json({ error: "La creación de cuentos aún no está configurada." });
  const salvaged = await salvageCharacter(req.body.character);
  const character = salvaged.character || "una gatita curiosa";
  const place = clean(req.body.place, 60) || "un jardín mágico";
  const mission = clean(req.body.mission, 80) || "encontrar una puerta secreta";
  let chargedCredits = null;
  try {
    chargedCredits = await chargeForStory(req.parent.sub);
    const storyReply = await ask(
      `Escribe la página 1 de un cuento infantil interactivo de exactamente 5 páginas para lectores desde los 7 años. Debe sentirse como un álbum ilustrado: entre 60 y 90 palabras en UN solo párrafo. Personaje: ${character}. Lugar: ${place}. Misión: ${mission}. Tono cálido, seguro y alegre; sin violencia ni miedo intenso. Presenta un misterio o problema amable que atrape al niño. Ofrece exactamente TRES decisiones muy breves, concretas y claramente distintas: una valiente, una ingeniosa y una que ayude a alguien. Cada decisión debe cambiar lo que sucede después; nunca preguntes algo vago ni ofrezcas cuatro opciones. Las páginas 2, 3 y 4 tendrán una sorpresa breve; la página 5 resolverá todo con un final feliz y una enseñanza clara. Antes de la historia, crea una FICHA DE REFERENCIA fija del protagonista, máximo 40 palabras, escrita como lista de rasgos y NO como frase de cuento: nombre; especie o edad exacta; color de piel o pelaje; color y forma del pelo; color de ojos; dos prendas de ropa con su color exacto; un accesorio distintivo. Esta ficha debe poder copiarse igual en cada ilustración. Después del cuento, escribe UNA ESCENA de máximo 45 palabras: una instrucción visual literal que muestre exactamente el momento de esta página (protagonista, acción visible, lugar, objeto o personaje importante); no resumas ni inventes nada. Responde exactamente con estas etiquetas: PERSONAJE: ficha visual fija\nTITULO: título\nCUENTO: texto\nESCENA: descripción visual literal\nOPCION_1: decisión valiente\nOPCION_2: decisión ingeniosa\nOPCION_3: decisión para ayudar.`,
    );
    const parsed = parseStory(storyReply);
    const characterDesign =
      parsed.characterDesign ||
      `El protagonista es ${character}, con un diseño infantil cálido y reconocible.`;
    res.json({
      ...parsed,
      characterDesign,
      character,
      characterChanged: salvaged.changed,
      choices: parsed.choices.slice(0, 3),
      imagePrompt: illustrationPrompt(characterDesign, parsed.visualScene),
      credits: chargedCredits,
    });
  } catch (error) {
    if (chargedCredits !== null) await refundStory(req.parent.sub);
    if (error.code === "INSUFFICIENT_CREDITS")
      return res.status(402).json({ error: error.message });
    console.error(error);
    res
      .status(502)
      .json({
        error:
          error.message ||
          "No se pudo crear el cuento ahora. Inténtalo de nuevo.",
      });
  }
});

app.post("/api/continue", auth, async (req, res) => {
  const character = clean(req.body.character, 60) || "el héroe";
  const choice = clean(req.body.choice, 100);
  const context = clean(req.body.context, 4000);
  const characterDesign =
    clean(req.body.characterDesign, 350) ||
    `El protagonista es ${character}, con un diseño infantil cálido y reconocible.`;
  const step = Math.min(Math.max(Number(req.body.step) || 2, 2), 5);
  if (!choice)
    return res
      .status(400)
      .json({ error: "Falta una decisión para continuar." });
  try {
    const storyReply = await ask(
      `Escribe la página ${step} de un cuento infantil interactivo de exactamente 5 páginas para lectores desde los 7 años. Personaje: ${character}. La decisión anterior fue: ${choice}. Contexto: ${context}. Debe sentirse como un álbum ilustrado: entre 60 y 90 palabras en UN solo párrafo. Tono cálido, seguro y alegre. Muestra una consecuencia real y visible de la decisión anterior: debe afectar el lugar, un personaje o el problema, sin violencia ni miedo intenso. El héroe puede equivocarse, pedir ayuda, reparar algo o descubrir una pista. Después del cuento, escribe UNA ESCENA de máximo 45 palabras: una instrucción visual literal que muestre exactamente el momento de esta página (protagonista, acción visible, lugar, objeto o personaje importante); no resumas ni inventes nada. ${step < 5 ? "Termina con un reto amable y responde exactamente con TRES opciones muy breves, concretas y diferentes: CUENTO: texto\\nESCENA: descripción visual literal\\nOPCION_1: decisión valiente\\nOPCION_2: decisión ingeniosa\\nOPCION_3: decisión para ayudar." : "Esta es la última página: resuelve el problema, termina siempre feliz y seguro, y deja una enseñanza breve y natural. No ofrezcas más decisiones. Responde exactamente: CUENTO: texto\\nESCENA: descripción visual literal."}`,
    );
    const parsed = parseStory(storyReply);
    res.json({
      story: parsed.story,
      choices: step < 5 ? parsed.choices.slice(0, 3) : [],
      imagePrompt: illustrationPrompt(characterDesign, parsed.visualScene),
      characterDesign,
      canFinish: step >= 5,
      step,
    });
  } catch (error) {
    console.error(error);
    res
      .status(502)
      .json({
        error: "No se pudo continuar el cuento ahora. Inténtalo de nuevo.",
      });
  }
});

const host = process.env.HOST || "127.0.0.1";
app.listen(port, host, () =>
  console.log(`Cuentos API on http://${host}:${port}`),
);
