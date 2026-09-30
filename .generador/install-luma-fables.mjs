import { copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceDir = 'F:/Proyectos/ComfyUI/salidas'
const targetDir = 'src/assets/illustrations-v3'
const names = [
  'opening',
  'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5',
  ...[1, 2, 3, 4].flatMap((chapter) => ['a', 'b', 'c'].map((choice) => `chapter-${chapter}-choice-${choice}`)),
]
const selectedRetries = {
  'luma-faro-mareas': {
    opening: 'retry',
    'chapter-1-choice-c': 'retry',
    'chapter-2-choice-c': 'retry',
    'chapter-3-choice-a': 'retry',
    'chapter-3-choice-c': 'retry',
    'chapter-4-choice-c': 'retry',
  },
  'luma-isla-barcas': {
    'chapter-4': 'retry3',
    'chapter-1-choice-a': 'retry',
    'chapter-1-choice-c': 'retry2',
    'chapter-2-choice-c': 'retry',
    'chapter-3-choice-c': 'retry',
    'chapter-4-choice-b': 'retry',
    'chapter-4-choice-c': 'retry',
  },
}

await mkdir(targetDir, { recursive: true })
for (const storyId of ['luma-faro-mareas', 'luma-isla-barcas']) {
  for (const name of names) {
    const retry = selectedRetries[storyId][name]
    const source = retry
      ? path.join(sourceDir, `${storyId}-${name}-${retry}.webp`)
      : path.join(sourceDir, `${storyId}-${name}-v3.png`)
    const target = path.join(targetDir, `${storyId}-${name}-v3.webp`)
    const metadata = await sharp(source).metadata()
    if (metadata.width !== 1024 || metadata.height !== 768) {
      throw new Error(`Unexpected dimensions for ${source}: ${metadata.width}x${metadata.height}`)
    }
    if (retry) await copyFile(source, target)
    else await sharp(source).webp({ quality: 90 }).toFile(target)
    console.log(target)
  }
}
