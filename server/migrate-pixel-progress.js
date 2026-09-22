import { readFile } from 'node:fs/promises'
import pg from 'pg'

if (!process.env.DATABASE_URL) throw new Error('Falta DATABASE_URL en server/.env')
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
try {
  const sql = await readFile(new URL('./migrations/003-pixel-progress.sql', import.meta.url), 'utf8')
  await pool.query(sql)
  console.log('Migración de progreso familiar aplicada.')
} finally {
  await pool.end()
}
