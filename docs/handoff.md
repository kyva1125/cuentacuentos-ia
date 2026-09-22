# Handoff — Cuentos imaginados

Actualizado: 2026-09-05

## Entorno de pruebas

- Servidor: SUSANA (`192.168.0.250`)
- Proyecto: `~/projects-mvp/cuentos/`
- Web: `http://192.168.0.250:5175`
- API: `http://192.168.0.250:3100`
- PostgreSQL Docker: puerto `55432`

La web se sirve con el build de Vite y `npm run preview`. La API se ejecuta con `node server/index.js`. Ambos procesos se lanzaron con `nohup`; los logs están en `/tmp/cuentos-web.log` y `/tmp/cuentos-api.log`.

## Flujo de trabajo

1. Verificar que SUSANA responda con `ping 192.168.0.250`.
2. Sincronizar desde la copia local mediante `rsync` por WSL, excluyendo `node_modules`, `dist`, `.git` y builds.
3. Ejecutar dependencias, build y verificaciones exclusivamente en SUSANA.
4. Para actualizar la web de pruebas, construir con:

   ```bash
   VITE_API_URL=http://192.168.0.250:3100 VITE_LOCAL_UNLIMITED_COINS=true npm run build
   ```

5. Reiniciar el proceso de preview en el puerto `5175`.

No modificar MONICA (`beniel-server-hetzner`) sin autorización explícita.

## Implementado

- Modo de pruebas con monedas ilimitadas usando `VITE_LOCAL_UNLIMITED_COINS=true`.
- Compatibilidad para navegadores sin `crypto.randomUUID()` al acceder por HTTP/IP local.
- El botón de volver al inicio funciona directamente al terminar un cuento.
- Cada página muestra un máximo de tres decisiones.
- Las decisiones aumentan Valentía, Ingenio o Amistad y muestran una reacción inmediata.
- Los prompts de la API piden tres decisiones concretas y que la escena siguiente refleje la elección previa; el prompt de imagen incluye la elección anterior.
- Categorías de creación: Héroes y superpoderes, Misterios y secretos, Exploración extrema, Ciencia y mundos futuros.
- Campo de personaje personalizado, incluido el ejemplo “Spiderman”.
- Perfil infantil accesible desde la navegación: nivel general, barras de progreso por cualidad, cuentos terminados y lista de cuentos guardados.
- La navegación dejó de mostrar “Mis cuentos”; los cuentos están centralizados en “Mi perfil”.
- Pie actualizado a: “Cada decisión abre una aventura nueva.”
- La Biblioteca contiene 62 cuentos. Toda página de lectura del catálogo se normaliza a entre 60 y 90 palabras, incluso cuando cambia por una decisión.
- Las ilustraciones de portada y capítulos de la Biblioteca se generan exclusivamente con **GPT Image**; conservar la ficha visual del protagonista y revisar cada resultado antes de integrarlo.

## Persistencia actual

El perfil infantil, sus cualidades, niveles y cuentos guardados se almacenan en `localStorage` del navegador de pruebas:

- `cuentos-profile-traits`
- `cuentos-completed-stories`
- `cuentos-saved-stories`

La base de datos ya contiene las tablas `parents`, `child_profiles`, `stories` y `credit_ledger`, pero las cualidades del perfil todavía no están conectadas al perfil infantil ni se sincronizan entre dispositivos.

## Próximos pasos recomendados

1. Persistir cualidades, nivel, cuentos terminados e inventario en `child_profiles`/tablas relacionadas; asociarlos a la cuenta autenticada.
2. Añadir un mapa de capítulos en lugar de los checks de progreso.
3. Incorporar inventario y finales alternativos basados en decisiones.
4. Generar cualquier ilustración nueva con GPT Image y validar continuidad visual entre portada, capítulos y final.
5. Ejecutar una prueba completa con un niño: creación, cinco decisiones, final, perfil y reanudación de cuento.
