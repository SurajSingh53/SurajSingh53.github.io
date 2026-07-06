import { useRef, useState } from 'react'
import {
  Code2,
  Workflow,
  Database,
  Boxes,
  ShieldCheck,
  Cloud,
  BarChart3,
  BrainCircuit,
} from 'lucide-react'
import { skills } from '../data/content'
import Reveal from './Reveal'

const ICONS = {
  Languages: Code2,
  'Data Engineering & ETL': Workflow,
  'Lakehouse & Warehousing': Database,
  'Data Modeling': Boxes,
  'Data Quality & Governance': ShieldCheck,
  'Cloud & DevOps': Cloud,
  'Databases & BI': BarChart3,
  'Machine Learning & AI': BrainCircuit,
}

function SkillCard({ group, i }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})
  const Icon = ICONS[group.title] || Code2

  const onMove = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setStyle({
      transform: `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-4px)`,
      '--mx': `${(px + 0.5) * 100}%`,
      '--my': `${(py + 0.5) * 100}%`,
    })
  }
  const reset = () =>
    setStyle({ transform: 'perspective(900px) rotateX(0) rotateY(0) translateY(0)' })

  return (
    <Reveal i={i % 4}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={style}
        className="project-card glass h-full p-6"
      >
        <div className="relative flex items-center gap-3 mb-5">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400/20 to-sky-400/10 border border-white/10 text-indigo-200">
            <Icon size={18} strokeWidth={1.75} />
          </span>
          <h3 className="font-display text-lg font-medium flex-1">{group.title}</h3>
          <span className="font-display text-xs text-white/25">{String(i + 1).padStart(2, '0')}</span>
        </div>
        <div className="relative flex flex-wrap gap-2">
          {group.items.map((item) => (
            <span
              key={item}
              className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/65 hover:text-white hover:border-white/25 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">Capabilities</p>
            <h2 className="section-title">
              A full-stack <span className="gradient-text">data toolkit</span>.
            </h2>
            <p className="mt-5 max-w-xl text-white/55">
              Everything I build with, battle-tested in production — from streaming ingestion and
              Spark to dimensional modeling, governance, and BI.
            </p>
          </Reveal>
          <span className="hidden select-none font-display text-[7rem] leading-none text-white/[0.04] md:block">
            02
          </span>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <SkillCard key={group.title} group={group} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
