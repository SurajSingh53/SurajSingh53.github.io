import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import Background from './components/Background'
import CustomCursor from './components/CustomCursor'
import ScrollRail from './components/ScrollRail'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import useSmoothScroll from './hooks/useSmoothScroll'
import useActiveSection from './hooks/useActiveSection'
import { SECTION_IDS } from './lib/sections'

export default function App() {
  const spotRef = useRef(null)
  const reduce = useReducedMotion()

  useSmoothScroll(!reduce)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const el = spotRef.current
    if (!el) return
    const move = (e) => {
      el.style.setProperty('--x', `${e.clientX}px`)
      el.style.setProperty('--y', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <>
      <Background />
      <div ref={spotRef} className="spotlight" aria-hidden="true" />
      <CustomCursor />
      <ScrollRail active={active} />
      <main className="relative z-10">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </>
  )
}
