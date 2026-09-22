import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import pg from 'pg'

const database = new URL(process.env.DATABASE_URL || '')
assert.ok(['127.0.0.1', 'localhost'].includes(database.hostname), 'Esta prueba solo puede usar PostgreSQL local.')
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const api = `http://127.0.0.1:${process.env.PORT || 3100}`
const email = `pixel-progress-${randomUUID()}@example.invalid`
const password = `Test-${randomUUID()}`

async function request(path, method, token, body) {
  const response = await fetch(`${api}${path}`, {
    method,
    headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  return { status: response.status, body: await response.json() }
}

try {
  const registered = await request('/api/auth/register', 'POST', null, { name: 'Adulto de prueba', email, password, childName: 'Lector de prueba', childAge: 8 })
  assert.equal(registered.status, 201)
  const token = registered.body.token
  const initial = await request('/api/pixel-progress', 'GET', token)
  assert.equal(initial.status, 200)
  assert.equal(initial.body.progress, null)
  assert.equal(initial.body.revision, 0)

  const progress = { coins: 4, lifetimeCoins: 4, unlockedCharacters: ['nia', 'teo'], unlockedStories: [], characters: { nia: { decisions: { 'rio-cantor:entrada': 'a' }, completedStories: [], skills: { a: 0, b: 0, c: 0 } } } }
  const saved = await request('/api/pixel-progress', 'PUT', token, { progress, revision: 0 })
  assert.equal(saved.status, 200)
  assert.equal(saved.body.revision, 1)
  const restored = await request('/api/pixel-progress', 'GET', token)
  assert.deepEqual(restored.body.progress, progress)
  assert.equal(restored.body.revision, 1)

  const stale = await request('/api/pixel-progress', 'PUT', token, { progress: { ...progress, coins: 0 }, revision: 0 })
  assert.equal(stale.status, 409)
  const stillSaved = await request('/api/pixel-progress', 'GET', token)
  assert.equal(stillSaved.body.progress.coins, 4)

  const loggedIn = await request('/api/auth/login', 'POST', null, { email, password })
  assert.equal(loggedIn.status, 200)
  assert.equal((await request('/api/pixel-progress', 'GET', loggedIn.body.token)).body.progress.coins, 4)
  console.log('Registro, guardado, recuperación y protección ante conflictos: OK')
} finally {
  await pool.query('DELETE FROM parents WHERE email = $1', [email])
  await pool.end()
}
