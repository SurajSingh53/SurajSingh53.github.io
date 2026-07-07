// Post-build pre-render: boots `vite preview`, loads the built site in headless
// Chrome, waits for React + fonts to settle, then writes the fully-rendered DOM
// back into dist/index.html so crawlers and social scrapers get real content.
//
// Runs automatically after `npm run build` (see the "postbuild" script).
//
// SAFETY: any failure here is logged and swallowed (exit 0) so the deploy still
// ships the normal client-rendered shell instead of breaking the pipeline.
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distIndex = resolve(__dirname, '..', 'dist', 'index.html')

async function prerender() {
  if (!existsSync(distIndex)) {
    console.warn('[prerender] dist/index.html not found — did `vite build` run? Skipping.')
    return
  }

  const { preview } = await import('vite')
  const puppeteer = (await import('puppeteer')).default

  const server = await preview({
    preview: { port: 4183, strictPort: false, host: '127.0.0.1' },
  })

  const url = server.resolvedUrls?.local?.[0] ?? 'http://127.0.0.1:4183/'
  console.log('[prerender] preview server:', url)

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 })

    // Tell the app it is being pre-rendered BEFORE any bundle executes:
    //  - skip the WebGL Background so no dead <canvas> lands in the snapshot
    //  - render the hero in its settled/visible state (no entrance animation)
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true
    })

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })

    // Wait until React has mounted the full section tree.
    await page.waitForSelector('#root #contact', { timeout: 30000 })
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready
    })

    // Scroll through the whole page so every scroll-triggered (whileInView)
    // reveal fires and settles into its visible state, then return to the top.
    // This bakes fully-visible, indexable content into the static snapshot.
    await page.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms))
      const step = Math.round(window.innerHeight * 0.5)
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await wait(150)
      }
      window.scrollTo(0, 0)
      await wait(200)
    })
    await new Promise((r) => setTimeout(r, 900))

    // Mark the document so the client renders the hero in its visible state on
    // first paint (see src/lib/prerender.js), and tidy up client-only artefacts
    // that shouldn't be baked into static HTML.
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-prerendered', 'true')
      document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-scrolling', 'lenis-stopped')
      document.documentElement.removeAttribute('style')
      document.querySelectorAll('canvas').forEach((c) => c.remove())
    })

    let html = await page.content()
    if (!html.startsWith('<!doctype') && !html.startsWith('<!DOCTYPE')) {
      html = '<!doctype html>\n' + html
    }

    await writeFile(distIndex, html, 'utf8')

    const bytes = Buffer.byteLength(html)
    const hasName = html.includes('Suraj')
    console.log(`[prerender] wrote dist/index.html (${bytes} bytes, hero text: ${hasName ? 'yes' : 'NO'})`)
  } finally {
    await browser.close().catch(() => {})
    await new Promise((resolve) => {
      if (server?.httpServer?.listening) server.httpServer.close(() => resolve())
      else resolve()
    })
  }
}

prerender()
  .then(() => process.exit(0))
  .catch((err) => {
    console.warn('[prerender] skipped due to error (shipping client-rendered shell):')
    console.warn(err?.stack || err)
    process.exit(0)
  })
