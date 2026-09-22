export type ParentSession = { token: string; parent: { id: string; name: string; email: string }; childName: string }
export type CloudProgress<T> = { progress: T | null; revision: number }

export const PARENT_SESSION_KEY = 'aventuras-pixel-parent-v1'
export const PROGRESS_OWNER_KEY = 'aventuras-pixel-progress-owner-v1'
export const PROGRESS_SYNC_KEY = 'aventuras-pixel-progress-sync-v1'
const API_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:3100').replace(/\/$/, '')

export function storedParentSession(): ParentSession | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(PARENT_SESSION_KEY) || 'null') as ParentSession | null
    return parsed?.token && parsed.parent?.id ? parsed : null
  } catch { return null }
}

async function apiRequest<T>(path: string, token: string | null, method = 'GET', body?: unknown): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  } catch { throw new Error('No hay conexión con el guardado familiar. Tu avance sigue en este dispositivo.') }
  const data = await response.json().catch(() => ({})) as T & { error?: string }
  if (!response.ok) throw new Error(data.error || 'No pudimos conectar con la cuenta familiar.')
  return data
}

export async function authenticateParent(mode: 'register' | 'login', form: { name: string; email: string; password: string; childName: string; childAge: string }) {
  const data = await apiRequest<{ token: string; parent: ParentSession['parent']; child: { nickname: string } | null }>(
    `/api/auth/${mode}`, null, 'POST', mode === 'register'
      ? { name: form.name, email: form.email, password: form.password, childName: form.childName, childAge: Number(form.childAge) }
      : { email: form.email, password: form.password },
  )
  return { token: data.token, parent: data.parent, childName: data.child?.nickname || form.childName || 'Pequeño lector' } satisfies ParentSession
}

export function readCloudProgress<T>(token: string): Promise<CloudProgress<T>> {
  return apiRequest<CloudProgress<T>>('/api/pixel-progress', token)
}

export function writeCloudProgress<T>(token: string, progress: T, revision: number): Promise<{ revision: number }> {
  return apiRequest<{ revision: number }>('/api/pixel-progress', token, 'PUT', { progress, revision })
}
