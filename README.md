# Aventuras Píxel

Una aventura de lectura en español: seis personajes, tres cuentos por personaje, decisiones ilustradas y progreso con monedas. La partida se guarda en el navegador desde el primer momento. Un adulto puede crear una cuenta para recuperarla en otro dispositivo.

## Desarrollo local

1. Instala dependencias con `npm install` y `cd server && npm install`.
2. Configura `server/.env` para PostgreSQL local y `JWT_SECRET`; configura `VITE_API_URL` en `.env.local` para apuntar a la API local.
3. Desde `server/`, ejecuta `npm run migrate:pixel-progress` y `npm run dev`.
4. Desde la raíz, ejecuta `npm run dev -- --host 127.0.0.1 --port 5175`.

La cuenta usa los endpoints existentes de registro e inicio de sesión. La migración `server/migrations/003-pixel-progress.sql` añade el guardado de Aventuras Píxel a `child_profiles`.

## Verificación

- `npm test`: compila la app y comprueba las reglas del cuento y sus recursos.
- `cd server && npm run test:pixel-progress`: prueba registro, guardado, recuperación y control de conflictos contra la API y PostgreSQL locales. Requiere la API en marcha y borra únicamente la cuenta temporal creada por la prueba.

No hay despliegue automático. La API de producción y la migración requieren el flujo de despliegue aprobado por Nick.
