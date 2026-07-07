<div align="center">

# Suraj Singh — Portfolio

### Data Engineer · Big Data &amp; Analytics

An immersive, single-page portfolio showcasing production data-engineering work — Lakehouse platforms, batch &amp; streaming pipelines, and cloud-native data systems.

[![Live Site](https://img.shields.io/badge/Live-surajsingh53.github.io-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://surajsingh53.github.io/)
[![Deploy](https://github.com/SurajSingh53/SurajSingh53.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/SurajSingh53/SurajSingh53.github.io/actions/workflows/deploy.yml)

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Three.js](https://img.shields.io/badge/three.js-r169-000000?logo=threedotjs&logoColor=white)](https://threejs.org/)

**[View the live site →](https://surajsingh53.github.io/)**

</div>

---

## Overview

A hand-crafted personal portfolio built as a fast, animated single-page application. It presents my experience as a Data Engineer through a cinematic, motion-driven interface — an animated node-globe background, a physics-based smooth-scroll experience, per-project generative visuals, and a section-aware side navigation rail.

Everything is data-driven: all copy, projects, certifications, and experience live in a single content file, so the site is trivial to keep up to date.

## Highlights

- **Immersive hero** — animated name reveal, availability pill, and floating tech cards with mouse parallax.
- **3D animated background** — a rotating fibonacci node-sphere rendered with React Three Fiber, layered with aurora blobs, a grid overlay, noise, and a vignette.
- **Buttery smooth scrolling** — inertia-based scrolling via [Lenis](https://github.com/darkroomengineering/lenis) with a section-aware side rail indicator.
- **Per-project generative visuals** — each project renders a bespoke animated SVG themed to its domain (Lakehouse, RAG, Streaming, Fraud, Serverless, Warehouse).
- **Live credential links** — certifications deep-link to their real Microsoft Learn, Snowflake, Databricks, and Credly verification pages.
- **Reduced-motion aware** — heavy animations are automatically skipped for users who prefer reduced motion.
- **Fully responsive** — tuned layouts and typography from mobile through ultrawide.

## Tech Stack

| Area | Tools |
| --- | --- |
| **Framework** | React 18, Vite 5 |
| **Styling** | Tailwind CSS 3, custom CSS layers |
| **Animation** | Framer Motion 11, CSS keyframes |
| **3D / WebGL** | Three.js (r169), React Three Fiber |
| **Smooth scroll** | Lenis |
| **Icons** | lucide-react |
| **Deployment** | GitHub Actions → GitHub Pages |

## Sections

`Hero` → `Tech Marquee` → `About` → `Skills` → `Projects` → `Experience` → `Certifications` → `Contact`

## Project Structure

```text
.
├── .github/workflows/deploy.yml   # CI/CD: build + deploy to GitHub Pages
├── public/                        # Static assets (logos, photos, favicon)
│   ├── logos/                     # Company & certification logos
│   └── photos/                    # Personal photo strip
├── src/
│   ├── components/                # UI sections & effects
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectVisual.jsx      # Per-project animated SVG thumbnails
│   │   ├── Experience.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   ├── Background.jsx         # R3F node-globe + aurora background
│   │   ├── ScrollRail.jsx         # Section-aware side navigation
│   │   ├── TechMarquee.jsx
│   │   └── CustomCursor.jsx
│   ├── hooks/
│   │   ├── useSmoothScroll.js     # Lenis integration
│   │   └── useActiveSection.js    # Scroll-spy for the side rail
│   ├── data/content.js            # ← All portfolio content lives here
│   ├── lib/sections.js            # Section registry
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                  # Tailwind + custom component classes
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (bundled with Node.js)

### Installation

```bash
git clone https://github.com/SurajSingh53/SurajSingh53.github.io.git
cd SurajSingh53.github.io
npm install
```

### Development

```bash
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`). The dev server supports hot module replacement.

### Production Build

```bash
npm run build     # outputs static assets to dist/
npm run preview   # serve the production build locally
```

## Deployment

Deployment is fully automated with GitHub Actions. On every push to `main`, the [`deploy.yml`](.github/workflows/deploy.yml) workflow:

1. Installs dependencies with `npm ci`
2. Builds the site with `npm run build`
3. Uploads `dist/` and publishes it to **GitHub Pages**

The live site is served from **[https://surajsingh53.github.io/](https://surajsingh53.github.io/)**. No manual steps are required — just push:

```bash
git add -A
git commit -m "Update content"
git push
```

## Customization

Because the site is data-driven, most updates happen in one place:

- **Content** — edit [`src/data/content.js`](src/data/content.js) to update the profile, stats, skills, projects, experience, and certifications.
- **Logos & photos** — drop replacements into `public/logos/` and `public/photos/`.
- **Theme & effects** — colors, gradients, and animations live in [`src/index.css`](src/index.css) and [`tailwind.config.js`](tailwind.config.js).

## Contact

- **Live site** — [surajsingh53.github.io](https://surajsingh53.github.io/)
- **LinkedIn** — [linkedin.com/in/surajsingh53](https://linkedin.com/in/surajsingh53)
- **GitHub** — [@SurajSingh53](https://github.com/SurajSingh53)
- **Email** — surajsinghshan53@gmail.com

## License

© 2026 Suraj Singh. The source code is available for reference and learning. Personal content, branding, and photography are not licensed for reuse.
