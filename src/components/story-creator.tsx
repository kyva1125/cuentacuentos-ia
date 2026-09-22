import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react'
import { useState } from 'react'

type CharacterChoice = {
  label: string
  detail: string
  tone: string
}

type StoryCategory = {
  name: string
  description: string
}

type StoryCreatorProps = {
  choices: CharacterChoice[]
  categories: StoryCategory[]
  selectedCharacter: CharacterChoice | null
  customCharacter: string
  selectedCategory: string
  canCreate: boolean
  heroChosen: boolean
  freeCreationsRemaining: number
  storyCost: number
  creating: boolean
  error: string
  onSelectCharacter: (choice: CharacterChoice | null) => void
  onCustomCharacterChange: (value: string) => void
  onSelectCategory: (category: string) => void
  onCreate: () => void
}

export function StoryCreator({ choices, categories, selectedCharacter, customCharacter, selectedCategory, canCreate, heroChosen, freeCreationsRemaining, storyCost, creating, error, onSelectCharacter, onCustomCharacterChange, onSelectCategory, onCreate }: StoryCreatorProps) {
  const [step, setStep] = useState(1)
  const usingCustom = customCharacter.trim().length > 0
  const steps = ['Elige un héroe', 'Elige un mundo', 'Crea tu cuento']
  const label = creating
    ? 'Creando tu cuento…'
    : !heroChosen
      ? 'Elige un héroe primero'
      : freeCreationsRemaining > 0
        ? 'Crear mi cuento gratis'
        : canCreate
          ? `Crear mi cuento · ${storyCost} créditos`
          : 'Pedir ayuda a un adulto'

  return (
    <section className="creator-panel" aria-labelledby="creator-title">
      <div className="creator-dashboard mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="panel-heading">
          <div>
            <h2 id="creator-title">Crea tu propia aventura</h2>
            <p>Vamos paso a paso. Al final tendrás una historia hecha para ti.</p>
          </div>
          <span className="step-count">Paso {step} de 3</span>
        </div>

        <ol className="creator-steps" aria-label="Pasos para crear tu aventura">
          {steps.map((name, index) => {
            const number = index + 1
            const status = number < step ? 'complete' : number === step ? 'current' : ''
            return <li key={name} className={status}><span>{number < step ? <Check size={16} aria-hidden="true" /> : number}</span><b>{name}</b></li>
          })}
        </ol>

        <div className="creator-stage">
          {step === 1 && <>
            <div className="creator-stage-heading"><h3>¿Quién será el héroe?</h3><p>Escoge un personaje o inventa el tuyo.</p></div>
            <div className="choice-row">
              {choices.map((choice) => <button key={choice.label} type="button" onClick={() => { onCustomCharacterChange(''); onSelectCharacter(choice) }} className={`character-choice ${!usingCustom && selectedCharacter?.label === choice.label ? 'active' : ''}`}><span className={`character-orb ${choice.tone}`} /><span><b>{choice.label}</b><small>{choice.detail}</small></span><span className="choice-check">{!usingCustom && selectedCharacter?.label === choice.label ? <Check size={15} aria-label="Seleccionado" /> : null}</span></button>)}
            </div>
            <label className="custom-character"><span>O escribe tu propio personaje</span><input value={customCharacter} onChange={(event) => { const value = event.target.value; onCustomCharacterChange(value); if (value.trim()) onSelectCharacter(null) }} maxLength={60} placeholder="Por ejemplo: un dragón que colecciona hojas" /></label>
          </>}

          {step === 2 && <>
            <div className="creator-stage-heading"><h3>¿Qué aventura quieres?</h3><p>Elige el mundo en el que empezará tu cuento.</p></div>
            <div className="category-picker" aria-label="Elige el tipo de aventura">
              <div>{categories.map((category) => <button key={category.name} type="button" onClick={() => onSelectCategory(category.name)} className={selectedCategory === category.name ? 'active' : ''}><b>{category.name}</b><small>{category.description}</small></button>)}</div>
            </div>
          </>}

          {step === 3 && <>
            <div className="creator-stage-heading"><h3>Tu aventura está lista</h3><p>Revisa tus elecciones y abre la primera página.</p></div>
            <div className="adventure-summary">
              <div><span>Héroe</span><b>{usingCustom ? customCharacter.trim() : selectedCharacter?.label}</b></div>
              <div><span>Mundo</span><b>{selectedCategory}</b></div>
            </div>
          </>}
        </div>

        <div className="creator-footer">
          <div>
            <p>{step === 1 && !heroChosen ? 'Elige o escribe un héroe para continuar.' : step < 3 ? 'Puedes cambiar esta elección antes de crear tu cuento.' : freeCreationsRemaining > 0 ? `Hoy tienes ${freeCreationsRemaining} ${freeCreationsRemaining === 1 ? 'creación gratis' : 'creaciones gratis'}.` : canCreate ? `Cada cuento usa ${storyCost} créditos.` : `Necesitas ${storyCost} créditos para crear un cuento. Pide ayuda a una persona adulta.`}</p>
            {error && <p className="error-message" role="alert">{error}</p>}
          </div>
          <div className="creator-actions">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="secondary-button"><ArrowLeft size={19} /> Atrás</button>}
            {step < 3 ? <button type="button" onClick={() => setStep(step + 1)} disabled={step === 1 && !heroChosen} className="primary-button">Continuar <ArrowRight size={22} /></button> : <button onClick={onCreate} disabled={creating || !heroChosen} className="primary-button">{label} <Sparkles size={19} /><ArrowRight size={22} /></button>}
          </div>
        </div>
      </div>
    </section>
  )
}
