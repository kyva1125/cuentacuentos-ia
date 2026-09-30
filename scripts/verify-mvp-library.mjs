import { access, readFile, stat } from 'node:fs/promises'
import ts from 'typescript'
import sharp from 'sharp'

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

const source = ts.createSourceFile('App.tsx', app, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
const declarations = new Map()
const visit = (node) => {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) declarations.set(node.name.text, node.initializer)
  ts.forEachChild(node, visit)
}
visit(source)
const property = (node, name) => node?.properties?.find((item) => item.name?.text === name)?.initializer
const storyContent = declarations.get('authoredStoryContent')
const choiceBeats = declarations.get('fableChoiceBeats')
requireMatch(storyContent?.properties.length === 18, 'The eighteen visible stories need authored fables')
for (const story of storyContent.properties) {
  const id = story.name.text
  const texts = property(story.initializer, 'texts')?.elements
  const titles = property(story.initializer, 'titles')?.elements
  requireMatch(texts?.length === 5 && titles?.length === 5, `${id} needs five chapters`)
  for (const [index, chapter] of texts.entries()) {
    const words = chapter.text.trim().split(/\s+/).length
    requireMatch(chapter.text.includes('\n\n') && words >= 35 && words <= 45, `${id} chapter ${index + 1} needs two paragraphs of 35–45 words`)
  }
  const paths = property(story.initializer, 'paths')?.elements
  const endings = property(story.initializer, 'endingPaths')
  const beats = choiceBeats.properties.find((item) => item.name.text === id)?.initializer?.elements
  requireMatch(paths?.length === 4 || (beats?.length === 3 && endings), `${id} needs choices at all four chapters`)
  if (paths) {
    const fableThread = {
      'luma-faro-mareas': 'brillo',
      'luma-isla-barcas': 'tino',
      'luma-arrecife-cristal': 'concha',
    }[id]
    for (const [index, group] of paths.entries()) for (const key of ['a', 'b', 'c']) {
      const text = property(property(group, key), 'text')?.text
      const words = text?.trim().split(/\s+/).length
      requireMatch(text?.includes('\n\n') && words >= 35 && words <= 45, `${id} choice ${index + 1}${key} needs two paragraphs of 35–45 words`)
      if (fableThread) requireMatch(text.toLowerCase().includes(fableThread), `${id} choice ${index + 1}${key} loses its fable conflict`)
    }
  }
  const finale = paths ? paths[3] : endings
  const endingTexts = ['a', 'b', 'c'].map((key) => property(property(finale, key), 'text')?.text)
  requireMatch(endingTexts.every(Boolean) && new Set(endingTexts).size === 3, `${id} needs three different endings`)
  requireMatch(['a', 'b', 'c'].every((key) => property(property(finale, key), 'lesson')?.text), `${id} needs a lesson for each ending`)
}

for (const [, id] of authoredStories) {
  const start = authoredBlock.indexOf(`"${id}": {`)
  const next = authoredBlock.indexOf('\n  "', start + 1)
  const entry = authoredBlock.slice(start, next === -1 ? undefined : next)
  requireMatch(entry.includes('titles:'), `${id} needs authored chapter titles`)
  requireMatch(entry.includes('texts:'), `${id} needs authored chapter text`)
  requireMatch(entry.includes('lesson:'), `${id} needs a story-specific lesson`)
  if (id.startsWith('luma-')) {
    requireMatch(entry.includes('paths:'), `${id} needs authored decision paths`)
    requireMatch([...entry.matchAll(/\blabel: /g)].length === 12, `${id} needs twelve distinct decision labels`)
    requireMatch([...entry.matchAll(/\btext: /g)].length === 12, `${id} needs twelve decision continuations`)
  }
}

requireMatch(app.includes('trialChapters.slice(0, 5)'), 'Stories must have exactly five chapters')
requireMatch(app.includes('trialChapters[4].decisions = []'), 'Chapter five must not offer a decision')
requireMatch(app.includes('story.chapters[index + 1].continuations = {'), 'Chapters one through four must branch')
requireMatch(app.includes('coinReward: 1') && app.includes('coinReward: 2') && app.includes('coinReward: 3'), 'Stories must end in three progressive quiz rewards')
requireMatch(app.includes('Elige cómo continúa {activeCharacter.name}'), 'Decision heading must use the active character')
requireMatch(app.includes('`${activeCharacter.name} elige ${label}`'), 'Decision image alt text must use the active character')
requireMatch(app.includes('recuerdas de {activeStory.title}'), 'Story ending must use the active story title')

requireMatch(!/from "\.\/assets\/(style-v2|illustrations-v3|sendero-generico|story-covers-gpt)\//.test(app), 'The app must not import retired artwork')
requireMatch(!/import\.meta\.glob\([^)]*(style-v2|illustrations-v3|story-scenes)/s.test(app), 'The build must not bundle retired artwork')
for (const asset of [...app.matchAll(/from "(\.\/assets\/fable\/[^"\n]+)"/g)].map((match) => `src/${match[1].slice(2)}`)) {
  await access(asset)
  requireMatch((await stat(asset)).size > 0, `Empty active visual asset: ${asset}`)
}

for (const storyId of storyContent.properties.map((story) => story.name.text)) {
  const cover = `src/assets/fable/covers/${storyId}-cover.webp`
  requireMatch(app.includes(`./assets/fable/covers/${storyId}-cover.webp`), `${storyId} must use its fable cover`)
  const coverMetadata = await sharp(cover).metadata()
  requireMatch(coverMetadata.format === 'webp' && coverMetadata.width === 1024 && coverMetadata.height === 1024, `${storyId} needs a 1024×1024 WebP cover`)
  const names = [
    'opening',
    'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5',
    ...[1, 2, 3, 4].flatMap((chapter) => ['a', 'b', 'c'].map((choice) => `chapter-${chapter}-choice-${choice}`)),
  ]
  for (const name of names) {
    const asset = `src/assets/illustrations-fable/${storyId}-${name}.webp`
    await access(asset)
    requireMatch((await stat(asset)).size > 0, `Missing fable illustration: ${asset}`)
    const metadata = await sharp(asset).metadata()
    requireMatch(metadata.format === 'webp' && metadata.width === 1024 && metadata.height === 768, `${storyId} ${name} needs a 1024×768 WebP scene`)
  }
}

for (const token of ["--ink:#2e2118", "--paper:#fbf4e4", "--page:#efe2c4", "--sun:#e3a55b", "--coral:#a8412c", "--leaf:#9db57a", "--sky:#9dbdd0", "--grape:#5b2a2f", "--gold:#d9ab45"]) requireMatch(css.toLowerCase().includes(token), `Missing fable palette token: ${token}`)
requireMatch(!css.includes("Press Start 2P") && !css.includes("pixelated"), "Fable UI must not use pixel fonts or pixelated rendering")

console.log(`Maticuentos verified: ${authoredStories.length} authored story records, five-chapter model, dynamic reader copy, and active art assets.`)
