import { access, readFile, stat } from 'node:fs/promises'

const app = await readFile('src/App.tsx', 'utf8')
const css = await readFile('src/styles.css', 'utf8')
const requireMatch = (condition, message) => { if (!condition) throw new Error(message) }

const characterIds = ['nia', 'teo', 'luma', 'rok', 'bit', 'suri']
const authoredBlock = app.slice(app.indexOf('const authoredStoryContent:'), app.indexOf('function renderTemplate'))
const authoredStories = [...authoredBlock.matchAll(/^  "([a-z-]+)": \{/gm)]

requireMatch(!app.includes('makeTrialStory'), 'No production story may use makeTrialStory')
requireMatch(app.includes('function createStoryShell'), 'Story artwork wiring is missing')
requireMatch(app.includes('const stories: Story[]'), 'Story catalog is missing')
requireMatch(characterIds.every((id) => app.includes(`id: "${id}"`)), 'Every protagonist must remain available')
requireMatch(authoredStories.length >= 14, `Expected authored copy for the visible catalog; found ${authoredStories.length}`)

for (const [, id] of authoredStories) {
  const start = authoredBlock.indexOf(`"${id}": {`)
  const next = authoredBlock.indexOf('\n  "', start + 1)
  const entry = authoredBlock.slice(start, next === -1 ? undefined : next)
  requireMatch(entry.includes('titles:'), `${id} needs authored chapter titles`)
  requireMatch(entry.includes('texts:'), `${id} needs authored chapter text`)
  requireMatch(entry.includes('lesson:'), `${id} needs a story-specific lesson`)
}

requireMatch(app.includes('trialChapters.slice(0, 5)'), 'Stories must have exactly five chapters')
requireMatch(app.includes('trialChapters[4].decisions = []'), 'Chapter five must not offer a decision')
requireMatch(app.includes('story.chapters[index + 1].continuations = {'), 'Chapters one through four must branch')
requireMatch(app.includes('coinReward: 1') && app.includes('coinReward: 2') && app.includes('coinReward: 3'), 'Stories must end in three progressive quiz rewards')
requireMatch(app.includes('Elige cómo continúa {activeCharacter.name}'), 'Decision heading must use the active character')
requireMatch(app.includes('`${activeCharacter.name} elige ${label}`'), 'Decision image alt text must use the active character')
requireMatch(app.includes('recuerdas de {activeStory.title}'), 'Story ending must use the active story title')

for (const asset of [...app.matchAll(/from "(\.\/assets\/style-v2\/[^"\n]+)"/g)].map((match) => `src/${match[1].slice(2)}`)) {
  await access(asset)
  requireMatch((await stat(asset)).size > 0, `Empty active visual asset: ${asset}`)
}

for (const token of ['--ink:#1d2b53', '--paper:#fff1e8', '--sun:#ffa300', '--coral:#ff004d', '--leaf:#00e436', '--sky:#29adff', '--grape:#7e2553', '--gold:#ffec27']) requireMatch(css.toLowerCase().includes(token), `Missing palette token: ${token}`)
requireMatch(!css.includes('border-radius'), 'Pixel UI must not use rounded corners')

console.log(`Aventuras Píxel verified: ${authoredStories.length} authored story records, five-chapter model, dynamic reader copy, and active art assets.`)
