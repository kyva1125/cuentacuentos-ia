import { Heart, Lightbulb, Shield, Sparkles } from 'lucide-react'
import heroLevels from '../assets/hero-levels-v2.png'

type Traits = { bravery: number; ingenuity: number; friendship: number }
type Props = { traits: Traits }

const qualities = [
  { key: 'bravery' as const, label: 'Valentía', Icon: Shield, note: 'Te atreves a avanzar.' },
  { key: 'ingenuity' as const, label: 'Sabiduría', Icon: Lightbulb, note: 'Encuentras caminos inteligentes.' },
  { key: 'friendship' as const, label: 'Amistad', Icon: Heart, note: 'Haces equipo y ayudas.' },
]

export function ChildProfile({ traits }: Props) {
  const total = Object.values(traits).reduce((sum, value) => sum + value, 0)
  const level = Math.min(20, Math.floor(total / 5) + 1)
  const levelProgress = total % 5
  const spriteIndex = level - 1
  const spriteStyle = { backgroundImage: `url(${heroLevels})`, backgroundPosition: `${(spriteIndex % 5) * 25}% ${Math.floor(spriteIndex / 5) * (100 / 3)}%`, backgroundSize: '500% 400%' }
  return <section className="profile-page mx-auto max-w-4xl px-5 pb-8 pt-6 sm:px-8"><div className="profile-hero"><div className="h-24 w-24 shrink-0 bg-no-repeat" style={spriteStyle} role="img" aria-label={`Personaje del nivel ${level}`} /><div><span className="block text-sm text-[#d6e5f3]">Nivel de personaje</span><h1>Nivel {level} de 20</h1></div></div><section className="adventure-level" aria-label={`Nivel ${level} de personaje`}><div><span>Progreso</span><b>{level === 20 ? 'Nivel máximo' : `${levelProgress}/5 decisiones`}</b></div><div className="level-track"><span style={{ width: `${level === 20 ? 100 : levelProgress * 20}%` }} /></div></section><section className="talent-section" aria-labelledby="talents-title"><div><h2 id="talents-title">Tus habilidades</h2><p>Elige caminos valientes, ingeniosos o amables para verlas crecer.</p></div><div className="profile-qualities">{qualities.map(({ key, label, Icon, note }) => { const value = traits[key]; const progress = value % 5; return <article key={key} className="talent-card"><div className="talent-icon"><Icon size={34} aria-hidden="true" /></div><div className="talent-content"><div className="quality-heading"><b>{label}</b><strong>{value} {value === 1 ? 'punto' : 'puntos'}</strong></div><p>{note}</p><div className="quality-track" role="progressbar" aria-label={`Progreso de ${label}`} aria-valuemin={0} aria-valuemax={5} aria-valuenow={progress}><span style={{ width: `${progress * 20}%` }} /></div><small>{progress}/5 para la siguiente marca</small></div></article> })}</div></section></section>
}
