// One-off image optimizer: resizes + recompresses the site photos in place so
// they ship at sensible web dimensions instead of full-resolution originals.
// Run manually whenever you add/replace photos:
//
//   npm run optimize:img
//
// Uses headless Chrome (Puppeteer, already a dependency) to decode + re-encode,
// so it needs no native image module. Safe to re-run; originals are in git.
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { readFile, writeFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = resolve(__dirname, '..', 'public')

// [file, maxWidth, maxHeight|null, quality 0-1]
const targets = [
  ['portrait.jpg', 640, 640, 0.82],
  ['photos/desk.jpg', 900, null, 0.8],
  ['photos/temple.jpg', 900, null, 0.8],
  ['photos/mountains.jpg', 900, null, 0.8],
  ['photos/bar.jpg', 900, null, 0.8],
]

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function optimizeOne(page, file, maxW, maxH, q) {
  const src = await readFile(file)
  const dataUrl = `data:image/jpeg;base64,${src.toString('base64')}`
  const outDataUrl = await page.evaluate(
    async ({ dataUrl, maxW, maxH, q }) => {
      const img = new Image()
      img.src = dataUrl
      await img.decode()
      const scale = Math.min(1, maxW / img.width, maxH ? maxH / img.height : 1)
      const w = Math.max(1, Math.round(img.width * scale))
      const h = Math.max(1, Math.round(img.height * scale))
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)
      return canvas.toDataURL('image/jpeg', q)
    },
    { dataUrl, maxW, maxH, q },
  )
  const out = Buffer.from(outDataUrl.split(',')[1], 'base64')
  if (out.length < src.length) await writeFile(file, out)
  return { orig: src.length, now: (await stat(file)).size }
}

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    const page = await browser.newPage()
    let before = 0
    let after = 0
    for (const [rel, w, h, q] of targets) {
      const file = resolve(pub, rel)
      if (!existsSync(file)) {
        console.warn('  skip (missing):', rel)
        continue
      }
      const { orig, now } = await optimizeOne(page, file, w, h, q)
      before += orig
      after += now
      console.log(`  ${rel.padEnd(22)} ${kb(orig).padStart(8)} -> ${kb(now).padStart(8)}`)
    }
    console.log(`\nTotal: ${kb(before)} -> ${kb(after)}  (saved ${kb(before - after)})`)
  } finally {
    await browser.close()
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
