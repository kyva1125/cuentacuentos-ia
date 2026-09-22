// Almacenamiento de imágenes en el FTP (hosting compartido). Sube una vez y
// devuelve una URL HTTP estable, para que releer o ramificar un cuento no
// vuelva a pagar la generación.
//
// Variables de entorno (server/.env):
//   FTP_HOST, FTP_USER, FTP_PASSWORD
//   FTP_SECURE        "true" para FTPS explícito (recomendado)
//   FTP_DIR           carpeta base relativa al login FTP (def. "public_html/media")
//   MEDIA_PUBLIC_URL  URL HTTP que sirve esa carpeta (ej. http://nick1.ximery.com/media)
//
// Si el FTP no está configurado o falla, storeImage devuelve null y el llamador
// usa la URL efímera del proveedor.

import { Readable } from "node:stream";
import { Client } from "basic-ftp";

const cfg = {
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  secure: /^true$/i.test(process.env.FTP_SECURE || ""),
  dir: (process.env.FTP_DIR || "public_html/media").replace(/^\/+|\/+$/g, ""),
  publicUrl: (process.env.MEDIA_PUBLIC_URL || "").replace(/\/+$/, ""),
};

export const mediaStorageEnabled = Boolean(
  cfg.host && cfg.user && cfg.password && cfg.publicUrl,
);

/**
 * @param {Buffer} buffer  bytes de la imagen
 * @param {string} relKey  ruta relativa, p.ej. "cuentos/<storyId>/2.jpg"
 * @returns {Promise<string|null>} URL pública o null si no se pudo
 */
export async function storeImage(buffer, relKey) {
  if (!mediaStorageEnabled || !buffer?.length) return null;
  const key = relKey.replace(/^\/+/, "").replace(/\.\.+/g, "");
  const remoteDir = `/${cfg.dir}/${key.split("/").slice(0, -1).join("/")}`.replace(
    /\/+/g,
    "/",
  );
  const fileName = key.split("/").pop();
  const client = new Client(30000);
  client.ftp.verbose = false;
  try {
    await client.access({
      host: cfg.host,
      user: cfg.user,
      password: cfg.password,
      secure: cfg.secure,
      secureOptions: { rejectUnauthorized: false },
    });
    await client.ensureDir(remoteDir);
    await client.uploadFrom(Readable.from(buffer), fileName);
    return `${cfg.publicUrl}/${key}`;
  } catch (error) {
    console.error("storeImage FTP:", error.message);
    return null;
  } finally {
    client.close();
  }
}
