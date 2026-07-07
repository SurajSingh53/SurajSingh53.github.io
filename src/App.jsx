import { useEffect, useRef, lazy, Suspense } from 'react'
import { useReducedMotion } from 'framer-motion'
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
import { IS_PRERENDER } from './lib/prerender'

// The WebGL backdrop is code-split into its own async chunk (three.js +
// @react-three/fiber) and skipped entirely during pre-render so no dead
// <canvas> is baked into the static HTML.
const Background = lazy(() => import('./components/Background'))

export default function App() {
  const spotRef = useRef(null)
  const reduce = useReducedMotion()

  // Lenis is skipped during pre-render so the snapshot script can drive native
  // scrolling to trigger every reveal, and so no smooth-scroll classes leak
  // into the static HTML.
  useSmoothScroll(!reduce && !IS_PRERENDER)
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
      {!IS_PRERENDER && (
        <Suspense fallback={null}>
          <Background />
        </Suspense>
      )}
      <div ref={spotRef} className="spotlight" aria-hidden="true" />
      <CustomCursor />
      <ScrollRail active={active} />
      <a href="#main" className="skip-link">Skip to content</a>
      <main id="main" className="relative z-10">
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
