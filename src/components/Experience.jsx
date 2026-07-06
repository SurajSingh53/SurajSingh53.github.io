import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experience } from '../data/content'
import Reveal from './Reveal'

const EASE = [0.22, 1, 0.36, 1]

function CompanyLogo({ item }) {
  const [failed, setFailed] = useState(false)
  if (item.logoUrl && !failed) {
    return (
      <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/10 bg-white">
        <img
          src={item.logoUrl}
          alt={`${item.company} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-5 w-5 object-contain"
        />
      </span>
    )
  }
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-gradient-to-br from-indigo-400/80 to-violet-500/80 font-display text-sm font-semibold text-white">
      {item.company.charAt(0)}
    </span>
  )
}

function TimelineItem({ item, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative pl-16 md:pl-24 pb-16 last:pb-0"
    >
      {/* node */}
      <span className="absolute left-[26px] md:left-[42px] top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#05060a] border-2 border-indigo-300 shadow-[0_0_0_5px_rgba(129,140,248,0.12)]">
        {item.current && (
          <span className="absolute inset-0 rounded-full bg-indigo-300 animate-ping opacity-60" />
        )}
      </span>

      <div className="glass p-6 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-xl md:text-2xl font-semibold flex items-center gap-2.5">
            <CompanyLogo item={item} />
            {item.role}
          </h3>
          <span className="text-xs px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/60">
            {item.period}
          </span>
        </div>
        <p className="mt-1 text-sm text-white/55">
          <span className="gradient-text font-medium">{item.company}</span> · {item.location}
        </p>

        <ul className="mt-5 space-y-3">
          {item.points.map((pt, idx) => (
            <li key={idx} className="flex gap-3 text-sm text-white/60 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-300/70 shrink-0" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Journey</p>
          <h2 className="section-title">
            Where I've <span className="gradient-text">shipped</span>.
          </h2>
          <p className="mt-5 max-w-xl text-white/55">
            Two teams, one obsession — data systems that stay calm under production pressure.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-14">
          {/* base rail */}
          <span className="absolute left-[26px] md:left-[42px] top-2 bottom-2 w-px bg-white/10" />
          {/* animated draw */}
          <motion.span
            style={{ scaleY }}
            className="timeline-line absolute left-[26px] md:left-[42px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-300 via-sky-300 to-transparent"
          />

          {experience.map((item, i) => (
            <TimelineItem key={item.company} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
