import { readdir } from 'node:fs/promises'
import { extname, join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const assetsDirectory = fileURLToPath(new URL('../src/assets/', import.meta.url))
const files = await readdir(assetsDirectory)
const sourceImages = files.filter((file) => ['.png', '.jpg', '.jpeg'].includes(extname(file).toLowerCase()))

await Promise.all(sourceImages.map(async (file) => {
  const source = join(assetsDirectory, file)
  const target = join(assetsDirectory, `${parse(file).name}.webp`)
  await sharp(source)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(target)
  console.log(`Optimized ${file}`)
}))
