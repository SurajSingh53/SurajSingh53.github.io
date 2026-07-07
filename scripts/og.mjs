// Generates the branded Open Graph share image + PWA/app icons using headless
// Chrome (Puppeteer). Run manually whenever the branding changes:
//
//   npm run og
//
// Outputs (committed as static assets under /public):
//   public/og-image.png        1200x630  social share card
//   public/icon-192.png         192x192  PWA icon
//   public/icon-512.png         512x512  PWA icon
//   public/apple-touch-icon.png 180x180  iOS home-screen icon
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '..', 'public')

const BG = '#05060a'

const ogTemplate = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
    <style>
      * { margin: 0; box-sizing: border-box; }
      html, body { width: 1200px; height: 630px; }
      body {
        background: ${BG};
        color: #fff;
        font-family: 'Inter', system-ui, sans-serif;
        position: relative;
        overflow: hidden;
      }
      .aurora { position: absolute; border-radius: 9999px; filter: blur(90px); opacity: 0.55; }
      .a1 { width: 620px; height: 620px; top: -220px; left: -140px; background: #4f46e5; }
      .a2 { width: 560px; height: 560px; bottom: -240px; right: -120px; background: #0ea5e9; }
      .a3 { width: 420px; height: 420px; top: 40px; right: 180px; background: #7c3aed; opacity: 0.4; }
      .grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: radial-gradient(ellipse at center, #000 40%, transparent 85%);
      }
      .wrap {
        position: relative; z-index: 2;
        height: 100%; padding: 72px 80px;
        display: flex; flex-direction: column; justify-content: space-between;
      }
      .top { display: flex; align-items: center; gap: 16px; }
      .dot { width: 12px; height: 12px; border-radius: 9999px; background: #34d399; box-shadow: 0 0 16px #34d399; }
      .avail { font-size: 20px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.6); }
      .name {
        font-family: 'Space Grotesk', sans-serif; font-weight: 700;
        font-size: 132px; line-height: 0.98; letter-spacing: -0.03em;
      }
      .grad {
        background: linear-gradient(110deg, #818cf8, #38bdf8 55%, #c084fc);
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }
      .role {
        margin-top: 22px; font-family: 'Space Grotesk', sans-serif; font-weight: 500;
        font-size: 40px; color: rgba(255,255,255,0.82);
      }
      .stack { display: flex; gap: 14px; flex-wrap: wrap; }
      .chip {
        font-size: 22px; padding: 12px 22px; border-radius: 9999px;
        background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
        color: rgba(255,255,255,0.85);
      }
      .site { font-size: 24px; color: rgba(255,255,255,0.5); letter-spacing: 0.04em; }
    </style>
  </head>
  <body>
    <div class="aurora a1"></div>
    <div class="aurora a2"></div>
    <div class="aurora a3"></div>
    <div class="grid"></div>
    <div class="wrap">
      <div class="top">
        <span class="dot"></span>
        <span class="avail">Available for Data Engineering roles</span>
      </div>
      <div>
        <div class="name"><span>Suraj </span><span class="grad">Singh</span></div>
        <div class="role">Data Engineer &nbsp;·&nbsp; Big Data &amp; Analytics</div>
      </div>
      <div style="display:flex; align-items:flex-end; justify-content:space-between; gap:24px;">
        <div class="stack">
          <span class="chip">PySpark</span>
          <span class="chip">Microsoft Fabric</span>
          <span class="chip">Snowflake</span>
          <span class="chip">Databricks</span>
          <span class="chip">Azure</span>
        </div>
        <div class="site">surajsingh53.github.io</div>
      </div>
    </div>
  </body>
</html>`

const iconTemplate = (size) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
    <style>
      * { margin: 0; box-sizing: border-box; }
      html, body { width: ${size}px; height: ${size}px; }
      body { display: grid; place-items: center; background: ${BG}; }
      .badge {
        width: ${Math.round(size * 0.82)}px; height: ${Math.round(size * 0.82)}px;
        border-radius: ${Math.round(size * 0.22)}px;
        display: grid; place-items: center;
        background:
          radial-gradient(120% 120% at 20% 15%, rgba(129,140,248,0.35), transparent 60%),
          #0b0d16;
        border: 1px solid rgba(255,255,255,0.08);
      }
      .s {
        font-family: 'Space Grotesk', sans-serif; font-weight: 700;
        font-size: ${Math.round(size * 0.5)}px; line-height: 1;
        background: linear-gradient(135deg, #818cf8, #38bdf8 50%, #c084fc);
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }
    </style>
  </head>
  <body><div class="badge"><span class="s">S</span></div></body>
</html>`

async function shoot(page, html, width, height, out) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'load', timeout: 60000 })
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready
  })
  await new Promise((r) => setTimeout(r, 400))
  await page.screenshot({ path: out, type: 'png' })
  console.log('  wrote', out)
}

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    const page = await browser.newPage()
    console.log('Generating branding assets…')
    await shoot(page, ogTemplate, 1200, 630, resolve(publicDir, 'og-image.png'))
    await shoot(page, iconTemplate(512), 512, 512, resolve(publicDir, 'icon-512.png'))
    await shoot(page, iconTemplate(192), 192, 192, resolve(publicDir, 'icon-192.png'))
    await shoot(page, iconTemplate(180), 180, 180, resolve(publicDir, 'apple-touch-icon.png'))
    console.log('Done.')
  } finally {
    await browser.close()
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
