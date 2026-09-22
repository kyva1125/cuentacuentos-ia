import { Check, Coins, LockKeyhole, Sparkles } from 'lucide-react'
import { useState } from 'react'

type Parent = { name: string; email: string; credits: number }
type Props = { apiUrl: string; parent: Parent | null; childName?: string | null; onAuthenticated: (token: string, parent: Parent, child?: { nickname?: string } | null) => void; onSignOut: () => void }

const coinPlans = [
  { id: 'inicio', name: 'Inicio', coins: 100, price: 'S/ 1.99', detail: 'Para abrir nuevas aventuras cuando quieras.', accent: 'Un pequeño impulso', featured: false },
  { id: 'aventura', name: 'Aventura', coins: 300, price: 'S/ 4.99', detail: 'Más historias para seguir explorando juntos.', accent: 'El favorito de las familias', featured: true },
  { id: 'biblioteca', name: 'Biblioteca', coins: 700, price: 'S/ 9.99', detail: 'Un buen fondo para una larga temporada de cuentos.', accent: 'Para lectores incansables', featured: false },
] as const

export function AccountPanel({ apiUrl, parent, childName, onAuthenticated, onSignOut }: Props) {
  const [login, setLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '', childName: '', childAge: '8', childAvatar: 'explorador' })
  const [error, setError] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [purchasing, setPurchasing] = useState(false)
  const set = (key: keyof typeof form, value: string) => setForm({ ...form, [key]: value })

  const submit = async () => {
    try {
      setError('')
      const body = login ? { email: form.email, password: form.password } : form
      const response = await fetch(`${apiUrl}/api/auth/${login ? 'login' : 'register'}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      onAuthenticated(data.token, data.parent, data.child)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'No pudimos continuar.')
    }
  }

  const startCheckout = async () => {
    if (!selectedPlan) return
    try {
      setPurchasing(true); setError('')
      const token = window.localStorage.getItem('cuentos-auth')
      const response = await fetch(`${apiUrl}/api/payments/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${JSON.parse(token).token}` } : {}) }, body: JSON.stringify({ planId: selectedPlan }) })
      const data = await response.json()
      if (!response.ok || !data.checkoutUrl) throw new Error(data.error || 'No pudimos abrir el pago.')
      window.location.assign(data.checkoutUrl)
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'No pudimos abrir el pago.') } finally { setPurchasing(false) }
  }

  if (parent) {
    const plan = coinPlans.find(({ id }) => id === selectedPlan)
    return <section className="parent-gate mx-auto max-w-5xl px-5 pb-16 pt-10 sm:px-8">
      <div className="parent-heading">
        <div><LockKeyhole size={28} /><h1>Zona para adultos</h1><p>Administra la cuenta de tu familia y prepara monedas para las próximas aventuras.</p>{childName && <p>Perfil infantil activo: <b>{childName}</b></p>}</div>
        <div className="family-summary"><Coins size={27} /><div><span>Saldo disponible</span><b>{parent.credits} monedas</b></div></div>
      </div>
      <section className="parent-section" aria-labelledby="coin-plans-title">
        <h2 id="coin-plans-title">Elige monedas para seguir creando</h2>
        <p>Cada paquete se suma al saldo de {parent.name}. Elige el tamaño que mejor acompañe sus historias.</p>
        <div className="package-grid">
          {coinPlans.map((item) => <article key={item.id} className={item.featured ? 'coin-plan is-featured' : 'coin-plan'}>
            {item.featured && <span className="plan-ribbon">Más elegido</span>}
            <span>{item.accent}</span><b>{item.name}</b>
            <strong><Coins size={20} aria-hidden="true" /> {item.coins} monedas</strong><span className="plan-price">{item.price} soles</span>
            <p>{item.detail}</p>
            <ul><li><Check size={16} aria-hidden="true" /> Créditos para nuevos cuentos</li><li><Check size={16} aria-hidden="true" /> Se acumulan en tu cuenta</li></ul>
            <button type="button" onClick={() => setSelectedPlan(item.id)} aria-pressed={selectedPlan === item.id}>{selectedPlan === item.id ? 'Plan seleccionado' : `Elegir ${item.name}`}</button>
          </article>)}
        </div>
        {plan && <div className="plan-selection"><p><Sparkles size={19} aria-hidden="true" /> El plan {plan.name} añadirá <b>{plan.coins} créditos</b> después de confirmar el pago con Mercado Pago.</p><button type="button" className="parent-action" onClick={startCheckout} disabled={purchasing}>{purchasing ? 'Abriendo Mercado Pago…' : 'Pagar con Mercado Pago'}</button></div>}
      </section>
      {error && <p className="parent-error">{error}</p>}
      <p className="parent-promise"><Check size={20} aria-hidden="true" /> Las monedas solo sirven para crear nuevas aventuras; la lectura de cuentos guardados siempre queda disponible.</p>
      <button className="quiet-button parent-signout" onClick={onSignOut}>Cerrar sesión</button>
    </section>
  }

  return <section className="parent-gate mx-auto max-w-xl px-5 pb-16 pt-10 sm:px-8"><LockKeyhole size={28} /><h1>Zona para adultos</h1><p>{login ? '¿Ya tienes cuenta? Ingresa para recuperar el perfil, cuentos y progreso de tu familia.' : 'Crea una cuenta nueva y prepara el primer perfil infantil de tu familia.'}</p><div className="auth-switch" role="tablist" aria-label="Acceso a la cuenta"><button type="button" role="tab" aria-selected={login} onClick={() => { setLogin(true); setError('') }} className={login ? 'active' : ''}>Ya tengo cuenta</button><button type="button" role="tab" aria-selected={!login} onClick={() => { setLogin(false); setError('') }} className={!login ? 'active' : ''}>Crear cuenta nueva</button></div>{!login && <><label><span>Tu nombre</span><input value={form.name} onChange={(event) => set('name', event.target.value)} autoComplete="name" /></label><label><span>Nombre del avatar del pequeño</span><input value={form.childName} onChange={(event) => set('childName', event.target.value)} /></label><label><span>Edad</span><select value={form.childAge} onChange={(event) => set('childAge', event.target.value)}>{Array.from({ length: 10 }, (_, index) => index + 3).map((age) => <option key={age} value={age}>{age} años</option>)}</select></label></>}<label><span>Correo</span><input type="email" value={form.email} onChange={(event) => set('email', event.target.value)} autoComplete="email" /></label><label><span>Contraseña</span><input type="password" value={form.password} onChange={(event) => set('password', event.target.value)} autoComplete={login ? 'current-password' : 'new-password'} /></label>{error && <p className="parent-error">{error}</p>}<button className="parent-action" onClick={submit}>{login ? 'Entrar y recuperar mi progreso' : 'Crear familia y perfil infantil'}</button><p className="mt-5 text-center text-sm text-[#5b574c]">{login ? '¿Aún no tienes una cuenta? ' : '¿Ya tienes una cuenta? '}<button type="button" className="font-bold text-[#9a5b22] underline underline-offset-4" onClick={() => { setLogin(!login); setError('') }}>{login ? 'Crear cuenta nueva' : 'Iniciar sesión'}</button></p></section>
}
