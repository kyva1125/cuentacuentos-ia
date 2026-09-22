import { ArrowLeft, ArrowRight, Check, Search } from "lucide-react";
import { useMemo, useState } from "react";

type LibraryStory = { id: string; title: string; subtitle: string; imageUrl?: string | null };
type LibraryCategory = { name: string; description: string; storyIds: string[] };

type StoryFinderProps<T extends LibraryStory> = {
  stories: T[];
  categories: LibraryCategory[];
  onOpenStory: (story: T) => void;
};

const characterName = (title: string) => title.split(" y ")[0];

export function StoryFinder<T extends LibraryStory>({ stories, categories, onOpenStory }: StoryFinderProps<T>) {
  const [step, setStep] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedStory, setSelectedStory] = useState<T | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const visibleStories = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    const category = categories.find((item) => item.name === selectedCategory);
    const inCategory = category ? stories.filter((story) => category.storyIds.includes(story.id)) : [];
    if (!normalized) return inCategory;
    return inCategory.filter((story) => `${characterName(story.title)} ${story.title}`.toLocaleLowerCase("es").includes(normalized));
  }, [categories, query, selectedCategory, stories]);

  const steps = ["Elige un mundo", "Elige un personaje", "Abre su cuento"];

  const selectStory = (story: T) => {
    setSelectedStory(story);
  };

  return (
    <section className="creator-panel" aria-labelledby="finder-title">
      <div className="creator-dashboard mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="panel-heading">
          <div><h2 id="finder-title">Encuentra tu próxima aventura</h2><p>Todos estos personajes ya viven en nuestra biblioteca. Elige uno y abre su cuento.</p></div>
          <span className="step-count">Paso {step} de 3</span>
        </div>

        <ol className="creator-steps" aria-label="Pasos para encontrar un cuento">
          {steps.map((name, index) => { const number = index + 1; const status = number < step ? "complete" : number === step ? "current" : ""; return <li key={name} className={status}><span>{number < step ? <Check size={16} aria-hidden="true" /> : number}</span><b>{name}</b></li>; })}
        </ol>

        <div className="creator-stage">
          {step === 1 && <>
            <div className="creator-stage-heading"><h3>¿Qué aventura quieres visitar?</h3><p>Elige una categoría real de nuestra biblioteca.</p></div>
            <div className="category-picker" aria-label="Elige una categoría"><div>{categories.map((category) => <button key={category.name} type="button" onClick={() => { setSelectedCategory(category.name); setSelectedStory(null); setQuery(""); }} className={selectedCategory === category.name ? "active" : ""}><b>{category.name}</b><small>{category.description}</small></button>)}</div></div>
          </>}

          {step === 2 && <>
            <div className="creator-stage-heading"><h3>¿A quién quieres acompañar?</h3><p>Toca un personaje conocido o búscalo por su nombre.</p></div>
            <label className="character-search"><Search size={19} aria-hidden="true" /><span className="sr-only">Buscar personaje</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar personaje…" /></label>
            {visibleStories.length ? <div className="library-character-grid">
              {visibleStories.map((story) => { const selected = selectedStory?.id === story.id; return <button key={story.id} type="button" aria-pressed={selected} onClick={() => selectStory(story)} className={selected ? "active" : ""}>
                <span className="character-portrait">{story.imageUrl ? <img src={story.imageUrl} alt="" loading="lazy" /> : <span aria-hidden="true">{characterName(story.title).slice(0, 1)}</span>}</span>
                <span><b>{characterName(story.title)}</b><small>{story.title.includes(" y ") ? `De “${story.title}”` : story.subtitle}</small></span>
                {selected && <span className="choice-check"><Check size={15} aria-label="Seleccionado" /></span>}
              </button>; })}
            </div> : <div className="finder-empty"><Search size={25} /><b>No encontramos ese personaje</b><p>Prueba con otro nombre o borra la búsqueda.</p><button type="button" onClick={() => setQuery("")}>Ver todos los personajes</button></div>}
          </>}

          {step === 3 && selectedStory && <>
            <div className="creator-stage-heading"><h3>Encontramos su cuento</h3><p>No se generará nada nuevo: abrirás una historia que ya existe en la biblioteca.</p></div>
            <div className="found-story">
              {selectedStory.imageUrl && <img src={selectedStory.imageUrl} alt="" />}
              <div><span>{selectedCategory}</span><h3>{selectedStory.title}</h3><p>{selectedStory.subtitle}</p></div>
            </div>
          </>}
        </div>

        <div className="creator-footer">
          <p>{step === 1 ? `${categories.length} mundos para explorar.` : step === 2 ? `${visibleStories.length} personajes viven en ${selectedCategory}.` : "La historia está lista para leer."}</p>
          <div className="creator-actions">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="secondary-button"><ArrowLeft size={19} /> Atrás</button>}
            {step < 3 ? <button type="button" onClick={() => setStep(step + 1)} disabled={step === 1 ? !selectedCategory : !selectedStory} className="primary-button">Continuar <ArrowRight size={22} /></button> : <button type="button" onClick={() => selectedStory && onOpenStory(selectedStory)} className="primary-button">Abrir este cuento <ArrowRight size={22} /></button>}
          </div>
        </div>
      </div>
    </section>
  );
}
