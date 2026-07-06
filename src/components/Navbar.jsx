import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { profile } from '../data/content'
import { SECTIONS } from '../lib/sections'

const NAV = SECTIONS.filter((s) => s.id !== 'home')

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeLabel = SECTIONS.find((s) => s.id === active)?.label ?? 'Home'

  return (
    <>
      {/* top scroll-progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 inset-x-0 z-50 h-[2px] origin-left bg-gradient-to-r from-indigo-400 via-sky-400 to-violet-400"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed top-0 inset-x-0 z-40 flex justify-center px-4 pt-4"
      >
        <nav
          className={`container-x flex items-center justify-between rounded-2xl px-3 md:px-4 py-2.5 transition-all duration-500 ${
            scrolled
              ? 'bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          <a href="#home" className="flex items-center gap-2 font-display font-semibold tracking-tight pl-1">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 gradient-text">
              S
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-sm text-white/85">Suraj Singh</span>
              <span className="text-[10px] text-white/40">
                <span className="text-white/60">/</span> {activeLabel}
              </span>
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-0.5">
            {NAV.map((l) => {
              const isActive = active === l.id
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative px-3.5 py-2 text-sm rounded-full transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <a
            href={`mailto:${profile.contacts.email}`}
            className="text-sm px-4 py-2 rounded-full bg-white text-black font-medium hover:opacity-90 transition-opacity"
          >
            Let's talk
          </a>
        </nav>
      </motion.header>
    </>
  )
}
