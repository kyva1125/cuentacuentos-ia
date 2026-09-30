# Maticuentos

Una aventura de lectura en español: seis personajes, tres fábulas por personaje, decisiones ilustradas y progreso con monedas. Cada elección cambia la continuación; la última lleva a uno de tres desenlaces con su propia enseñanza. La partida se guarda en el navegador desde el primer momento. Un adulto puede crear una cuenta para recuperarla en otro dispositivo.

## Desarrollo local

1. Instala dependencias con `npm install` y `cd server && npm install`.
2. Configura `server/.env` para PostgreSQL local, `JWT_SECRET` y `PORT=3300`. La web usa el proxy `/api` de Vite; si cambias el puerto de la API, define `DEV_API_URL` en `.env.development.local`.
3. Desde `server/`, ejecuta `npm run migrate:pixel-progress` y `npm run dev`.
4. Desde la raíz, ejecuta `npm run dev -- --host 127.0.0.1 --port 5175`.

La portada está en `http://127.0.0.1:5175/` y el juego de cuentos en `http://127.0.0.1:5175/stories/`.

La cuenta usa los endpoints existentes de registro e inicio de sesión. La migración `server/migrations/003-pixel-progress.sql` añade el guardado de Maticuentos a `child_profiles`.

## Verificación

- `npm test`: compila la app y comprueba las reglas del cuento y sus recursos.
- `cd server && npm run test:pixel-progress`: prueba registro, guardado, recuperación y control de conflictos contra la API y PostgreSQL locales. Requiere la API en marcha y borra únicamente la cuenta temporal creada por la prueba.
- `qa:e2e` indica cómo ejecutar `tests/qa-journey.mjs` mediante Playwright MCP con extensión en Chrome estable. La prueba usa `/stories/` y el catálogo actual.

## Preparación de producción

`npm run build` usa `.env.production`: la API pública configurada es `https://maticuentos-api.benielstudio.app`. El build rechaza URLs locales o sin HTTPS. El paquete incluye el arte de fábula vigente; los recursos antiguos quedan fuera.

No se envían correos ni se usa SMTP. El correo del adulto funciona como identificador de su cuenta.

No hay despliegue automático. La API de producción y la migración requieren el flujo de despliegue aprobado por Nick.
