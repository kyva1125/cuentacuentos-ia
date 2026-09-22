# Handoff — CuentosMati

## Inicio de sesión: baseline verificado — 15 sep 2026

- `npm test` pasó: build de TypeScript/Vite y verificador de la biblioteca
  (3 personajes, 6 cuentos, 24 escenas de ruta y 3 preguntas-puente).
- Recorrido real en Chrome estable sobre `http://127.0.0.1:4173/` verificado
  para Mila: 3 páginas de lectura → ruta 1 → ilustración de consecuencia →
  reto correcto → recompensa y pregunta para la siguiente aventura. Sin
  errores observados en este recorrido inicial.
- Vite quedó levantado localmente en el puerto 4173 para continuar la revisión.
  El siguiente trabajo funcional prioritario sigue siendo moderación de salida;
  antes de revisión editorial final, recorrer también Lía y Cora y probar
  respuestas incorrectas/otras rutas en Chrome.

## MVP pixel art listo para revisión editorial — 14 sep 2026

- Interfaz refinada: la portada ahora lleva al selector, la selección de
  personajes/cuentos comunica el estado con más claridad, y el lector muestra
  un progreso de tres pasos (historia, ruta y reto). Se mantuvo el contenido,
  las rutas y el estilo pixel art. `npm test` y el detector de Impeccable
  pasaron tras este ajuste.
- Personajes GPT generados y guardados como PNG en `src/assets/characters/`:
  `mila-v1`, `lia-v1`, `teo-v1`, `cora-v1` y `gael-v1`. Los retratos de Mila,
  Lía y Cora ya se usan en las tarjetas del MVP; Teo y Gael quedan listos para
  la siguiente expansión. No reutilizar estos retratos como escenas de ruta.
- Decisión de producto nueva: incorporar **preguntas entre historias**. No son
  solo un quiz final: al terminar un cuento, una pregunta breve debe recuperar
  un aprendizaje, una decisión o una relación del capítulo anterior y preparar
  la siguiente aventura. Esto hará visible la evolución real de Mila, Lía y
  Cora a lo largo de una temporada.
- Implementado en el MVP: los primeros cuentos de Mila, Lía y Cora muestran
  una pregunta-puente al completar el reto final. La respuesta muestra una
  reflexión ligada al aprendizaje y ofrece el botón para abrir el segundo
  cuento del mismo personaje. `scripts/verify-mvp-library.mjs` exige ahora
  esas tres preguntas-puente. Verificado con `npm test` y HTTP 200 en 4173.
- Patrón adaptado de Wonder (sin copiar contenido ni diseño): el lector ahora
  divide el texto de apertura en páginas de una oración, muestra `PÁGINA X DE
  Y` y ofrece una sola acción de continuación; las rutas se revelan recién al
  acabar la lectura. El verificador exige este flujo corto por páginas.
- Principio estratégico de Nick: **no reinventar la rueda**. Investigar y
  adoptar los patrones ya probados por productos de cuentos interactivos
  (biblioteca clara, decisiones que importan, preguntas de comprensión,
  progreso, relectura y controles familiares), pero combinarlos y mejorarlos
  para el universo editorial pixel art en español de CuentosMati. No copiar
  marca, textos, arte ni código de terceros.
- Desarrollo local actual: Vite corre en `http://127.0.0.1:4173/` (sesión
  `51179`). El puerto 5173 devuelve `EACCES` en esta PC, por lo que usar 4173
  hasta que Windows libere/corrija esa reserva de puerto.
- Rama activa: `mvp-cinco-personajes`. Se reemplazó el frontend anterior por
  una biblioteca pixel art estática para niños de 8–12 años.
- Alcance construido: 3 protagonistas establecidos (**Mila**, **Lía**,
  **Cora**), 6 cuentos (2 por protagonista), una decisión de tres rutas por
  cuento, 24 escenas pixel art (apertura + 3 consecuencias por cuento), y una
  pregunta final no bloqueante con recompensa.
- Activos nuevos: `src/assets/mvp-stories/` contiene 24 WebP y
  `src/assets/mvp-sheets/` conserva las seis láminas fuente. El script
  `scripts/crop-mvp-story-sheets.mjs` permite regenerar los recortes desde las
  láminas sin redibujar los recursos. Generados con GPT Image.
- Verificación: `npm test` pasó (build +
  `scripts/verify-mvp-library.mjs`), que comprueba 3 protagonistas, 6 cuentos,
  seis definiciones de rutas, 24 escenas no vacías y reto final. Detector de
  Impeccable para `src/App.tsx`: 0 hallazgos. La pregunta final otorga la
  recompensa aun si el niño se equivoca (muestra la respuesta), por lo que no
  hay bloqueo. Se reemplazaron roles de tabs incompletos por botones con
  `aria-pressed`; el título del documento también es `CuentosMati`. La prueba
  visual en Chrome estable queda pendiente porque esa superficie no está
  conectada a esta sesión; no validar con Brave.
- Revisar con Nick usando `docs/mvp-review.md`. Todo el contenido es borrador;
  no desplegar ni marcar un cuento como publicado hasta su aprobación.

## Dirección del nuevo MVP: biblioteca pixel art — 14 sep 2026

- Regla confirmada por Nick: el producto será una **biblioteca de cuentos para
  niños de 8 a 12 años**. No es una experiencia de generación de cuentos.
- Toda pieza visual nueva —UI, personajes, portadas, rutas, insignias y fondos—
  debe usar **pixel art** consistente. No mezclar con las ilustraciones suaves
  o fotográficas del proyecto anterior.
- Se generaron tres composiciones de referencia, solo para elegir estructura,
  en `.impeccable/mocks/pixel-library-comp-a.png` (sala/biblioteca),
  `pixel-library-comp-b.png` (mapa de personajes) y
  `pixel-library-comp-c.png` (libro abierto). No son artes finales ni están
  conectadas a la app; falta aprobación de Nick antes de implementar.

## Regla editorial + catálogo inicial de 10 — 14 sep 2026

- Nick revisará personalmente **cada cuento antes de publicarlo**. No marcar
  un cuento como listo ni desplegar ampliaciones del catálogo sin esa revisión.
- Cada decisión narrativa debe tener una ilustración propia que refleje la
  consecuencia elegida; no reutilizar la imagen de otra rama. Esto exige
  preparar y revisar las imágenes de rama antes de declarar un cuento listo.
- La biblioteca local ahora expone solo 10 candidatos iniciales para esa
  revisión: `mila-brujula`, `luna-roble`, `zorro-azucar`, `sofia-tren`,
  `gael-isla`, `alma-cometa`, `vera-faro`, `teo-biblioteca`, `cora-jardin` y
  `robot-nubes`. Los otros cuentos y sus recursos siguen preservados en el
  repositorio, fuera de la experiencia pública inicial.
- **Estado de imágenes por decisión:** pendiente. No generar recursos ni usar
  créditos hasta que Nick revise el cuento/las rutas y pida explícitamente la
  tanda correspondiente. `mila-brujula` tiene el modelo de ramas, pero faltan
  imágenes de rama por producir/revisar.
- **Nuevo alcance de demostración:** mostrar únicamente `mila-brujula` en la
  biblioteca. Es el primer cuento a revisar y terminar en pixel art. Sus
  decisiones requieren imágenes propias por ruta antes de considerarlo listo;
  no usar las escenas planas como sustituto final de esas consecuencias.

## Biblia inicial de protagonistas — 14 sep 2026

- Nick decidió que los cuentos se construirán desde protagonistas establecidos
  con nombre, personalidad y evolución; no serán personajes genéricos por
  historia.
- Los cinco protagonistas de arranque están definidos en
  `docs/personajes-iniciales.md`: **Mila** (exploradora), **Lía** (inventora),
  **Teo** (detective amable), **Cora** (cuidadora de la naturaleza) y **Gael**
  (quien une al grupo). Cada uno tiene anclas visuales, fortaleza, aprendizaje,
  voz y dos premisas de cuentos.
- **Regla confirmada:** todos los cuentos del catálogo inicial tendrán como
  protagonista a uno de estos cinco (dos aventuras por protagonista). Los
  personajes secundarios pueden cambiar o repetirse, pero no se añadirá otro
  protagonista principal sin una decisión explícita de Nick. No renombrar ni
  generar contenido sin su revisión explícita.

## Inicio confirmado: biblioteca para lectores de 8 a 12 años — 14 sep 2026

- Nick confirmó que el producto arranca como **biblioteca de cuentos**, sin
  generación de cuentos ni de imágenes como requisito de lectura. El flujo de
  Inicio ya es categoría → personaje → cuento existente; conservarlo como el
  camino principal y no reintroducir el creador en la portada.
- Validación al iniciar: `npm test` pasó (TypeScript/Vite build + verificadores).
  Las 70 historias activas tienen sus cinco escenas propias. La variante
  experimental ramificada de `mila-brujula` aún tiene imágenes pendientes, pero
  no bloquea la biblioteca ni se generó ningún recurso nuevo en esta sesión.

## Piloto: pregunta de comprensión al final del cuento — 14 sep 2026

Nick pidió agregar preguntas al final de cada cuento donde el niño responda y
gane recompensas. Antes de eso, surgió una duda de UX: su hijo (tester) creía
que podía "responder mal" al elegir un camino dentro del cuento — se le
respondió que eso es indeseado (las decisiones narrativas no tienen opción
incorrecta, generan ansiedad de examen en vez de curiosidad) y que el lugar
correcto para bien/mal es una pregunta de comprensión al terminar de leer, no
las decisiones. Se decidió con Nick: recompensa = cualidades del héroe
(Valentía/Ingenio/Amistad, sistema ya existente), y empezar con **piloto en
2 cuentos** antes de escribir las 70 preguntas restantes.

- **Qué se hizo:** `src/App.tsx` — tipo `ComprehensionQuestion` + diccionario
  `storyQuizzes` (por ahora solo `lia-pixeles` y `mila-brujula`, 1 pregunta de
  opción múltiple cada uno). Nuevo estado `quizSelected`/`quizDone`, handler
  `answerQuiz` (reutiliza el mismo mecanismo de recompensa +1 cualidad y el
  aviso "creciste" que ya usan las decisiones normales, con dedupe por
  `awardedDecisionsKey` bajo la clave `quiz:<storyId>` para no otorgar la
  cualidad más de una vez aunque el niño relea el cuento).
- **Dónde vive en la UI:** al llegar a la página final (`readingPage.isFinal`)
  de un cuento del catálogo con pregunta configurada, se muestra la pregunta
  **antes** del resumen "Así terminó tu aventura" y del botón "Volver a la
  biblioteca". Si falla, el mensaje es amable ("Casi: la respuesta era... Igual
  completaste tu aventura") y de todos modos avanza — nunca bloquea. Estilos
  nuevos en `src/styles.css`: `.story-quiz`, `.quiz-feedback`,
  `.route-option.is-correct/.is-wrong`, reutilizando `.route-option` que ya
  usan las decisiones.
- **Verificado:** `npx tsc -b` y `npm run build` sin errores. Probado en Chrome
  estable (puerto 4173 — el 5175 sigue reservado por Windows en esta PC):
  recorrido completo de `lia-pixeles` con respuesta incorrecta (feedback
  correcto, botón Continuar, resumen final normal) y de `mila-brujula` con
  respuesta correcta (+1 Amistad, aviso de cualidad). Se releyó `mila-brujula`
  una segunda vez y se confirmó que la cualidad **no** se duplica
  (`cuentos-profile-traits` se mantuvo en `friendship: 1`). Cero errores de
  consola en ambos recorridos.
- **Pendiente:** si a Nick y su hijo les gusta el piloto, escribir 1 pregunta
  por cuento para los 68 restantes (misma estructura `ComprehensionQuestion`)
  y decidir si conviene generarlas con IA a partir del texto real de cada
  cuento (se ofreció esa opción, quedó pendiente de decidir el volumen
  completo). También quedó pendiente probar con el hijo si el copy de las
  decisiones narrativas debería aclarar "no hay camino incorrecto" — no se
  tocó esta sesión, solo se dejó la recomendación.

## Nuevo norte de producto — 14 sep 2026 (corregido por Nick)

- Nick aclaró que la portada debe conservar su estructura anterior. En vez de
  crear un cuento, el niño elige primero una categoría real, después uno de los
  personajes que pertenecen a ella y la app abre esa historia exacta.
- `src/components/story-finder.tsx` usa las categorías existentes como filtro,
  muestra sus personajes con las portadas reales y permite buscar por nombre.
  No genera texto ni imágenes.
- La experiencia experimental de “miradas” fue retirada por completo.
- La generación anterior sigue en código/backend por compatibilidad, pero ya no
  se expone en Inicio; no borrarla sin una limpieza explícita posterior.
- Archivos principales: `src/components/story-finder.tsx`, `src/App.tsx`,
  `src/styles.css`, `PRODUCT.md`.
- `npm run build` pasó. Chrome estable comprobó categoría `Misterio y pistas`
  → 15 personajes → Inés → cuento exacto, sin errores de consola. Revisión
  visual final: PASS. No se desplegó.

## Entorno local activo — 14 sep 2026

- PostgreSQL local activo en `55432` (`cuentos-postgres`).
- Backend activo en `http://localhost:3300`; `/health` responde `{"ok":true}`.
- Frontend activo en `http://localhost:4173` y validado en Chrome estable: carga
  con título `Érase una vez` y sin errores de consola.
- Se usó `4173` porque Windows reserva el rango `5129-5228`, que incluye el
  puerto documentado `5175`; no se cambió configuración versionada.
- `.env.local` apunta correctamente a `http://192.168.0.5:3300`. El backend se
  inició con un override de proceso que añade los orígenes `4173`; CORS quedó
  verificado para `http://localhost:4173` sin cambiar `server/.env`.
- Logs de ejecución: `.runtime/backend.log` y `.runtime/frontend.log`.
- Recorrido visual en Chrome estable: `Nico y la ciudad sobre las nubes`
  completado (ruta: reloj pequeño → torre → desatar nudos → viento de nubes).
  Los cinco capítulos, las cualidades y el final cargaron correctamente; cero
  errores de consola.
- Cuento de prueba añadido al catálogo: **Lía y la ciudad de píxeles**
  (`lia-pixeles`), con cinco ilustraciones originales pixel art generadas con
  GPT y convertidas a WebP (`src/assets/lia-pixeles-scene-1..5-v1.webp`). Se
  dejó con fecha 14 sep 2026 para que sea fácil de localizar como reciente.
  `npm run build` pasó y el capítulo 1 se verificó abierto en Chrome, sin
  errores de consola.
- Rediseñado `Crea tu propia aventura` como un solo dashboard de tres pasos:
  héroe → mundo → revisión/creación. Solo muestra las opciones del paso actual,
  mantiene las elecciones al avanzar/volver y el botón Continuar exige elegir
  héroe. Build, Chrome y vista móvil (390 px) comprobados sin errores de
  consola. Archivos: `src/components/story-creator.tsx`, `src/styles.css`.
- Navegación de lectura corregida: el botón superior izquierdo de un cuento
  abierto desde Biblioteca ahora se llama `Volver a la biblioteca` y vuelve
  directamente al catálogo, incluso antes de terminar la lectura. Validado en
  Chrome con `Lía y la ciudad de píxeles` (biblioteca → cuento → biblioteca).

## Decisión visual de Nick — 12 sep 2026

- **Todos los recursos visuales del juego se generarán exclusivamente con el
  generador de imágenes de GPT.** No usar Leonardo, Google Flow ni otros
  generadores para este proyecto, salvo que Nick cambie esta decisión de forma
  explícita.
- Esta regla aplica tanto a ilustraciones de cuentos como a personajes,
  fondos, objetos, iconos decorativos, pantallas y cualquier recurso gráfico
  nuevo o regenerado.
- No regenerar recursos existentes sin una petición explícita; cuando se pida
  una tanda nueva, usar la skill `imagegen` y guardar los archivos dentro de la
  estructura versionada correspondiente del proyecto.
- Primera tanda generada con el imagegen integrado de GPT:
  `src/assets/adventure-map-background-gpt-v1.png` (mapa panorámico 1672×941,
  cinco zonas de progreso, sin texto/personajes) y
  `src/assets/explorer-map-assets-gpt-v1.png` (cinco poses, 2172×724,
  transparencia alfa verificada). Son archivos nuevos; todavía no están
  conectados a la UI ni sustituyen `hero-aventura.webp`/`hero-levels-v2.png`.

Actualizado: 12 de septiembre de 2026 (tarde — `SavedStory.pages[]` + modo
relectura HECHO, ver primera sección; ramificación real de los 70 cuentos,
Mercado Pago producción, fix de soles y páginas legales siguen abajo).

## Deploy producción — 12 sep 2026 (completado)

- Arquitectura confirmada por Nick: **frontend en Vercel** y **API + PostgreSQL
  en MONICA**. El CNAME `maticuentos.benielstudio.app` hacia Vercel es correcto;
  no reemplazarlo por un registro A hacia MONICA.
- Frontend publicado en Vercel el 12 sep: deployment
  `dpl_RQUeXDpMciz4YA3xZePYjK7rKxvk`, alias productivo
  `https://maticuentos.benielstudio.app` (también
  `https://cuentos-lake.vercel.app`). Se configuró `VITE_API_URL` de producción
  como `https://maticuentos-api.benielstudio.app`.
- El primer intento de build remoto falló porque `.vercelignore` excluía
  `src/assets/hero-levels-v2.png`; se añadió una excepción explícita y el
  segundo build quedó READY. Validado en Chrome estable: portada completa,
  cero errores de consola. HTTPS frontend/API → 200 y preflight CORS desde el
  dominio frontend → 204 con el origen correcto.

## Deploy MONICA — 12 sep 2026

- Backend desplegado en `/home/beniel/cuentosmati-prod` con
  `docker-compose.prod.yml`: API Node, PostgreSQL 16 privado con volumen
  `cuentosmati_database_data` y frontend Nginx en la red compartida `proxy`.
- API pública activa: `https://maticuentos-api.benielstudio.app/health` → 200.
  Registro real verificado con 20 créditos; la cuenta descartable se eliminó.
  `/api/images/generate` sin token → 401.
- La instalación systemd antigua quedó deshabilitada, no borrada; el puerto
  host `3100` quedó cerrado. Backup previo en
  `/home/beniel/backups/cuentosmati/`.
- Caddy apunta la API y el frontend a sus contenedores; configuración validada.
- El contenedor Nginx del frontend permanece en MONICA, pero no recibe el
  tráfico productivo: el frontend oficial se sirve desde Vercel por decisión
  de Nick. No cambiar el DNS a MONICA salvo una migración futura explícita.
- Rollback API: restaurar el Caddyfile respaldado, reiniciar `caddy-proxy` y
  ejecutar `systemctl --user enable --now cuentos-api` (la instalación vieja
  se conservó). La antigua base configurada en `127.0.0.1:55432` ya estaba
  ausente y no había volumen ni backup recuperable.

## Sesión 12 sep — `SavedStory.pages[]` + modo relectura: HECHO

Implementado el punto **B** de la hoja de ruta (releer un cuento propio ya
terminado sin gastar créditos ni volver a llamar al backend). Todo en
`src/App.tsx`, sin cambios de servidor (el endpoint `PUT /api/child/stories/:id`
ya guardaba `content` como JSONB sin schema, así que `pages` pasa igual).

- **Tipo nuevo** `SavedStoryPage = { text, choices, chosen, imageUrl }` y
  `SavedStory.pages?: SavedStoryPage[]` (opcional: los cuentos guardados antes
  de hoy no lo traen).
- **Estado nuevo** `storyPages` reemplaza al viejo `chapterTexts` (que solo
  guardaba texto). Se llena página por página al crear (`handleCreate`) y al
  continuar (`continueStory`): cada página nueva se agrega con `chosen: null`
  y, al recibir el `choice` del niño, la página anterior se actualiza con
  `chosen: <esa opción>`. Las imágenes llegan async (`createImage`) y
  actualizan la página + vuelven a guardar, igual que ya pasaba con
  `generated`/`ending`.
- **`saveStory`** ahora acepta `pages` y lo persiste en local + en
  `content.pages` del PUT al backend.
- **`openSavedStory`** restaura `storyPages` completo desde `saved.pages`. Si
  el cuento está **terminado** (`saved.ending?.canFinish`), entra en
  **modo relectura** (`isRereading = true`) empezando en la página 1, en vez
  de saltar directo a la última página como antes. Si sigue **en curso**,
  seguía como antes: reanuda en `saved.storyStep` con decisiones en vivo.
  - Efecto colateral bueno: esto también arregla el comentario viejo
    "aproximado hasta que se guarden todos los capítulos" — un cuento en
    curso reabierto ahora manda el contexto completo a `/api/continue`, no
    solo capítulo 1 + el actual.
- **UI de relectura**: en `step === "read"`, si `isRereading` las 3 opciones
  de decisión se muestran deshabilitadas marcando cuál se eligió ("Elegiste
  este camino") en vez de ser botones que llaman a `continueStory`. Debajo
  aparecen "Página anterior" / "Página siguiente" (usan `storyPages` en
  memoria, cero llamadas de red). Al terminar la relectura el botón dice
  "Volver a la biblioteca" (antes decía "Crear otra aventura" también para
  cuentos propios).
- **Migración de guardados viejos**: `openSavedStory` arma un `pages`
  aproximado de 2 entradas (`generated` + `ending`) cuando `saved.pages` no
  existe, para no romper la apertura. Esos cuentos viejos NO tienen modo
  relectura completo (falta el recorrido de en medio) — solo los creados
  desde ahora en adelante tienen `pages[]` real.
- Verificado con `npx tsc -b` (sin errores). **Falta probar en el navegador**:
  crear un cuento, terminarlo, volver a la Biblioteca, reabrirlo y recorrer
  "Página anterior/siguiente" hasta el final — no se hizo esta sesión porque
  se priorizó actualizar este handoff. Los dos dev servers que se usaron para
  el `tsc -b` quedaron **detenidos** al cerrar la sesión (puertos 3300/5175
  libres para el siguiente agente).

### Pendiente de esta línea de trabajo

1. **Prueba visual real** del flujo de relectura descrito arriba (no
   probado en Chrome esta sesión).
2. Decidir si vale la pena reconstruir el recorrido intermedio de los
   cuentos guardados **antes** de este cambio (hoy quedan con relectura
   incompleta) o dejarlo así — son datos de prueba, no de usuarios reales.
3. Sin estilos CSS dedicados para el nuevo bloque `.reread-nav` (reusa
   `.reading-actions`); si se ve raro, revisar `src/styles.css`.

## Sesión 11 sep (noche) — Ramificación real en los 70 cuentos: HECHO

El catálogo entero ramifica de verdad. **70/70 cuentos**, 837 recorridos de
mitad de cuento y 2511 finales distintos. Verificado por `npm test` y por
recorridos reales en Chrome. Antes de esto solo `mila-brujula` ramificaba: en
los otros 69 los 4 botones de decisión llevaban siempre al mismo texto.

**El bloqueador de la sesión anterior no era el proveedor, era el tamaño de la
petición.** OpenCode Go responde bien y **cuesta 0**. Lo que fallaba era pedir
las 4 ramas de un cuento en una sola petición: los modelos disponibles razonan
antes de escribir y agotaban los 8000 tokens de salida en `reasoning_content`,
llegando a `finish_reason: "length"` con `content` vacío. Ahora se pide **una
rama por petición** con `max_tokens: 16000` (~13k de razonamiento + ~2k de
JSON) y cada rama se guarda por separado. Resultado: 69/69 cuentos, 0 fallidos,
~45 min con concurrencia 10. DeepSeek sigue sin saldo (−$0.06); Together queda
como último respaldo y ya lleva `chat_template_kwargs: {enable_thinking:false}`
(sin eso Qwen nunca llega a emitir el JSON).

**Dos bugs del extractor que habrían roto todo en silencio:**
`extract-source.mjs` devolvía opciones con basura pegada (`Mirar el mapa otra
vez",`) y **no leía ni el título ni la página 1** (dos escapes mal puestos en
las regex). Era fatal: el `match` de cada rama tiene que coincidir byte a byte
con la opción de `src/App.tsx` o `resolveBranchPath` cae siempre a `branches[0]`
y la elección vuelve a ser cosmética. Reescrito con un tokenizador de literales
de cadena; ahora 69/69 con 4 opciones limpias.

**Dónde viven los datos.** Los árboles generados NO están dentro de `App.tsx`
(serían ~25k líneas sobre un archivo de 4.9k): están en
**`src/data/catalog-branches.json`** (2.4 MB, versionado), que `App.tsx`
importa y mezcla dentro de `branchingCatalog`. La rama escrita a mano de
`mila-brujula` sigue en `App.tsx` y gana sobre lo generado.

**Nada de imágenes nuevas** (decisión de Nick esta sesión): las 70 historias
usan su secuencia plana de 5 escenas, a la que el lector cae solo cuando una
rama no tiene imagen propia. La imagen no cambia según el camino, pero no se ve
nada roto. Las 30 de `mila-brujula` siguen pendientes (~$0.45, ver abajo).

### Lo que ahora vigila `npm test`

`npm test` = build + `verify-gpt-story-images.mjs` + **`verify-branching.mjs`
(nuevo)**. El verificador de ramas falla si:
- algún cuento del catálogo no tiene ramas reales;
- un `match` de rama no coincide con la opción de la página 1 (la trampa que
  devuelve la elección a ser cosmética);
- falta el final propio de alguna opción;
- dos ramas del mismo cuento repiten texto.

Hasta hoy **nada verificaba el gancho del producto**: los 69 cuentos falsos
pasaban el build sin una queja.

**Además, `npm test` llevaba tiempo en rojo por una razón ajena a esto**:
`verify-gpt-story-images.mjs` exigía los literales
`https://api.openai.com/v1/images/generations` y `^gpt-image-`, que dejaron de
existir cuando `server/image-generation.js` se volvió config-driven para poder
usar Together como pasarela. Se cambiaron por comprobaciones equivalentes
(modelo por defecto GPT Image, override por `OPENAI_IMAGE_MODEL`, lista blanca
de familias, `/images/generations`). Y el estimador de coste de
`generate-branch-images.mjs` estaba fijo en $0.04/img (gpt-image-1 medium) y
sobreestimaba x2.7: ahora lee `OPENAI_IMAGE_QUALITY` (las 30 de Mila son
~$0.45, no ~$1.20).

### Herramientas de esta sesión

- `npm run branch:generate` — extrae de `App.tsx` y genera las ramas que
  falten (checkpoint por rama, seguro de reanudar, `--only=<id>`, `--force`).
- `npm run branch:assemble` — funde `scripts/branch-gen/output/*.json` en
  `src/data/catalog-branches.json` y valida coincidencias.
- `node scripts/branch-gen/preview.mjs <id>` — imprime recorridos completos tal
  como los lee un niño, para el repaso manual de calidad.
- `node scripts/branch-gen/browse-check.mjs <id> ...` — recorre el cuento **en
  Chrome** dos veces con decisiones distintas y falla si alguna página se
  repite o si hay errores de consola. Necesita `npm run dev -- --port 5175`.
  Usa `playwright-core` + el Chrome instalado (el MCP de Playwright y la
  extensión de Chrome estaban caídos esta sesión).
- `scripts/branch-gen/output/` está gitignorado: es el rastro crudo del
  generador, reproducible. Lo que usa la app es el JSON ensamblado.

### Calidad comprobada

- 4416 bloques de texto, **4416 únicos**; 0 repetidos entre cuentos distintos.
- 0 opciones de más de 10 palabras, 0 marcadores sin sustituir, 0 `undefined`.
- Navegador: `ines-mapa`, `luna-roble`, `dragon-panadero`, `bea-semillas`,
  `sami-volcan`, `ramon-mapache-arcoiris` — páginas 2-5 distintas en los dos
  recorridos, 5 páginas completas, sin errores de consola.

### Pendiente de esta línea de trabajo

1. **Repaso humano de calidad.** Se revisaron a fondo 2 cuentos y por encima
   otros 5; quedan ~62 sin leer por una persona. `preview.mjs` es la vía.
2. ~~**5 finales cortos** de `ramon-mapache-arcoiris`~~ **HECHO 12 sep**:
   ampliados manualmente de 22-24 a 52-54 palabras, sin regenerar ni alterar
   las claves de decisión. Catálogo reensamblado y `npm test` correcto.
3. **Dos ramas salieron del respaldo Together/Qwen-9B** (OpenCode agotó el
   presupuesto de razonamiento y el generador cayó al siguiente proveedor).
   Pasaron la validación estructural, pero conviene leerlas.
4. **El diccionario plano `chapters` de `App.tsx` ya es código muerto** para
   los 70 cuentos (`nextCatalogChapter` nunca llega a él). Se dejó en su sitio
   a propósito: borrarlo es una limpieza aparte, después de que el repaso
   humano confirme que ningún cuento necesita volver atrás.
5. **Las 30 imágenes de rama de `mila-brujula`** (~$0.45 de los ~$3.4 de
   crédito Together). Nick decidió no gastarlas todavía.

## Sesión 11 sep — Mercado Pago producción + legal

- `server/.env` ahora tiene `MERCADO_PAGO_ACCESS_TOKEN` con un token de
  **producción** (`APP_USR-...`, no `TEST-...`). Cualquier checkout real desde
  ahora mueve dinero real. No commiteado (gitignored).
- **Bug de moneda corregido**: el backend ya cobraba en soles
  (`currency_id: "PEN"` en `/api/payments/checkout`, `server/index.js`), pero
  `src/components/account-panel.tsx` mostraba los mismos montos como
  "$1.99 USD". Se corrigió a "S/ 1.99 soles" etc. (los 3 planes:
  inicio/aventura/biblioteca). Antes de esto, un padre veía un precio en
  dólares y se le cobraba en soles: riesgo de reclamo/contracargo.
- **Páginas legales nuevas** (`src/components/legal-pages.tsx`): Privacidad,
  Términos, Reembolsos, Borrado de datos. Enlazadas desde el footer global en
  `src/App.tsx` (visible en toda la app, overlay a pantalla completa). Datos
  usados en los documentos (decisión de Nick, 11 sep):
  - Responsable: **Beniel Studio** (Nick Ledesma), sin RUC formal aún.
  - Contacto: `kyva1103@gmail.com`.
  - Reembolsos: **sin reembolsos** salvo que la falla sea nuestra (cobro de
    Mercado Pago confirmado pero las monedas no se acreditaron).
  - **Pendiente si el proyecto avanza a producción real**: revisión por un
    abogado peruano antes de publicar de cara al público (protección de datos
    de menores + Ley 29733 + requisitos de Mercado Pago). Este contenido es un
    borrador funcional, no asesoría legal.

## Propósito del producto (norte)

CuentosMati existe **para que los niños lean y para motivarlos a leer**. Leer es
el objetivo; todo lo demás (crear personaje, decidir, ilustraciones, perfiles)
está al servicio de que el niño quiera abrir el cuento y seguir leyéndolo.

Consecuencia de diseño: **no** se prioriza narración por voz (leería la app, no
el niño). Las decisiones prioritarias son las que reducen la fricción para
empezar a leer y las que dan ganas de seguir.

## Objetivo vigente del MVP

El corazón del producto no es solamente leer el catálogo. El MVP debe permitir
que un niño cree su propio cuento interactivo de principio a fin:

1. elegir o escribir un personaje;
2. escoger el tipo de aventura;
3. generar el capítulo 1 y su ilustración GPT;
4. elegir una decisión en cada página y generar los capítulos 2 a 5 como
   consecuencia de esas elecciones;
5. terminar el cuento y encontrarlo guardado en su Biblioteca.

Para la demostración familiar, este recorrido debe funcionar sin pasos de pago
ni configuración técnica visibles para el niño. La cuenta, los créditos de
prueba, el backend, el modelo de texto y GPT Image deben estar preparados antes
de iniciar la sesión.

## Estado actual

- Frontend React/Vite con creación, lectura, decisiones, mapa de capítulos,
  progreso por cualidades, perfiles y cuentos guardados.
- Backend Express/PostgreSQL con autenticación familiar, créditos y persistencia.
- Biblioteca con 70 cuentos y cinco escenas propias por cuento.
- **Categorías unificadas**: un solo conjunto de 6 (`Misterio y pistas`,
  `Aventura y exploración`, `Ideas e inventos`, `Fantasía y magia`,
  `Amigos y sentimientos`, `Naturaleza`) usado a la vez en "Crea tu propia
  aventura" y en la Biblioteca (`storyCategories` en `src/App.tsx`, construido
  remapeando las listas heredadas de 10 y 5 categorías + `generationDirections`
  con place/mission para las 6). Los 70 cuentos quedaron categorizados (los
  huérfanos se asignaron por palabra clave del id/título).
- **Selector de héroe sin preselección**: ningún personaje activo por defecto;
  el niño debe tocar un preset o escribir el suyo antes de poder crear (CTA
  "Elige un héroe primero"). Sin botón "Sorpréndeme" (se probó y se quitó: solo
  elegía al azar entre los mismos 3 presets, no aportaba).
- **Validación + rescate del personaje libre** (`salvageCharacter` en
  `/api/stories`): prefiltro local (lista negra + heurística de galimatías) y,
  solo si es sospechoso, una pasada `deepseek-flash` que SIEMPRE devuelve un
  personaje apto. El frontend muestra "Tu héroe será: X ✨" cuando cambió.
- **`/api/continue` y `/api/images/generate` ahora exigen `auth`** (antes eran
  públicos). Las imágenes se guardan namespaced por usuario:
  `media/cuentos/<parentId>/<storyId>/<step>.jpg`.
- La lectura del catálogo usa exclusivamente la secuencia canónica
  `scene-1-v2.webp` a `scene-5-v2.webp`, una imagen distinta por capítulo. Se
  eliminó la ruta paralela `readerImages` que repetía la primera escena en los
  capítulos 1 y 2.
- Al finalizar un cuento del catálogo, el botón dice “Volver a la biblioteca” y
  regresa directamente, sin mostrar la advertencia de abandonar una lectura.
- La advertencia “¿Volver al inicio?” permanece únicamente al salir de un cuento
  que todavía no ha terminado.

## Infraestructura de generación (sep 2026)

Todo local en la PC. `server/.env` (no versionado):

- **Texto** (cuentos creados por el niño): `OPENCODE_GO_*` → gateway OpenCode Go
  (`https://opencode.ai/zen/go/v1`), modelo `deepseek-flash`. Requiere el
  encabezado `x-opencode-session` (ya lo añade `ask()` en `server/index.js`).
  Cadena de respaldo: DeepSeek directo → Together (`TOGETHER_TEXT_MODEL`).
- **Imágenes**: `server/image-generation.js` es config-driven vía
  `OPENAI_API_KEY` / `OPENAI_BASE_URL` / `OPENAI_IMAGE_MODEL` /
  `OPENAI_IMAGE_QUALITY` / `OPENAI_IMAGE_SIZE`. Hoy: clave de **Together** como
  `OPENAI_API_KEY`, `OPENAI_BASE_URL=https://api.together.xyz/v1`,
  `OPENAI_IMAGE_MODEL=openai/gpt-image-1.5`, `OPENAI_IMAGE_QUALITY=low`.
  - `openai/gpt-image-1.5` low: ~$0.015/img, **~30 s**, **1024×1024 cuadrada**
    (Together ignora `size` y `seed`). Estilo preferido por Nick.
  - Alternativa probada: `black-forest-labs/FLUX.1.1-pro` (~$0.04, ~7 s,
    1440×800 16:9). El código ya la soporta (manda `width`/`height`).
  - Crédito Together disponible ≈ $3.4 (≈ 45 cuentos runtime a 5 img). Es
    presupuesto de construir/demostrar, NO de producción.
- **Persistencia de imágenes (FTP)**: `server/media-storage.js` sube cada imagen
  generada al FTP del entorno **Nick1** (`p3022.use1.stableserver.net`, hosting
  Windows/IIS — el docroot de `nick1.ximery.com` ES la raíz FTP, por eso
  `FTP_DIR=media` a nivel raíz, no `public_html/`). `/api/images/generate`
  (ahora auth-gated) acepta `{prompt, storyId, step}`, genera en Together, sube
  a `media/cuentos/<parentId>/<storyId>/<step>.jpg` (namespaced por usuario) y
  devuelve una URL HTTP estable (`http://nick1.ximery.com/media/...`). Si el
  FTP falla, devuelve la URL efímera del proveedor. Verificado end-to-end:
  login → crear → continuar → generar imagen → sube → `GET` 200 image/jpeg.
  → Esto también arregla la fiabilidad: ya no dependemos de las URLs `shrt` de
  Together que caducan.
  → Credenciales del FTP (host/usuario/password) están en `server/.env`
  (gitignored) y también quedaron en el historial de chat — la password se
  reutiliza en FTP+SQL Server+MySQL del hosting; rotar si esto pasa a producción.
- Para las 30 imágenes del modelo ramificado (`mila-brujula`) hay un pipeline
  aparte: `scripts/branch-images.manifest.mjs` + `generate-branch-images.mjs`
  (dry-run por defecto). Pendiente de ejecutar.

## Ilustraciones del catálogo: regla

- Las 70 historias del catálogo tienen cinco webp propios
  `src/assets/<id>-scene-1-v2.webp` … `scene-5-v2.webp` (verificado: distintas
  por capítulo, sin compartir entre cuentos — `npm test`).
- Ese catálogo estático NO se regenera sin petición explícita.
- Si la Biblioteca necesita imágenes nuevas, las creará GPT Plan Pro.
- La regla histórica "solo GPT Image / Together solo texto" quedó **relajada**:
  para runtime se usa Together como gateway y `image-generation.js` admite
  `gpt-image-*` o `flux`. Leonardo sigue fuera.

## Hoja de ruta — decisiones de Nick (10 sep 2026)

Tras revisar la competencia (apps de cuento AI 2025-2026: casi todas para dormir
y pasivas; el estándar de seguridad es doble pasada prompt + moderación de
salida; venden libro de recuerdo; español nativo + interactividad ramificada es
un nicho que CuentosMati puede ocupar):

- **Hecho:**
  - Validación + rescate del texto libre de personaje (server, `/api/stories`):
    prefiltro local + pasada `deepseek-flash` que SIEMPRE devuelve un personaje
    apto; galimatías → nombre pronunciable con oficio; inapropiado → sustituto
    amable. Se muestra al niño en positivo.
  - UX de selección de personaje: sin preselección; el CTA exige elegir un preset
    **o** escribir uno; el campo libre deselecciona presets (y viceversa). Se
    probó un botón "Sorpréndeme" y se quitó por feedback de Nick.
  - Texto-primero + imagen asíncrona con placeholder (ya existía; se añadió
    reintento y copy de espera).
  - Continuidad visual del personaje: ficha `PERSONAJE` más rica + instrucción de
    referencia más estricta en `illustrationPrompt`. (Lock duro imposible con
    `gpt-image-1.5` — no admite seed ni imagen de referencia; requeriría un
    modelo tipo FLUX Kontext.)
- **Pendiente:**
  - **Moderación de salida**: revisar cada capítulo generado antes de mostrarlo
    (segunda pasada `deepseek-flash` o API de moderación). Es el estándar de la
    industria para apps infantiles; hoy solo confiamos en el prompt de sistema.
  - **Exportar / recuerdo**: "guardar el cuento terminado como PDF ilustrado".
    Gancho de retención y posible upsell (la competencia vende libro impreso).
- **Futuro / condicional (si el proyecto funciona):**
  - El niño DENTRO del cuento como héroe (pasar apodo/edad/rasgos del perfil al
    prompt). Se solapa con "crea tu personaje".
- **Descartado a propósito:** narración por voz (contradice el norte de que lea
  el niño).
- **Relectura + "¿qué hubiera pasado si…?"** (decidido con Nick; B hecho, C
  pendiente):
  - Rebobinar una decisión y elegir otra rama **cuesta créditos** (rama derivada
    = cuento nuevo que copia hasta el punto de bifurcación y regenera N→5).
  - Almacenamiento de imágenes resuelto: FTP Nick1 (ya funcionando en runtime).
  - **B: HECHO (12 sep).** `SavedStory.pages: [{text, choices, chosen,
    imageUrl}]` — se guarda cada página completa (ver sección de sesión al
    inicio del handoff). Un cuento propio terminado se reabre en modo
    relectura desde la página 1, con "Página anterior/siguiente", 0 llamadas
    al backend. Los guardados de antes de hoy siguen con la versión
    aproximada (cap-1 + cap-actual) porque no tienen `pages[]`.
  - **C (pendiente):** UI de rebobinado en modo relectura → elegir otra
    opción → cobra `BRANCH_CREDIT_COST` (nuevo env) → genera N→5 + imágenes
    (persistidas) → guarda como cuento derivado.

## Bugs corregidos en la revisión del flujo (10 sep, tarde)

Nick pidió auditar el flujo completo de creación; aparecieron 3 bugs reales,
los tres arreglados y verificados:

1. **Imagen no se re-guardaba tras una decisión.** `continueStory` guardaba el
   capítulo con `imageUrl: null` y, cuando la imagen llegaba (async), solo
   actualizaba el estado en memoria — nunca volvía a `saveStory`. Al reabrir un
   cuento guardado, el capítulo actual salía sin ilustración para siempre. Fix:
   `saveStory` se vuelve a llamar dentro del callback de `createImage`.
2. **Lector rápido perdía la imagen del capítulo anterior.** `imageRequestId`
   era un contador global: decidir antes de que terminara la imagen del
   capítulo en curso invalidaba esa petición. Fix: `imageRequestEpoch` (para
   invalidar todo al salir del cuento) + `imageRequestKeys` por `storyId:step`
   (cada página tiene su propia validez, independiente de las demás).
3. **`/api/continue` no veía la historia completa.** El `context` mandaba solo
   el capítulo 1 + el último capítulo mostrado; a partir del capítulo 3-4 el
   modelo perdía de vista los intermedios. Fix: `chapterTexts[]` acumula el
   texto de cada capítulo ya mostrado y se manda completo.
4. **`/api/continue` y `/api/images/generate` eran endpoints públicos** (sin
   `auth`). Cualquiera podía continuar cuentos gratis o escribir imágenes al
   FTP. Ahora ambos exigen `auth` y el frontend manda el token.

Verificado con curl/PowerShell: `continue`/`images` sin token → 401; con token
→ flujo completo login→stories→continue→images→FTP→200 OK.

## Verificación realizada

El 9 de septiembre de 2026 se ejecutó `npm test` con resultado correcto:

- build de TypeScript/Vite correcto;
- `GPT WebP sequences ready: 70/70`;
- `GPT Image configured for new chapters: yes`;
- `All catalog stories use GPT sequences: yes`;
- `Legacy image providers disabled: yes`;
- sin WebP vacíos, duplicados dentro de un cuento ni compartidos entre cuentos.

El verificador comprueba archivos y configuración, pero no sustituye la prueba
visual. Antes de presentar el producto al niño, recorrer cuentos completos en
Google Chrome estable y comprobar cada transición visible.

## Próximo trabajo prioritario

Lo de la lista original (levantar frontend/backend, cuenta de prueba, texto+
imagen en los 5 capítulos, decisiones que cambien la narración, guardado
básico) **ya está probado** end-to-end esta sesión. Queda:

1. **Bono inicial ajustado a 20 créditos (12 sep)**: una cuenta nueva puede
   crear un cuento personalizado completo. El saldo y el asiento `welcome`
   usan una sola constante (`welcomeCreditGrant`) para no desincronizarse.
2. ~~**B**: `SavedStory.pages[]` completo~~ **HECHO 12 sep** (ver sección de
   arriba) — falta la prueba visual real en Chrome (no se hizo esta sesión).
3. **Moderación de salida** (#3 de la hoja de ruta) — pendiente.
4. **Probar desde el móvil**: ya no es un bloqueo de código — `server/.env`
   local (no versionado) ya tiene `HOST=0.0.0.0` y `ALLOWED_ORIGINS` incluye
   `http://192.168.0.5:5175` (la IP LAN de esta PC). Si esa IP cambia (otra
   red, DHCP), hay que actualizar `ALLOWED_ORIGINS` a mano.
5. Recorrido visual completo en Chrome estable — capítulos 1 a 5, imagen
   cuadrada revisada en el `StoryImageFrame` panorámico (decidir marco 1:1 vs
   recorte vs FLUX), errores de red simulados, **y el nuevo modo relectura**
   (punto 2).
6. **Presupuesto**: crédito Together ≈ $3.4, es de demo. Recargar antes de
   usuarios reales.

No considerar listo el MVP solamente porque el catálogo funcione. La creación
personalizada completa debe pasar esta prueba de punta a punta.

## Mapa interactivo del proyecto — 12 sep 2026

- Generado con `understand-anything` en `.ua/knowledge-graph.json`: 422 archivos,
  483 nodos, 99 relaciones, 9 capas arquitectónicas y un tour guiado de 12
  pasos en español.
- `.ua/` es un artefacto local regenerable y quedó ignorado por git.
- Para abrirlo de nuevo, usar la skill `understand-dashboard` desde la raíz del
  proyecto; levanta el visor local con una URL temporal que incluye token.

## Cómo ejecutar en esta PC

Frontend:

```powershell
npm run dev -- --host 0.0.0.0 --port 5175
```

Backend:

```powershell
cd server
npm run dev
```

El backend requiere `DATABASE_URL`, `JWT_SECRET`, un proveedor de texto (hoy
OpenCode Go) y config de imagen + FTP:

```text
OPENCODE_GO_API_KEY=...
OPENCODE_GO_MODEL=deepseek-flash
OPENAI_API_KEY=...              # hoy: la clave de Together
OPENAI_BASE_URL=https://api.together.xyz/v1
OPENAI_IMAGE_MODEL=openai/gpt-image-1.5
OPENAI_IMAGE_QUALITY=low
FTP_HOST=... FTP_USER=... FTP_PASSWORD=... FTP_SECURE=true FTP_DIR=media
MEDIA_PUBLIC_URL=http://nick1.ximery.com/media
```

`docker compose up -d` levanta Postgres (`cuentos-postgres`, puerto 55432) si
no está arriba. No versionar `server/.env`. Todo el desarrollo y las pruebas se
realizan en la PC principal. MONICA es exclusivamente el destino de producción
mediante el flujo de deploy aprobado; no modificarla durante desarrollo. SUSANA
solo se usa si Nick lo solicita explícitamente.

## Archivos de referencia

- `src/App.tsx`: catálogo, lector, flujo principal, categorías, selector de
  héroe, `chapterTexts`/`imageRequestEpoch`.
- `src/components/story-creator.tsx`: pantalla "Crea tu propia aventura".
- `server/index.js`: generación narrativa, cuentas, créditos, persistencia,
  `salvageCharacter`, `illustrationPrompt`.
- `server/image-generation.js`: generación de imagen (GPT Image o FLUX, según
  `OPENAI_IMAGE_MODEL`).
- `server/media-storage.js`: subida de imágenes al FTP (Nick1) y URL pública.
- `scripts/verify-gpt-story-images.mjs`: validación de las 70 secuencias del
  catálogo + de las imágenes del modelo ramificado.
- `scripts/branch-images.manifest.mjs` + `generate-branch-images.mjs`: pipeline
  (dry-run) para las 30 imágenes de `mila-brujula`.
- `scripts/try-image.mjs`: probar modelos/prompts de imagen sueltos sin tocar
  el proyecto (`node scripts/try-image.mjs "prompt" --quality low`).
- `docs/gpt-image-migration.md`: registro de la migración.
- `docs/illustration-style-guide.md`: dirección visual vigente.

## Precauciones

- **Git existe** (`git init` hecho el 10 sep), pero solo hay un commit
  baseline; todo lo de esta sesión (categorías, selector de héroe, salvage,
  FTP, bugfixes) sigue sin commitear.
- No regenerar ni sobrescribir secuencias aprobadas del catálogo sin una
  petición explícita.
- Después de alterar imágenes o navegación, ejecutar `npm test` y una prueba
  visual completa en Chrome estable.
- No desplegar automáticamente a MONICA.
- `.env.local` (raíz) tiene `VITE_API_URL` — si algún día apunta a SUSANA o a
  otra máquina en vez de `http://localhost:3100`, el login y la creación fallan
  en silencio (ya pasó una vez). Confirmar que apunte a esta PC.
- Credenciales del FTP Nick1 en `server/.env` (gitignored) — ver nota de
  seguridad en Infraestructura de generación.
