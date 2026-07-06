import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/content'
import Reveal from './Reveal'
import ProjectVisual from './ProjectVisual'

function MetaBadges({ p }) {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-white/70 backdrop-blur">
        {p.year}
      </span>
      {p.template && (
        <span className="rounded-full border border-indigo-300/20 bg-indigo-400/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-indigo-200/80 backdrop-blur">
          Concept
        </span>
      )}
    </div>
  )
}

function ProjectCard({ p, i }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setStyle({
      transform: `perspective(1100px) rotateX(${-py * 4}deg) rotateY(${px * 5}deg)`,
      '--mx': `${(px + 0.5) * 100}%`,
      '--my': `${(py + 0.5) * 100}%`,
    })
  }
  const reset = () => setStyle({ transform: 'perspective(1100px) rotateX(0) rotateY(0)' })

  return (
    <Reveal i={i % 2}>
      <a
        href={p.repoUrl}
        target="_blank"
        rel="noreferrer"
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={style}
        aria-label={`${p.title} — open on GitHub`}
        className="project-card glass group flex h-full flex-col overflow-hidden"
      >
        <div className="relative h-44 w-full">
          <ProjectVisual accent={p.accent} kind={p.kind} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b12] via-[#0a0b12]/10 to-transparent" />
          <div className="absolute left-4 top-4">
            <MetaBadges p={p} />
          </div>
          <ArrowUpRight
            className="absolute right-4 top-4 h-5 w-5 text-white/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
            strokeWidth={1.75}
          />
        </div>

        <div className="relative flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
            {p.title}
          </h3>
          <p className="mt-3 leading-relaxed text-white/60">{p.summary}</p>

          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <p className="overflow-hidden pt-3 text-sm leading-relaxed text-white/45">{p.detail}</p>
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </a>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">Selected Work</p>
            <h2 className="section-title">
              Pipelines, platforms & <span className="gradient-text">products</span>.
            </h2>
            <p className="mt-5 max-w-xl text-white/55">
              Real systems, shipped end-to-end — Lakehouses, streaming engines, and AI that actually
              answers. Every tile opens straight to the code.
            </p>
          </Reveal>
          <span className="hidden select-none font-display text-[7rem] leading-none text-white/[0.04] md:block">
            03
          </span>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
