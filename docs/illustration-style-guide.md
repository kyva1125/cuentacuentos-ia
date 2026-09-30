# Guía de ilustración del catálogo

La referencia vigente es `luma-arrecife-cristal` y el estilo aprobado por Nick en septiembre de 2026: ilustración de cuento en pixel art 2D, píxeles nítidos, contornos oscuros y colores intensos. La referencia visual está en `.generador/estilo-referencia.png`; la ficha de personajes y mundos, en `.generador/ficha.json`. Las reglas operativas completas están en `AGENTS.md`.

## Producción

- Generar el arte de este proyecto solo con la skill local `generador-local-imagenes` y los seis personajes de `src/assets/style-v2/characters/`.
- Aprobar primero la portada cuadrada del cuento. Copiarla a `.generador/mundos/` y registrarla en la ficha antes de crear escenas.
- Generar las escenas con `--personaje` para cada personaje visible y `--mundo` con la portada aprobada. Describir la acción y variar el encuadre.
- Guardar las ilustraciones activas en WebP: portada en `src/assets/style-v2/` y 17 escenas por cuento en `src/assets/illustrations-v3/` (apertura, capítulos 2 a 5 y tres opciones en cada capítulo 1 a 4).
- Las escenas miden 1024 × 768. Revisar cada imagen antes de instalarla: identidad del personaje, acción de la opción, personajes duplicados, objetos ajenos y letras inventadas.
- Evitar texto dentro de mapas, señales y planos. Usar rutas, formas o pictogramas cuando el cuento necesita información visual.

No aplicar pixelado, cuantización ni aumento de brillo adicional a las salidas aprobadas. Para cambios en la receta visual del proyecto, modificar `.generador/` y comparar con la misma semilla antes y después.
