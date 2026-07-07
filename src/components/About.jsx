import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { profile } from '../data/content'
import Reveal from './Reveal'

const EASE = [0.22, 1, 0.36, 1]

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}
const line = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function About() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60])

  const onMove = (e) => {
    if (reduce || !cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: -py * 8, ry: px * 10 })
  }

  const lines = [
    'I take data at its messiest and hand it back with structure, speed, and trust.',
    'Batch or streaming, Bronze to Gold — I engineer flows that scale without drama.',
    'So analytics teams ship insight instead of chasing broken jobs at 2am.',
  ]

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="container-x grid md:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start">
        <div>
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="section-title">
              Turning data into <span className="gradient-text">decisions</span>.
            </h2>
          </Reveal>

          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-8 space-y-2 text-xl md:text-2xl font-display text-white/80 leading-snug"
          >
            {lines.map((l, idx) => (
              <motion.p key={idx} variants={line}>
                {l}
              </motion.p>
            ))}
          </motion.div>

          <Reveal i={1}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {profile.stats.map((s) => (
                <div key={s.label} className="glass px-4 py-5">
                  <div className="font-display text-2xl md:text-3xl gradient-text">{s.value}</div>
                  <div className="mt-1 text-xs text-white/50 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div style={{ y }} className="flex justify-center">
          <div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
            }}
            className="glass relative w-full max-w-xs aspect-[4/5] p-6 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-indigo-500/30 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-sky-500/20 blur-3xl" />

            <div className="relative flex items-center justify-between">
              <span className="text-xs tracking-[0.25em] uppercase text-white/40">Engineer</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>

            <div className="relative flex flex-col items-center gap-4 my-auto">
              <div className="w-32 h-32 overflow-hidden rounded-2xl border border-white/15 shadow-2xl ring-1 ring-white/10">
                <img
                  src="/portrait.jpg"
                  alt={profile.name}
                  loading="lazy"
                  decoding="async"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <div className="font-display text-lg">{profile.name}</div>
                <div className="text-xs text-white/50">{profile.location}</div>
              </div>
            </div>

            <div className="relative text-[11px] text-white/40 flex justify-between">
              <span>DP-700 · DP-600</span>
              <span>SnowPro · AWS</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container-x mt-12 md:mt-16">
        <p className="eyebrow mb-5">Beyond the pipelines</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {[
            { src: '/photos/desk.jpg', label: 'In the flow' },
            { src: '/photos/temple.jpg', label: 'Konark, Odisha' },
            { src: '/photos/mountains.jpg', label: 'Mountain reset' },
            { src: '/photos/bar.jpg', label: 'Off the clock' },
          ].map((p) => (
            <div
              key={p.src}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src={p.src}
                alt={p.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
