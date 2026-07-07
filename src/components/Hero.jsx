import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Database, Layers, Boxes, Zap } from 'lucide-react'
import { profile } from '../data/content'
import { shouldAnimateEntrance } from '../lib/prerender'
import Magnetic from './Magnetic'

const EASE = [0.22, 1, 0.36, 1]

const techCards = [
  { icon: Database, label: 'Snowflake', sub: 'Cloud warehouse', pos: 'top-[3%] left-[26%]', delay: '0s' },
  { icon: Layers, label: 'Delta Lake', sub: 'Lakehouse tables', pos: 'top-[27%] left-[50%]', delay: '0.8s' },
  { icon: Boxes, label: 'Microsoft Fabric', sub: 'OneLake', pos: 'top-[53%] left-[8%]', delay: '1.6s' },
  { icon: Zap, label: 'PySpark', sub: 'Distributed ETL', pos: 'top-[75%] left-[42%]', delay: '2.4s' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
}
const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

function ScrollIndicator({ play }) {
  return (
    <motion.a
      href="#about"
      initial={play ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1 }}
      className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 text-white/40"
    >
      <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      <span className="relative w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
        <motion.span
          className="w-1 h-1.5 rounded-full bg-white/70"
          animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
    </motion.a>
  )
}

export default function Hero() {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const gx = useSpring(useTransform(px, [-0.5, 0.5], [30, -30]), { stiffness: 50, damping: 20 })
  const gy = useSpring(useTransform(py, [-0.5, 0.5], [30, -30]), { stiffness: 50, damping: 20 })

  // Only play the entrance animation on a fresh (non-prerendered) client load.
  // When the HTML was pre-rendered the content is already painted, so we render
  // it in its settled state to avoid a flash and keep hydration in sync.
  const [play] = useState(() => shouldAnimateEntrance())

  const handleMove = (e) => {
    px.set(e.clientX / window.innerWidth - 0.5)
    py.set(e.clientY / window.innerHeight - 0.5)
  }

  return (
    <section
      id="home"
      onMouseMove={handleMove}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-16 pb-16"
    >
      <motion.div
        style={{ x: gx, y: gy }}
        aria-hidden="true"
        className="hidden lg:block absolute right-[5%] top-[12%] h-[350px] w-[420px] pointer-events-none"
      >
        {techCards.map((c) => (
          <div
            key={c.label}
            style={{ animationDelay: c.delay }}
            className={`floaty absolute ${c.pos} glass flex items-center gap-3 px-4 py-3 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]`}
          >
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-400/25 to-sky-400/15 border border-white/10 text-indigo-100">
              <c.icon size={18} strokeWidth={1.75} />
            </span>
            <div>
              <div className="text-sm text-white/85 whitespace-nowrap">{c.label}</div>
              <div className="text-[10px] text-white/40 whitespace-nowrap">{c.sub}</div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        variants={container}
        initial={play ? 'hidden' : false}
        animate="visible"
        className="container-x relative z-10"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white/60"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
          </span>
          Available for Data Engineering roles
        </motion.div>

        <motion.p variants={item} className="eyebrow mb-5">
          {profile.role} — {profile.specialization}
        </motion.p>

        <motion.h1
          variants={item}
          aria-label={profile.name}
          className="font-display font-semibold tracking-tight leading-[1.05] text-[16vw] sm:text-[13vw] md:text-[9.5vw] pb-2"
        >
          <span className="block text-white">{profile.firstName}</span>
          <span className="block gradient-text pb-[0.12em]">{profile.lastName}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-base md:text-lg text-white/60 leading-relaxed"
        >
          {profile.intro}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic strength={0.35}>
            <a href="#projects" className="btn-primary group">
              View Work
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2}
              />
            </a>
          </Magnetic>
          <Magnetic strength={0.35}>
            <a href="#contact" className="btn-ghost">
              Get in Touch
            </a>
          </Magnetic>
        </motion.div>

        <motion.div variants={item} className="mt-14 flex flex-wrap gap-2.5">
          {profile.stack.map((s) => (
            <span key={s} className="glass-chip">
              {s}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <ScrollIndicator play={play} />
    </section>
  )
}
