# Auditoría final de contenido y arte

Fecha: 17 de septiembre de 2026

## Resultado

**No aprobar aún el catálogo como final.** La aplicación sí contiene bibliotecas exclusivas por personaje, tres cuentos por personaje y recursos visuales dedicados; sin embargo, la fuente todavía genera 20 cuentos mediante `makeTrialStory`. Eso incumple la regla autoral: cada cuento debe tener sus propias ramificaciones escritas, no una plantilla parametrizada.

## Lo que pasó la revisión técnica

- Los cuentos declaran un `ownerId`, por lo que la biblioteca queda separada por protagonista.
- Cada cuento visible tiene cinco capítulos, tres preguntas finales y tres decisiones en los capítulos 1–4.
- Los recursos de portada y decisiones se resuelven desde archivos dedicados y la compilación confirma que están disponibles.
- La prueba de la cuenta familiar comprobó registro, inicio de sesión, guardado, recuperación y conflicto de progreso con PostgreSQL local.

## Bloqueadores de aprobación narrativa

1. Sustituir cada uso de `makeTrialStory` por una definición autoral independiente: conflicto, secundarios, lección, voz, capítulos y las tres continuaciones de cada decisión.
2. Hacer el doble repaso por cuento:
   - Unicidad: ningún texto, elección o pregunta debe poder intercambiarse con otro protagonista.
   - Modelo: cinco capítulos; elecciones 1–4 que cambian el siguiente título, texto e imagen; capítulo 5 sin elección; tres preguntas ligadas a la lección.
3. Reemplazar el verificador `scripts/verify-mvp-library.mjs`: todavía exige el modelo antiguo de seis capítulos, plantillas `{personaje}` y 20 cuentos de prueba. Hoy no demuestra las reglas canónicas del catálogo.
4. Revisar visualmente cada portada y las doce decisiones contra `nia-emotions.png`: píxel grueso, contorno azul marino, paleta plana, sin antialiasing y sin protagonista jugable en las tarjetas de decisión.

## Cuenta de adulto

El acceso familiar está terminado para uso local: crear cuenta, iniciar/cerrar sesión, migrar la partida local, sincronizarla y recuperar conflictos. Quedan como requisitos de producción la verificación de correo y recuperación de contraseña, que requieren configurar un proveedor de entrega de correo aprobado antes de desplegar.

## Cierre de la auditoría

No desplegar ni anunciar el catálogo como terminado hasta que los cuatro bloqueadores narrativos estén cerrados y se repita la prueba infantil con un adulto.
