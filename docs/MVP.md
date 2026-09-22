# MVP — Aventuras Píxel

## Modelo canónico de contenido

Cada personaje tiene su propia biblioteca de cuentos dentro de su perfil. No hay cuentos genéricos ni cuentos compartidos entre personajes, y no se reutiliza una historia sustituyendo el nombre del protagonista.

Cada cuento pertenece a un único personaje e incluye:

- Una historia y una aventura propias.
- Una portada exclusiva en alta resolución.
- Exactamente 5 capítulos.
- Tres imágenes exclusivas en alta resolución por capítulo, una para cada decisión.
- La imagen de la decisión elegida se reutiliza como la imagen grande del capítulo; no se genera una cuarta imagen separada.
- Exactamente tres decisiones por capítulo, cada una con texto propio del cuento.
- Exactamente tres preguntas propias al cierre del cuento.

La historia, los textos de decisión, las preguntas y los recursos visuales forman una unidad de contenido exclusiva. Desbloquear o seleccionar otro personaje muestra otra biblioteca, no una variante del mismo catálogo.

## Interacción por capítulo

Cada capítulo termina con tres decisiones: una por cada habilidad del personaje. Al elegir, aumenta la habilidad asociada.

El niño puede volver y cambiar de opinión dentro del mismo capítulo. En ese caso, la nueva elección reemplaza la anterior: se retira el punto de la habilidad previamente elegida y se asigna a la nueva, sin acumular más de un punto por capítulo.

El retrato del personaje permanece en la parte inferior de la pantalla. Se muestra neutral por defecto y cambia de emoción con una animación al seleccionar una decisión.

No hay narración en audio. La experiencia está diseñada para que el niño lea el cuento.

## Cierre y recompensa

Después de completar el capítulo 5 aparecen exactamente tres preguntas de comprensión:

1. La primera respuesta correcta entrega 1 moneda.
2. La segunda respuesta correcta entrega 2 monedas.
3. La tercera respuesta correcta entrega 3 monedas.

Si una respuesta es incorrecta, se muestra una carita triste y el niño puede volver a intentarlo sin límite y sin perder monedas ni progreso.

## Guardado familiar

La partida se guarda automáticamente en el navegador sin exigir registro para empezar a leer. La opción permanente «Guardar progreso» y un aviso tras terminar el cuento invitan a pedir ayuda a un adulto. El adulto crea una cuenta con su correo y contraseña, y un perfil infantil con nombre y edad. Al crear la cuenta, la partida que ya existe en ese dispositivo se vincula automáticamente.

Después, los cambios se sincronizan con la cuenta. La interfaz distingue entre «guardado en la cuenta», «guardando» y problemas de conexión; cuando la red falla, el avance sigue en el dispositivo. Al iniciar sesión en otro dispositivo se recupera la partida de la cuenta. Si existen dos partidas diferentes, el adulto elige cuál conservar antes de sobrescribir una. El backend usa una revisión para rechazar actualizaciones antiguas.

La cuenta necesita la API, PostgreSQL y la migración `server/migrations/003-pixel-progress.sql`. El MVP no incluye verificación de correo ni recuperación de contraseña; deberán añadirse antes de considerar completo el acceso familiar en producción.

## Estilo visual canónico

- Pixel art estricto en toda la interfaz y sus recursos visuales.
- Sin bordes redondeados.
- Bordes gruesos con sombras duras.
- Paleta fija: `ink`, `paper`, `sun`, `coral`, `leaf`, `sky`, `grape` y `gold`.
- `Press Start 2P` para títulos, botones y etiquetas cortas.
- `Baloo 2` para textos de lectura y contenido extenso.

No se incorporan estilos, colores ni tipografías fuera de este sistema sin una nueva decisión explícita del producto.
