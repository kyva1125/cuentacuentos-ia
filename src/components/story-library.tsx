import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type Story = {
  id: string
  title: string
  subtitle: string
  imageUrl: string | null
  publishedAt?: string
}

type StoryCategory = {
  name: string
  description: string
  storyIds: string[]
}

type StoryLibraryProps<T extends Story> = {
  categories: StoryCategory[]
  stories: T[]
  onOpenStory: (story: T) => void
}

export function StoryLibrary<T extends Story>({ categories, stories, onOpenStory }: StoryLibraryProps<T>) {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest')
  const [page, setPage] = useState(1)
  const storiesPerPage = 9

  const visibleStories = useMemo(() => {
    const category = categories.find((item) => item.name === selectedCategory)
    const filtered = stories.filter((story) => {
      const belongsToCategory = !category || category.storyIds.includes(story.id)
      return belongsToCategory
    })
    return [...filtered].sort((a, b) => {
      const byDate = Date.parse(b.publishedAt || '1970-01-01') - Date.parse(a.publishedAt || '1970-01-01')
      return sort === 'newest' ? byDate : -byDate
    })
  }, [categories, selectedCategory, sort, stories])

  const totalPages = Math.max(1, Math.ceil(visibleStories.length / storiesPerPage))
  const currentPage = Math.min(page, totalPages)
  const firstStoryIndex = (currentPage - 1) * storiesPerPage
  const pageStories = visibleStories.slice(firstStoryIndex, firstStoryIndex + storiesPerPage)
  const worldsFor = (storyId: string) => categories.filter((category) => category.storyIds.includes(storyId)).map((category) => category.name)

  useEffect(() => setPage(1), [selectedCategory, sort])

  return (
    <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-8" aria-labelledby="library-title">
      <div className="max-w-2xl">
        <h2 id="library-title" className="text-3xl font-black tracking-[-0.03em] sm:text-5xl">Elige un mundo</h2>
        <p className="mt-3 max-w-xl text-[#5b574c]">Cada cuento puede abrir más de una puerta: explora por mundo o déjate llevar por una sorpresa.</p>
      </div>

      <div className="mt-7 grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="self-start rounded-2xl bg-white p-4 shadow-[0_12px_28px_rgba(78,56,22,.1)]" aria-label="Mundos de cuentos">
          <div className="lg:hidden"><details><summary className="cursor-pointer list-none px-2 text-sm font-black text-[#4c3420]"><span className="flex items-center justify-between">Mundos para explorar <span className="text-[#9a5b22]">Ver los {categories.length}</span></span></summary><div className="mt-3 grid gap-1"><button type="button" aria-pressed={selectedCategory === 'Todos'} onClick={() => setSelectedCategory('Todos')} className={`flex items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-bold transition ${selectedCategory === 'Todos' ? 'bg-[#ffcf22] text-[#161512]' : 'text-[#4f5f6e] hover:bg-[#fff1cf]'}`}><span>Todos los cuentos</span><span>{stories.length}</span></button>{categories.map((category) => <button key={category.name} type="button" aria-pressed={selectedCategory === category.name} onClick={() => setSelectedCategory(category.name)} className={`rounded-xl px-3 py-3 text-left transition ${selectedCategory === category.name ? 'bg-[#ffcf22] text-[#161512]' : 'text-[#4f5f6e] hover:bg-[#fff1cf]'}`}><span className="flex items-center justify-between text-sm font-bold"><span>{category.name}</span><span>{category.storyIds.length}</span></span><small className="mt-1 block leading-snug text-xs opacity-75">{category.description}</small></button>)}</div></details></div>
          <div className="hidden lg:block"><p className="px-2 text-sm font-black text-[#4c3420]">Mundos para explorar</p><div className="mt-3 grid gap-1"><button type="button" aria-pressed={selectedCategory === 'Todos'} onClick={() => setSelectedCategory('Todos')} className={`flex items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-bold transition ${selectedCategory === 'Todos' ? 'bg-[#ffcf22] text-[#161512]' : 'text-[#4f5f6e] hover:bg-[#fff1cf]'}`}><span>Todos los cuentos</span><span>{stories.length}</span></button>{categories.map((category) => <button key={category.name} type="button" aria-pressed={selectedCategory === category.name} onClick={() => setSelectedCategory(category.name)} className={`rounded-xl px-3 py-3 text-left transition ${selectedCategory === category.name ? 'bg-[#ffcf22] text-[#161512]' : 'text-[#4f5f6e] hover:bg-[#fff1cf]'}`}><span className="flex items-center justify-between text-sm font-bold"><span>{category.name}</span><span>{category.storyIds.length}</span></span><small className="mt-1 block leading-snug text-xs opacity-75">{category.description}</small></button>)}</div></div>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-bold text-[#5b574c]" aria-live="polite"><BookOpen size={18} aria-hidden="true" /> {visibleStories.length} {visibleStories.length === 1 ? 'cuento disponible' : 'cuentos disponibles'}</p>
            <label className="flex items-center gap-2 text-sm font-bold text-[#5b574c]">Ordenar<select value={sort} onChange={(event) => setSort(event.target.value as 'newest' | 'oldest')} className="rounded-lg border border-[#ded9cc] bg-white px-3 py-2 text-[#161512] outline-none focus:border-[#9a5b22]"><option value="newest">Más nuevos</option><option value="oldest">Más antiguos</option></select></label>
          </div>
          {pageStories.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{pageStories.map((story) => { const worlds = worldsFor(story.id); return <article key={story.id} className="group overflow-hidden rounded-2xl bg-white shadow-[0_14px_32px_rgba(78,56,22,.12)]"><button onClick={() => onOpenStory(story)} className="block w-full text-left">{story.imageUrl ? <img src={story.imageUrl} alt="" loading="lazy" decoding="async" className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="h-44 bg-gradient-to-br from-[#274c77] via-[#5c7fa3] to-[#d9b26f]" aria-hidden="true" />}<span className="block p-5"><span className="inline-flex items-center gap-1 text-xs font-black text-[#9a5b22]"><Sparkles size={14} aria-hidden="true" /> Cuento interactivo</span><span className="mt-3 flex flex-wrap gap-1.5" aria-label={`Mundos: ${worlds.join(', ')}`}>{worlds.map((world) => <span key={world} className="rounded-full bg-[#fff1cf] px-2.5 py-1 text-[11px] font-bold text-[#7b4b11]">{world}</span>)}</span><b className="mt-3 block text-xl leading-tight text-[#161512]">{story.title}</b><span className="mt-2 block min-h-10 text-sm text-[#5b574c]">{story.subtitle}</span><span className="mt-4 flex items-center gap-2 text-sm font-bold text-[#7b4b11]">Abrir cuento <ArrowRight size={16} /></span></span></button></article>})}</div> : <div className="rounded-2xl bg-white p-8 text-center shadow-[0_14px_32px_rgba(78,56,22,.12)]"><BookOpen className="mx-auto text-[#9a5b22]" size={30} aria-hidden="true" /><h3 className="mt-4 text-xl font-black text-[#161512]">Este mundo aún no tiene cuentos</h3><p className="mx-auto mt-2 max-w-md text-sm text-[#5b574c]">Vuelve a todos los mundos para descubrir una nueva aventura.</p><button type="button" onClick={() => setSelectedCategory('Todos')} className="mt-5 rounded-lg bg-[#ffcf22] px-4 py-3 text-sm font-bold text-[#161512] hover:bg-[#ffe06d]">Ver todos los cuentos</button></div>}
          {totalPages > 1 && <nav className="mt-7 flex flex-wrap items-center justify-center gap-3" aria-label="Paginación de cuentos"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={currentPage === 1} className="inline-flex items-center gap-2 rounded-lg border border-[#ded9cc] bg-white px-4 py-3 text-sm font-bold text-[#4c3420] transition hover:bg-[#fff1cf] disabled:cursor-not-allowed disabled:opacity-45"><ChevronLeft size={18} aria-hidden="true" /> Anterior</button><p className="min-w-28 text-center text-sm font-bold text-[#5b574c]" aria-live="polite">Página {currentPage} de {totalPages}</p><button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={currentPage === totalPages} className="inline-flex items-center gap-2 rounded-lg bg-[#ffcf22] px-4 py-3 text-sm font-bold text-[#161512] transition hover:bg-[#ffe06d] disabled:cursor-not-allowed disabled:opacity-45">Siguiente <ChevronRight size={18} aria-hidden="true" /></button></nav>}
        </div>
      </div>
    </section>
  )
}
