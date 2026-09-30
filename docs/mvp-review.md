# Revisión de cuentos e ilustraciones

## Correcciones y verificación — 29 de septiembre de 2026

Se corrigieron los pendientes de implementación de esta revisión en la PC, incluida la portada de Teo generada con Google Flow. No se realizó ningún despliegue a MONICA.

### Cambios aplicados

- Tipografía: Lora sustituye a Fraunces en títulos, botones y etiquetas para dar una forma más familiar a la «j». Andika conserva la lectura de los cuentos. Se actualizaron la app, la landing y la especificación de diseño.
- Los 18 cuentos visibles usan las portadas y escenas de fábula. Se retiraron del build los imports y globs de generaciones anteriores; los originales siguen en el repositorio.
- La portada de Teo, «El Engranaje Escondido», se reemplazó por una imagen de Flow con un solo Teo y una sola Lía. Se revisó ampliada antes y después de convertirla a WebP de 1024 × 1024.
- El paquete de recursos pasó de aproximadamente 427,5 MiB de imágenes a 83,6 MiB de recursos totales, sin PNG antiguos.
- Producción usa la API HTTPS pública de `.env.production`; el JavaScript compilado ya no contiene la IP privada de desarrollo. Vite rechaza configuraciones HTTP y direcciones locales comunes.
- Desarrollo usa el proxy `/api` de Vite hacia la API local en el puerto 3300.
- Se ajustaron los 19 textos base y 42 continuaciones que excedían el criterio editorial. El verificador exige ahora 35–45 palabras y comprueba formato y dimensiones de todas las portadas y escenas.
- El mensaje al guardar una elección ya no promete siempre un punto: las opciones de tentación pueden tener una consecuencia instructiva.
- Se sustituyó la comprobación de navegador antigua por `tests/qa-journey.mjs`, para la extensión existente de Chrome, sin lanzar navegadores headless.
- Se actualizaron README, MVP y reglas del proyecto. La instrucción de Nick de usar Google Flow quedó registrada en AGENTS.md.

### Instrucciones de Nick aplicadas

SMTP, verificación de correo y recuperación de contraseña por correo quedaron fuera del alcance. El correo sigue siendo el identificador de la cuenta; no se añadió envío de mensajes.

Se detuvo la generación local en curso y el proceso de ComfyUI. El puerto 8188 quedó sin listener. Las siguientes imágenes del proyecto se deben generar con Google Flow, conservando el estilo de fábula y las fichas como referencias.

### Verificación realizada

- `npm test`: TypeScript, build de Vite y verificador de los 18 cuentos, correcto.
- Configuración negativa: Vite rechazó expresamente un build con la API HTTP privada de desarrollo.
- `server` → `npm run test:pixel-progress`: registro, guardado, recuperación y conflictos con API y PostgreSQL locales, correcto.
- Recorrido mediante Playwright MCP en la extensión de Chrome: 18 cuentos, 90 capítulos, 54 preguntas y 108 monedas. Se ejercitaron cambios de elección, consecuencias intermedias, imágenes elegidas en el capítulo siguiente, moralejas, reintentos sin penalización, recompensas y persistencia al recargar. La prueba restauró la partida y la sesión originales.
- Tipografía en biblioteca: Lora y Andika cargadas; inspección visual a 2048 px y 390 px, sin desbordamiento horizontal. El detector de tipografía no dejó hallazgos.

El recorrido usó eventos DOM de clic porque la extensión no activaba los controles con el ratón. No certifica interacción con puntero, navegación completa con teclado ni recuperación entre dos dispositivos físicos. No se repitió la revisión visual ampliada de las 306 escenas ni se probó contra producción.

### Portada corregida y límites de entrega

La portada corregida está en `src/assets/fable/covers/teo-taller-estrellas-cover.webp`. Flow usó las fichas de Teo y Lía como referencias; se conservó el estilo de plumilla y acuarela sobre papel crema, con el engranaje escondido y el taller como contexto.

Proyecto de Flow: [portada de Teo](https://flow.google.com/project/5dc7eb93-e376-4458-ab6c-6e3222fabc10). Nick inició la generación en Brave después de que la sesión automatizada no activara el botón. La imagen resultante se descargó, revisó e instaló.

El árbol de Git ya contenía numerosos cambios y recursos nuevos al comenzar. No se hizo commit ni se mezclaron automáticamente todos esos cambios.

## Revisión histórica — 25 de septiembre de 2026

La revisión siguiente corresponde al catálogo y al arte anteriores a la migración a fábula clásica. Su declaración de aptitud no certifica la versión actual.

## Alcance y método

Se revisaron visualmente las láminas de los 18 cuentos visibles: una portada y 17 ilustraciones por cuento (apertura, cuatro escenas siguientes y doce decisiones). También se compararon las imágenes problemáticas con el texto de su capítulo u opción, se verificó el catálogo con `npm test` y se abrió la biblioteca local en Google Chrome normal.

El script `scripts/audit-story-illustrations.py` comprueba existencia, formato, tamaño y duplicados idénticos de las 306 escenas. Sus láminas de revisión se guardan en `F:/Proyectos/ComfyUI/salidas/audit-cuentos/`.

## Resultado

- 18 portadas WebP cuadradas presentes.
- 306 ilustraciones de escena y decisión presentes, todas WebP de 1024 × 768 y con contenido distinto a nivel de archivo.
- Las 18 historias tienen cinco capítulos y tres rutas de decisión en los capítulos 1 a 4. El capítulo 5 cierra sin decisión. El verificador del proyecto pasó.
- En Chrome normal se abrieron el perfil y la biblioteca de Teo; las tres portadas aparecieron. El backend local de progreso en `192.168.0.5:3300` no estaba levantado, por lo que esa parte no se revisó en esta pasada.

## Correcciones aplicadas

Se regeneraron e instalaron nueve imágenes tras revisar cada reemplazo:

| Cuento | Archivo o tramo | Problema corregido |
| --- | --- | --- |
| Suri, Árbol de las Luciérnagas | 3b, 3c y 4a | La imagen mostraba dos Suri; ahora muestra una. |
| Suri, Lago de los Reflejos | 3c | La imagen mostraba dos Suri sin que el texto lo justificara. |
| Teo, Ciudad de Cobre | 2c | Un vecino parecía otro Teo; la nueva imagen mantiene un solo Teo. |
| Rok, Cueva de los Ecos | apertura | Aparecía un monstruo real antes de que el cuento revelara que solo era una sombra y un eco. |
| Teo, Taller de las Estrellas | 3b | El plano contenía escritura inventada; ahora contiene dibujos de engranajes. |
| Teo, Bosque de las Brújulas | capítulo 3 y 3b | El mapa y la puerta tenían letras o marcas parecidas a texto; ahora usan rutas y pictogramas. |

## Segunda pasada de calidad visual

Se regeneraron e instalaron otras 29 imágenes, siempre tras compararlas con su opción o capítulo:

| Cuento | Imágenes sustituidas | Mejora visible |
| --- | ---: | --- |
| Bit, Observatorio de la Luz | 8 | El guardián y la astrónoma son humanos distinguibles de Bit; se ven la acusación, la medición, el cable, la reparación y el cielo recuperado. |
| Suri, Árbol de las Luciérnagas | 7 | La apertura y el capítulo 2 muestran a la cría como luciérnaga en el nido bajo; las escenas siguientes hacen visible la ruta iluminada. |
| Luma, Isla de las Barcas Dormidas | 7 | Brisa es la barca pequeña con semillas; Veloz, la barca mayor con banderín rojo. Se reconocen mejor en la carrera, la niebla y el regreso. |
| Nia, Faro de las Nubes | 4 | Las nubes pequeñas participan en la lámpara y las rutas de viento, con encuadres distintos. |
| Rok, Cueva de los Ecos | 3 | Se muestran la grieta, el murciélago real y la escucha en la entrada de la cueva. |

Se descartaron propuestas con personajes duplicados, ausencia del protagonista, texto inventado o cambios inconsistentes de diseño. El catálogo queda **apto para la biblioteca local actual** en contenido y arte. Las escenas que mantienen un encuadre parecido conservan la continuidad del mundo y no contradicen el cuento.

Esta revisión visual y editorial no sustituye una lectura con niños de ocho años. La sincronización del progreso requiere levantar el backend local y queda fuera del alcance de esta revisión de cuentos e imágenes.
