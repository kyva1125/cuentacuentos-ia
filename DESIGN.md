---
name: Aventuras Píxel
description: Consola infantil donde las decisiones de lectura se convierten en crecimiento RPG visible.
colors:
  ink-navy: "#1d2b53"
  parchment: "#fff1e8"
  courage-orange: "#ffa300"
  retry-coral: "#ff004d"
  friendship-green: "#00e436"
  ingenuity-sky: "#29adff"
  night-grape: "#7e2553"
  reward-gold: "#ffec27"
typography:
  display: { fontFamily: "Press Start 2P, ui-monospace, monospace", fontSize: "clamp(1.45rem, 4vw, 2.7rem)", fontWeight: 400, lineHeight: 1.5 }
  headline: { fontFamily: "Press Start 2P, ui-monospace, monospace", fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: 400, lineHeight: 1.5 }
  body: { fontFamily: "Baloo 2, system-ui, sans-serif", fontSize: "clamp(1.15rem, 2vw, 1.4rem)", fontWeight: 500, lineHeight: 1.6 }
  label: { fontFamily: "Press Start 2P, ui-monospace, monospace", fontSize: "0.62rem", fontWeight: 400, lineHeight: 1.5 }
rounded:
  none: "0"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "28px"
  xl: "36px"
components:
  button-primary: { backgroundColor: "{colors.reward-gold}", textColor: "{colors.ink-navy}", typography: "{typography.label}", rounded: "{rounded.none}", padding: "14px 18px", height: "52px" }
  button-secondary: { backgroundColor: "{colors.parchment}", textColor: "{colors.ink-navy}", typography: "{typography.label}", rounded: "{rounded.none}", padding: "14px 18px", height: "52px" }
  panel: { backgroundColor: "{colors.parchment}", textColor: "{colors.ink-navy}", rounded: "{rounded.none}", padding: "28px" }
---

# Design System: Aventuras Píxel

## Overview

### GPT asset production rule

All visual content resources are generated with GPT: avatars, emotional portraits, chapter scenes, decision images, covers, badges, trophies, and collectibles. Interface controls, layout, and accessible states remain code-based. Every generation must preserve the Nia reference set's pixel scale, official palette, thick dark outlines, and lack of antialiasing.

**Creative North Star: "La consola de héroes intercambiables"**

Aventuras Píxel convierte la lectura en una travesía RPG visible y táctil. El niño elige un personaje y luego uno de seis cuentos jugables, atraviesa seis capítulos, puede sustituir cualquiera de sus decisiones y ve cómo las tres habilidades del personaje crecen bloque a bloque. Perfil y Cuentos son destinos separados: la biblioteca organiza la elección, pero cada portada abre una aventura completa en vez de una galería pasiva.

El mundo es una consola infantil construida con la paleta PICO-8 de ocho colores, pergamino, contornos azul marino duros y paneles cuadrados. La ilustración pixel art contiene la fantasía; la interfaz conserva la claridad mecánica de un juego con estados presionados, progreso segmentado y recompensas persistentes.

**Key Characteristics:**

- Nia lidera un roster de seis personajes. Nia, Teo y Luma comparten geometría humana; Rok, Bit y Suri tienen siluetas propias de dragón, robot y espíritu.
- Siete pantallas forman el recorrido: personajes, perfil, biblioteca, capítulo, decisión, preguntas y recompensa.
- Seis cuentos de prueba jugables contienen seis capítulos y dieciocho caminos cada uno; cada elección suma una habilidad y puede reemplazarse.
- Dos preguntas reintentables entregan 1 y 2 monedas; el cierre muestra monedas, habilidades y logros.
- La persistencia local convierte cada sesión en crecimiento acumulado.
- Seis portadas GPT, una por cuento, comparten recorte cuadrado, borde duro y tratamiento pixel-art.
- Un sprite de CSS grid aparece dentro de cada escena de lectura; las imágenes de decisión muestran solamente el objeto o escenario reutilizable.
- Una barra inferior fija muestra el retrato del personaje y reacciona con expresiones neutral, courage, wit y friend.

## Colors

La paleta usa exactamente ocho colores PICO-8: cielo para el mundo, pergamino para leer y acentos semánticos para habilidades, noche, error y recompensa.

### Primary

- **Dorado de recompensa:** acción principal, progreso actual, insignias y desbloqueos.
- **Azul cielo de ingenio:** fondo global y progreso de Ingenio.

### Secondary

- **Naranja de valentía:** bloques y paneles de Valentía.
- **Verde de amistad:** Amistad, capítulos completados y respuestas correctas.
- **Uva nocturna:** escenas nocturnas, perfil y estados bloqueados.

### Tertiary

- **Coral de reintento:** feedback incorrecto; nunca sustituye al dorado de acción.

### Neutral

- **Tinta azul marino:** texto, bordes, barra superior y sombras.
- **Pergamino:** lectura, tarjetas, botones secundarios y segmentos vacíos.

**The Eight-Color Cartridge Rule.** No se introduce un noveno color, degradado, transparencia cromática o blanco independiente.

**The Skill Is Color Rule.** Valentía es naranja, Ingenio es cielo y Amistad es verde en todo el sistema.

## Typography

**Display Font:** Press Start 2P (con `ui-monospace`, `monospace`)

**Body Font:** Baloo 2 (con `system-ui`, `sans-serif`)

**Label/Mono Font:** Press Start 2P

**Character:** Press Start 2P da voz al sistema de juego —títulos, botones, estados, navegación y datos— mientras Baloo 2 mantiene cálida y fluida la narración infantil.

### Hierarchy

- **Display** (400, `clamp(1.45rem, 4vw, 2.7rem)`, 1.5): aperturas de etapa.
- **Headline** (400, `clamp(1.2rem, 3vw, 2rem)`, 1.5): capítulos y preguntas.
- **Title** (400, desde `0.85rem`, 1.5): tarjetas, secciones y recompensas.
- **Body** (500, `clamp(1.15rem, 2vw, 1.4rem)`, 1.6): cuento y explicaciones, máximo 65ch.
- **Label** (400, desde `0.52rem`, 1.5): progreso, botones, niveles y estados.

**The Two-Voice Rule.** Press Start 2P nunca absorbe párrafos; Baloo 2 nunca sustituye la señalética mecánica.

## Layout

Las pantallas viven en contenedores centrados de 1180px; lectura y decisiones alcanzan 1240px. El ritmo usa pasos recurrentes de 8, 12, 18, 28 y 36px. La primera vista usa un roster de tres columnas para mostrar las seis siluetas y sus habilidades. La biblioteca usa tres columnas de portadas cuadradas, baja a dos en 900px y a una en 620px. El lector divide ilustración y texto en `1.15fr / 0.85fr`; las tres decisiones tienen igual autoridad.

A 900px, habilidades y decisiones pasan a una columna, el lector se apila y las decisiones se vuelven filas ilustradas. A 620px, el roster pasa a una columna, se compactan retrato y progreso y las acciones finales se apilan.

**The Playable Shelf Rule.** La biblioteca puede usar una cuadrícula de portadas, pero cada tarjeta debe comunicar estado, duración y una acción inmediata para comenzar, continuar o volver a jugar; nunca es una galería pasiva.

## Elevation & Depth

La profundidad es estructural: bordes sólidos de 3–4px y sombras desplazadas sin desenfoque hacen que cada superficie parezca una pieza física. La interacción mueve la pieza respecto de su sombra; no existen sombras suaves ni vidrio.

### Shadow Vocabulary

- **Panel offset** (`5px 5px 0 #1d2b53`): tarjetas y contenedores.
- **Control offset** (`4px 4px 0 #1d2b53`): botones, insignias y progreso.
- **Selected path** (`9px 9px 0 #ffec27`): elección activa desplazada -4px.
- **Reward lift** (`8px 8px 0 #1d2b53`): pregunta y recompensa.

**The Mechanical Depth Rule.** Toda sombra es dura; al presionar, el control avanza 5px y la sombra desaparece.

## Shapes

Paneles, botones, tarjetas, chips, barras, marcos e indicadores tienen esquinas completamente cuadradas (`0`). Los contornos azul marino y la ilustración con `image-rendering: pixelated` forman una geometría modular.

**The No-Radius Rule.** El radio es siempre cero. No se redondea ningún componente.

## Components

### Buttons

- **Shape:** rectángulo sin radio, borde de 3px y altura mínima de 52px.
- **Primary:** dorado con tinta; **Secondary:** pergamino con tinta; ambos usan padding 14px × 18px.
- **Hover / Focus / Press:** elevación de 2px cuando aplica; foco dorado de 4px separado 4px; presión de 5px sin sombra.
- **Disabled:** opacidad 45%, sin sombra ni gesto de presión.

### Chips

- **Style:** etiquetas `+1` con borde de 3px, icono y color fijo de habilidad.
- **State:** explican el crecimiento de la ruta; no son adornos ni filtros.

### Cards / Containers

- **Corner Style:** cuadrado absoluto.
- **Background:** pergamino; uva para perfil y noche.
- **Border:** tinta de 3px en elementos internos y 4px en superficies principales.
- **Internal Padding:** 18–24px en tarjetas; 28–56px en lectura y evaluación.

### Navigation

Barra superior azul marino con borde inferior dorado de 4px. Cuentos y Perfil son acciones hermanas y destinos separados; durante la lectura, Guardar y salir vuelve a la biblioteca. En móvil ambas acciones conservan sus iconos y ocultan el texto.

### Story Library Card

La biblioteca muestra seis tarjetas en una cuadrícula de tres columnas. Cada tarjeta usa una portada GPT cuadrada (`aspect-ratio: 1`) con `object-fit: cover`, borde inferior azul marino de 4px, cuerpo de pergamino y sombra dura. El cuerpo combina estado —Disponible, En progreso o Completado—, título, sinopsis, metadato `6 capítulos · 2 preguntas` y un botón de ancho completo. Las portadas viven en `src/assets/story-covers-gpt` y deben preservar el mismo lenguaje pixel-art que el resto del mundo.

### Segmented Skill Bar

Cinco bloques con borde azul marino muestran el avance hacia el siguiente hito, no un máximo. Vacíos en pergamino; llenos en naranja, cielo o verde. El total absoluto siempre queda visible y accesible. Hay logro al llegar a 1 y luego en cada múltiplo de 5, sin techo y sin bloquear contenido.

### Chapter Progress

Seis cuadrados numerados: completado verde, actual dorado con sombra y desplazamiento, pendiente pergamino.

### Decision Card

Objeto o escenario pixel art sin el personaje jugable, chip `+1`, texto en Baloo 2 y estado explícito. La selección desplaza la tarjeta, cambia la sombra a dorado y añade franja inferior; puede reemplazarse sin penalización.

### Character Sprite and Portrait

Una cuadrícula CSS de 12 × 16 celdas construye cada personaje con los tres colores de su configuración. La plantilla humana se comparte; dragón, robot y espíritu tienen geometrías independientes. La escena de lectura usa el cuerpo completo. La barra fija reutiliza la plantilla activa y cambia únicamente ojos y boca; al decidir, el retrato rebota durante 350 ms y anuncia la expresión por texto accesible.

Cada tarjeta acompaña la silueta con tres líneas breves de origen, temperamento y motivación en Baloo 2. El perfil conserva ese lore completo. El rebote del retrato usa cuatro pasos discretos para mantener el movimiento dentro del lenguaje pixel art.

El roster y el perfil muestran recortes individuales de la lámina GPT aprobada. Durante el cuento, el sistema vuelve al sprite de cuadrícula para que los seis personajes puedan expresar neutralidad, valentía, ingenio y amistad. El ánimo base evoluciona por capítulo y cada decisión lo sustituye con la expresión de su habilidad.

### Quiz Feedback

Opciones de pergamino. Error coral con invitación a reintentar; acierto verde, monedas según orden y continuación.

### Coin Wallet

El monedero dorado vive en la barra superior. Las preguntas entregan monedas con multiplicador 1, 2 y, cuando exista una tercera dificultad, 3. Las tarjetas bloqueadas muestran su precio; al reunirlo, un clic descuenta las monedas y desbloquea al personaje permanentemente. No existe XP ni nivel separado.

## Do's and Don'ts

### Do:

- **Do** convierte cada elección en progreso visible de Valentía, Ingenio o Amistad.
- **Do** conserva los ocho colores exactos, contornos azul marino e imágenes pixeladas.
- **Do** mantiene al personaje seleccionado y sus habilidades como protagonistas de la experiencia.
- **Do** mantiene Perfil y Cuentos como destinos separados y devuelve Guardar y salir a la biblioteca.
- **Do** usa una portada GPT pixel-art distinta para cada uno de los seis cuentos jugables.
- **Do** separa siempre fondo de lectura, sprite del personaje e imagen de decisión reutilizable.
- **Do** permite reemplazar decisiones, reintentar preguntas y conservar progreso local.
- **Do** combina color con forma, texto o posición para cada estado.
- **Do** respeta `prefers-reduced-motion` y foco visible.

### Don't:

- **Don't** conviertas la biblioteca en una galería pasiva: toda portada debe conducir a un cuento completo y mostrar su estado.
- **Don't** introduzcas radios, sombras difusas, degradados o vidrio.
- **Don't** intercambies Press Start 2P y Baloo 2 fuera de sus roles.
- **Don't** uses color sin significado de habilidad, estado, ambiente o recompensa.
- **Don't** bloquees al niño por un error ni trates una elección como equivocada.
- **Don't** superpongas texto largo sobre pixel art.
