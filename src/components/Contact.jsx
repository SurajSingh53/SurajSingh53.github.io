import { motion } from 'framer-motion'
import { Mail, Phone, ArrowUpRight, ArrowRight } from 'lucide-react'
import { profile } from '../data/content'
import Reveal from './Reveal'
import Magnetic from './Magnetic'

const EASE = [0.22, 1, 0.36, 1]

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 0 1 6 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.66.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.24 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22 0 1.6-.02 2.9-.02 3.29 0 .32.22.7.83.58C20.56 22.29 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />
  </svg>
)

const ICONS = { email: Mail, phone: Phone, linkedin: LinkedinIcon, github: GithubIcon }

const socials = [
  {
    key: 'email',
    label: 'Email',
    display: profile.contacts.email,
    href: `mailto:${profile.contacts.email}`,
    external: false,
  },
  {
    key: 'phone',
    label: 'Phone',
    display: profile.contacts.phone,
    href: `tel:${profile.contacts.phone.replace(/[^+\d]/g, '')}`,
    external: false,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    display: 'linkedin.com/in/surajsingh53',
    href: profile.contacts.linkedin,
    external: true,
  },
  {
    key: 'github',
    label: 'GitHub',
    display: 'github.com/SurajSingh53',
    href: profile.contacts.github,
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section pb-16">
      <div className="container-x">
        <div className="relative rounded-[2.5rem]">
          {/* rotating conic glow halo */}
          <span className="glow-ring rounded-[2.5rem]" aria-hidden="true" />

          <div className="glass relative z-[1] rounded-[2.5rem] overflow-hidden px-6 md:px-16 py-20 md:py-28 text-center">
            {/* floating orbs for depth */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-3xl rounded-full bg-gradient-to-br from-indigo-500/25 via-sky-500/15 to-violet-500/20 blur-3xl"
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="pointer-events-none absolute bottom-0 -left-16 w-64 h-64 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-violet-500/20 blur-3xl" />

            <Reveal>
              <p className="eyebrow">Let's build something</p>
            </Reveal>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: EASE }}
              className="relative mt-5 font-display font-semibold tracking-tight text-5xl md:text-7xl leading-[0.95]"
            >
              Have data that needs
              <br />
              <span className="gradient-text text-shimmer">a pipeline?</span>
            </motion.h2>

            <Reveal i={1}>
              <p className="relative mt-6 max-w-lg mx-auto text-white/55">
                Got data that deserves better? I'm open to Data Engineering roles and always down for
                an ambitious pipeline. Let's build something teams rely on.
              </p>
            </Reveal>

            <Reveal i={2}>
              <div className="relative mt-10 flex flex-wrap justify-center gap-4">
                <Magnetic strength={0.35}>
                  <a
                    href={`mailto:${profile.contacts.email}`}
                    className="btn-primary group relative overflow-hidden"
                  >
                    <span className="sheen" aria-hidden="true" />
                    <span className="relative">Start a conversation</span>
                    <ArrowRight className="relative w-4 h-4" strokeWidth={2} aria-hidden="true" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.35}>
                  <a
                    href={profile.contacts.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost group relative overflow-hidden"
                  >
                    <span className="sheen" aria-hidden="true" />
                    <span className="relative">Connect on LinkedIn</span>
                  </a>
                </Magnetic>
              </div>
            </Reveal>

            {/* Real, clickable hyperlinks with icons */}
            <div className="relative mt-14 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
              {socials.map((s, i) => {
                const I = ICONS[s.key]
                return (
                <motion.a
                  key={s.key}
                  href={s.href}
                  target={s.external ? '_blank' : undefined}
                  rel={s.external ? 'noreferrer' : undefined}
                  aria-label={`${s.label}: ${s.display}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="group relative glass overflow-hidden flex items-center gap-4 px-5 py-5 hover:border-white/25 transition-colors"
                >
                  <span className="sheen" aria-hidden="true" />
                  <span className="relative grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400/25 to-sky-400/15 border border-white/10 text-white/85 group-hover:text-white group-hover:scale-110 transition-transform duration-300">
                    <I className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block text-[10px] uppercase tracking-widest text-white/40">
                      {s.label}
                    </span>
                    <span className="block text-sm text-white/80 truncate group-hover:text-white transition-colors">
                      {s.display}
                    </span>
                  </span>
                  <span className="relative text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        <footer className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <span>© {new Date().getFullYear()} {profile.name}. Crafted with React & Three.js.</span>
          <span>Designed & engineered for detail.</span>
        </footer>
      </div>
    </section>
  )
}
