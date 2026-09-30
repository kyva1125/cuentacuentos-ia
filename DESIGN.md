---
name: Maticuentos · Fábula clásica
description: Libro ilustrado de fábulas donde cada decisión de lectura cambia el cuento y hace crecer al personaje.
colors:
  ink: "#2e2118"
  line: "#5a4331"
  paper: "#fbf4e4"
  page: "#efe2c4"
  gold: "#d9ab45"
  burgundy: "#5b2a2f"
  terracotta: "#a8412c"
  courage-ochre: "#e3a55b"
  wit-blue: "#9dbdd0"
  friendship-olive: "#9db57a"
typography:
  display: { fontFamily: "Lora, Georgia, serif", fontWeight: 600-700, lineHeight: 1.2 }
  body: { fontFamily: "Andika, Trebuchet MS, system-ui, sans-serif", fontSize: "clamp(1.2rem, 2.1vw, 1.42rem)", fontWeight: 400, lineHeight: 1.7 }
  label: { fontFamily: "Lora, Georgia, serif", fontWeight: 600, textTransform: uppercase, letterSpacing: "0.08em" }
rounded:
  card: "10px"
  pill: "999px"
---

# Design System: Maticuentos · Fábula clásica

Decisión de Nick, 27 de septiembre de 2026. Sustituye al sistema anterior, «Aventuras Píxel».

## Idea

Maticuentos es un libro de fábulas, como las de Esopo, que el niño lee y decide. La interfaz tiene que parecer un libro ilustrado antiguo y cuidado, no una consola ni una app genérica: papel envejecido, tinta sepia, dorado de lomo y cubiertas de cuero burdeos. Así se diferencia de las apps infantiles en 3D o dibujo animado y le dice al adulto «lectura con valores» antes de leer una línea.

## Color

- **Papel** (`page` para el fondo, `paper` para las páginas y tarjetas): el fondo lleva una textura de grano suave y una luz cálida arriba.
- **Tinta** (`ink` para el texto, `line` para los trazos): nunca negro puro.
- **Dorado** (`gold`): acción principal, capítulo actual, monedas y adornos (❦).
- **Burdeos** (`burgundy`): cubiertas, como la cabecera del perfil y de la biblioteca, con títulos en dorado claro (#f0cf7a).
- **Cuero** (degradado #3a2a1e → #2a1d14): barra superior, retrato inferior y bloques de cierre.
- **Habilidades**: ocre para Valentía, azul polvo para Ingenio y oliva para Amistad. Son tonos apagados y legibles con tinta encima.
- **Terracota** (`terracotta`): error y reintento, sobre fondo rosado claro. Nunca rojo chillón.
- **Noche**: azul tinta profundo (#33415a → #1f2636).

## Tipografía

- **Lora** para títulos, botones y etiquetas. Las etiquetas van en versalitas: mayúsculas con 0,08em de espaciado.
- **Andika** para la lectura. Está diseñada para lectores que empiezan: distingue bien b/d/p/q y usa la «a» de un solo piso.
- La lectura de los capítulos va a 1,2–1,42rem con interlineado 1,7. No bajar de 0,8rem en ninguna etiqueta.

## Forma y profundidad

- Esquinas de 10px en tarjetas y paneles, y en píldora para la navegación y los botones de la portada.
- Trazo fino de tinta (1,5–2px, color `line`) y una segunda línea interior en las páginas de lectura, a modo de filete de libro.
- Sombras suaves de papel (`--shadow-sm/md/lg`). Nada de sombras duras desplazadas.
- Al pasar el ratón, la tarjeta sube 2–3px. Al pulsar, el botón baja 1px.

## Ilustración

- Plumilla y acuarela sobre papel crema, como los libros de fábulas de principios del siglo XX: tonos tierra con acentos cálidos que brillan. Nada de pastel.
- Los personajes siguen siendo **niños tiernos**. Se generan con Google Flow y las fichas como referencias, manteniendo el estilo de fábula. Nick cambió el proveedor el 29 de septiembre de 2026.
- Cada escena indica la **emoción concreta** del personaje (preocupado, arrepentido, orgulloso…), no una sonrisa por defecto. En una fábula, la emoción del error es el momento clave.
- El catálogo activo usa 18 portadas y 306 escenas de fábula en WebP.

## No hacer

- Volver a sombras duras, esquinas cuadradas, Press Start 2P o `image-rendering: pixelated`.
- Usar colores saturados de videojuego, como la paleta PICO-8.
- Poner textos largos en Lora: la lectura siempre va en Andika.
