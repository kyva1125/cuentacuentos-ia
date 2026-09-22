# Handoff — Aventuras Píxel

## Estado vigente — 21 Sep 2026

- Aplicación React/Vite con 17 cuentos autorales, cinco capítulos por cuento y bibliotecas exclusivas por personaje.
- Progreso familiar con cuenta adulta y sincronización: frontend y API publicados; no desplegar cambios a MONICA sin solicitud explícita.
- Reglas vigentes: UI y contenido en español; recursos visuales nuevos con GPT y sin sobrescribir recursos existentes; cuentos sin factory genérico y con ramificaciones autorales.
- Próximo paso: validación visual en Chrome estable (pendiente en esta sesión por no tener conector de Chrome).

## Comandos y puertos

- Frontend local: `http://127.0.0.1:5173/`.
- API local: `http://127.0.0.1:3300/`; salud: `GET /health`.
- Verificación: `npm test` y `npm --prefix server run test:pixel-progress` (API local levantada).
- Logs: `.runtime/frontend-current.log`, `.runtime/frontend-current.err.log`, `.runtime/backend-current.log`, `.runtime/backend-current.err.log`.

## Historial

- [Historial de septiembre de 2026](docs/handoffs/2026-09.md): estado y sesiones cerradas movidos literalmente.
- [Historial previo al 14 Sep](docs/handoffs/2026-09-14-pre-aventuras-pixel.md).

## Arranque local — 21 Sep 2026

- Revisión inicial completada: `npm test` pasó (TypeScript, build Vite y verificador de 17 cuentos autorales).
- Servicios locales iniciados en segundo plano: frontend `http://127.0.0.1:5173/` y API `http://127.0.0.1:3300/`; `/health` responde `{"ok":true}` y el frontend responde HTTP 200.
- Logs actuales en `.runtime/frontend-current.log`, `.runtime/frontend-current.err.log`, `.runtime/backend-current.log` y `.runtime/backend-current.err.log`.
- No se modificó ni desplegó producción. La validación visual en Chrome estable quedó pendiente porque el conector disponible en esta sesión solo expuso Brave y las reglas del proyecto prohíben usarlo como criterio de prueba.

## Ajuste de portada inicial — 21 Sep 2026

- Corregido el encuadre de la ilustración del bloque inicial: se eliminó el límite de altura que dejaba media columna vacía y la imagen ahora ocupa toda la altura disponible con recorte centrado.
- El recurso visual original no fue modificado ni reemplazado. `npm test` pasó y el detector de layout Impeccable devolvió `[]`.

## Ajuste de próximo hito — 21 Sep 2026

- Recompuesta la sección `Tu próximo hito`: el contexto permanece junto al título y la tarjeta de meta ocupa una columna completa a su lado; en móvil se apila. Se eliminó el espacio vacío que separaba artificialmente sus elementos.
- `npm test` pasó y el detector de layout Impeccable devolvió `[]`. No se desplegó producción.

## Lectura tras elegir — 21 Sep 2026

- Al confirmar una elección y avanzar al capítulo siguiente, `continueFromDecision` ahora restablece el scroll al inicio de la página. Así se muestra inmediatamente la nueva escena, título y texto en vez de dejar al niño junto a las decisiones anteriores.
- `npm test` pasó. No se desplegó producción.

## Retorno desde partida protegida — 21 Sep 2026

- Se centralizó el retorno desde la pantalla de cuenta adulta: vuelve de forma segura a la pantalla desde la que se abrió (y al inicio de la vista), incluso si el estado de retorno fuera inválido.
- La cuenta conectada ahora ofrece además un botón primario visible `Volver a la aventura`, sin depender solo del enlace pequeño superior. La sesión y el progreso no se modifican.
- `npm test` pasó y el detector Impeccable devolvió `[]`. No se desplegó producción.

## Descubrimiento de perfiles — 21 Sep 2026

- La entrada de personajes ahora explica el recorrido `elige personaje → abre su perfil → elige cuento`; las tarjetas cambiaron su acción visible a `Abrir perfil` y tienen nombres accesibles inequívocos.
- Al abrir el perfil desde una tarjeta o desde la navegación, la vista vuelve al inicio para mostrar de inmediato el retrato, habilidades y acceso a cuentos del personaje.
- `npm test` pasó y el detector Impeccable devolvió `[]`. No se desplegó producción.
