import { Award, BookMarked, BookOpen, Compass, Footprints, Gem, Heart, Library, Medal, Sparkles, Star, Trophy } from 'lucide-react'

type AchievementMetrics = {
  points: number
  completed: number
  saved: number
  unlocked: number
  coins: number
}


type Achievement = {
  id: string
  title: string
  desc: string
  Icon: typeof Star
  gradient: string
  check: (m: AchievementMetrics) => boolean
  progress?: (m: AchievementMetrics) => string
}

const achievements: Achievement[] = [
  { id: 'first-decision', title: 'Primer Paso', desc: 'Tomaste tu primera decisión de aventura.', Icon: Footprints, gradient: 'from-emerald-300 to-teal-400', check: (m) => m.points >= 1 },
  { id: 'ten-decisions', title: 'Aventurero en Camino', desc: 'Sumaste 10 decisiones valientes.', Icon: Compass, gradient: 'from-sky-300 to-blue-400', check: (m) => m.points >= 10, progress: (m) => `${Math.min(m.points, 10)}/10` },
  { id: 'thirty-decisions', title: 'Explorador Curioso', desc: 'Sumaste 30 decisiones en tus aventuras.', Icon: Sparkles, gradient: 'from-indigo-300 to-violet-400', check: (m) => m.points >= 30, progress: (m) => `${Math.min(m.points, 30)}/30` },
  { id: 'storyteller', title: 'Cuentacuentos', desc: 'Sumaste 60 decisiones. ¡Qué buen camino!', Icon: Star, gradient: 'from-amber-300 to-orange-400', check: (m) => m.points >= 60, progress: (m) => `${Math.min(m.points, 60)}/60` },
  { id: 'legend-heart', title: 'Corazón de Leyenda', desc: 'Llegaste a 100 decisiones de aventura.', Icon: Trophy, gradient: 'from-rose-300 to-pink-400', check: (m) => m.points >= 100, progress: (m) => `${Math.min(m.points, 100)}/100` },
  { id: 'first-story', title: 'Primera Aventura', desc: 'Completaste tu primer cuento.', Icon: BookOpen, gradient: 'from-emerald-300 to-teal-400', check: (m) => m.completed >= 1, progress: (m) => `${Math.min(m.completed, 1)}/1` },
  { id: 'five-stories', title: 'Gran Lector', desc: 'Completaste 5 cuentos completos.', Icon: Library, gradient: 'from-sky-300 to-blue-400', check: (m) => m.completed >= 5, progress: (m) => `${Math.min(m.completed, 5)}/5` },
  { id: 'ten-stories', title: 'Bibliotecario', desc: 'Completaste 10 cuentos de la biblioteca.', Icon: BookMarked, gradient: 'from-indigo-300 to-violet-400', check: (m) => m.completed >= 10, progress: (m) => `${Math.min(m.completed, 10)}/10` },
  { id: 'collector', title: 'Coleccionista', desc: 'Guardaste 3 aventuras para recordar.', Icon: Gem, gradient: 'from-amber-300 to-orange-400', check: (m) => m.saved >= 3, progress: (m) => `${Math.min(m.saved, 3)}/3` },
  { id: 'path-opener', title: 'Abre Caminos', desc: 'Desbloqueaste 5 cuentos de la biblioteca.', Icon: Medal, gradient: 'from-rose-300 to-pink-400', check: (m) => m.unlocked >= 5, progress: (m) => `${Math.min(m.unlocked, 5)}/5` },
  { id: 'helper', title: 'Gran Amigo', desc: 'Entrenaste cualidades con el corazón.', Icon: Heart, gradient: 'from-pink-300 to-red-400', check: () => true, progress: () => '¡Siempre!' },
]

export function Achievements({ metrics }: { metrics: AchievementMetrics }) {
  const earned = achievements.filter((a) => a.check(metrics))

  return (
    <section className="achievements mt-10" aria-labelledby="achievements-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="achievements-title" className="text-2xl font-black tracking-[-0.02em] text-[#161512]">Tus logros de aventura</h2>
          <p className="mt-1 text-[#5b574c]">Cada decisión y cada cuento te acercan a la próxima evolución.</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#2c2a26] shadow-sm ring-1 ring-black/5">{earned.length}/{achievements.length} logros</span>
      </div>

      <section className="mt-5" aria-label="Todos los logros">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => {
            const isEarned = a.check(metrics)
            return (
              <div key={a.id} className={`flex items-start gap-3 rounded-2xl p-4 transition ${isEarned ? 'bg-white shadow-[0_8px_20px_rgba(78,56,22,.08)]' : 'bg-white/50 shadow-inner ring-1 ring-[#ece6d8]'}`}>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${a.gradient} text-white ${isEarned ? '' : 'opacity-30 grayscale'}`}>
                  {isEarned ? <a.Icon size={24} aria-hidden="true" /> : <Award size={24} aria-hidden="true" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <b className={`text-sm leading-tight ${isEarned ? 'text-[#161512]' : 'text-[#8a8577]'}`}>{a.title}</b>
                    {isEarned && <Sparkles size={13} className="shrink-0 text-[#f5a623]" aria-label="Conseguido" />}
                  </div>
                  <p className="mt-0.5 text-xs leading-snug text-[#6d675a]">{a.desc}</p>
                  {a.progress && <small className="mt-1 block text-[11px] font-semibold text-[#c98a0b]">{isEarned ? 'Completado' : `Progreso ${a.progress(metrics)}`}</small>}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </section>
  )
}
