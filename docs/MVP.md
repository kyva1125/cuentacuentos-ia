# MVP — Maticuentos

## Modelo canónico de contenido

Cada personaje tiene su propia biblioteca de cuentos dentro de su perfil. No hay cuentos genéricos ni cuentos compartidos entre personajes, y no se reutiliza una historia sustituyendo el nombre del protagonista.

Cada cuento pertenece a un único personaje e incluye:

- Una historia y una aventura propias.
- Una portada exclusiva en alta resolución.
- Exactamente 5 capítulos.
- Cinco escenas y doce imágenes de decisión exclusivas: tres opciones en cada uno de los primeros cuatro capítulos.
- La imagen elegida se muestra como imagen grande del capítulo siguiente.
- Tres decisiones propias en cada uno de los primeros cuatro capítulos, cada una con su continuación.
- Exactamente tres preguntas propias al cierre del cuento.

La historia, los textos de decisión, las preguntas y los recursos visuales forman una unidad de contenido exclusiva. Desbloquear o seleccionar otro personaje muestra otra biblioteca, no una variante del mismo catálogo.

Los 18 cuentos visibles son fábulas al estilo de Esopo para lectores de unos ocho años. El **protagonista** tiene un defecto pequeño que sale de su personalidad, y un personaje secundario representa lo contrario. Cada página tiene dos párrafos breves de 35–45 palabras, con diálogo, algo de humor y repetición. La última elección lleva a uno de tres cierres, cada uno con su propia moraleja. La tercera pregunta del cierre usa la moraleja del camino elegido. Los 18 cuentos están reescritos y el verificador aplica este criterio a capítulos y continuaciones.

## Interacción por capítulo

Cada capítulo termina con tres decisiones. En los cuentos con la fórmula nueva, una de ellas es la **tentación**: lo que haría el personaje llevado por su defecto. Su posición cambia de un capítulo a otro.

Las tarjetas no muestran el premio antes de elegir, para que el niño se pregunte si la opción está bien. Al pulsar «Continuar» aparece una **pantalla intermedia animada** con el retrato del personaje, que revela el resultado; el niño pulsa «Continuar» otra vez para leer la consecuencia en el capítulo siguiente:

- Si la opción es buena, suma un punto a la habilidad asociada («+1 Astucia»).
- Si es la tentación, no suma habilidad. Deja una **lección aprendida**, una frase corta que se guarda en el perfil del personaje. Equivocarse enseña, pero no se premia como un acierto.

El niño puede volver y cambiar de opinión dentro del mismo capítulo. En ese caso, la nueva elección reemplaza la anterior y nunca acumula más de un resultado por capítulo.

El retrato del personaje permanece en la parte inferior de la pantalla. Al elegir, pone cara de estar pensando; al continuar, reacciona a lo que pasó.

No hay narración en audio. La experiencia está diseñada para que el niño lea el cuento.

## Cierre y recompensa

Al terminar el capítulo 5 se muestra la **moraleja** del final elegido en una tarjeta, como en las fábulas de Esopo.


Después de completar el capítulo 5 aparecen exactamente tres preguntas de comprensión:

1. La primera respuesta correcta entrega 1 moneda.
2. La segunda respuesta correcta entrega 2 monedas.
3. La tercera respuesta correcta entrega 3 monedas.

Si una respuesta es incorrecta, se muestra una carita triste y el niño puede volver a intentarlo sin límite y sin perder monedas ni progreso.

## Guardado familiar

La partida se guarda automáticamente en el navegador sin exigir registro para empezar a leer. La opción permanente «Guardar progreso» y un aviso tras terminar el cuento invitan a pedir ayuda a un adulto. El adulto crea una cuenta con su correo y contraseña, y un perfil infantil con nombre y edad. Al crear la cuenta, la partida que ya existe en ese dispositivo se vincula automáticamente.

Después, los cambios se sincronizan con la cuenta. La interfaz distingue entre «guardado en la cuenta», «guardando» y problemas de conexión; cuando la red falla, el avance sigue en el dispositivo. Al iniciar sesión en otro dispositivo se recupera la partida de la cuenta. Si existen dos partidas diferentes, el adulto elige cuál conservar antes de sobrescribir una. El backend usa una revisión para rechazar actualizaciones antiguas.

La cuenta necesita la API, PostgreSQL y la migración `server/migrations/003-pixel-progress.sql`. Por indicación de Nick del 29 de septiembre de 2026, el MVP no incluye SMTP, envío de correos, verificación de correo ni recuperación de contraseña por correo. El correo existente sigue siendo el identificador para registro e inicio de sesión.

## Estilo visual canónico

Decisión de Nick del 27 de septiembre de 2026: el pixel art se sustituye por el estilo **fábula clásica**, como un libro ilustrado de fábulas de Esopo de principios del siglo XX.

- Interfaz: papel envejecido con textura, tinta sepia, dorado de lomo y cubiertas burdeos. Esquinas suaves, trazo fino y sombras suaves de papel.
- Paleta: `ink` #2e2118, `paper` #fbf4e4, `page` #efe2c4, `gold` #d9ab45, `grape` (burdeos) #5b2a2f, `coral` (terracota) #a8412c, y los tonos de habilidad `sun` #e3a55b, `sky` #9dbdd0 y `leaf` #9db57a.
- `Lora` para títulos, botones y etiquetas. `Andika` para la lectura, porque es una tipografía diseñada para lectores que empiezan.
- Ilustraciones: plumilla y acuarela sobre papel crema. Los personajes siguen siendo niños tiernos y reconocibles a partir de sus fichas. Cada escena indica la emoción concreta del personaje, en lugar de una sonrisa por defecto.

La app usa las seis fichas y expresiones de fábula, las 18 portadas y las 306 escenas actuales. El arte pixel anterior se conserva como material histórico en el repositorio y queda fuera del build. Por indicación de Nick del 29 de septiembre de 2026, las nuevas imágenes se generan con Google Flow, manteniendo las fichas y el estilo canónicos.
