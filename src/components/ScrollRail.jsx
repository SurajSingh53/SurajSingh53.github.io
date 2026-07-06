import { motion } from 'framer-motion'
import { SECTIONS } from '../lib/sections'

/**
 * Right-side section navigation: uppercase labels + ticks, with a glowing
 * gradient indicator that springs smoothly between sections as you scroll.
 */
export default function ScrollRail({ active }) {
  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed right-6 top-1/2 z-30 -translate-y-1/2 flex-col items-end"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={isActive ? 'page' : undefined}
            className="group flex items-center justify-end gap-3 py-2 pl-10"
          >
            <span
              className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                isActive
                  ? 'text-white'
                  : 'hidden text-white/40 group-hover:inline group-hover:text-white/80 xl:inline'
              }`}
            >
              {s.label}
            </span>
            <span className="relative flex h-[2px] w-9 items-center justify-end">
              {isActive && (
                <motion.span
                  layoutId="rail-active"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-300 via-sky-300 to-violet-300 shadow-[0_0_10px_1px_rgba(129,140,248,0.6)]"
                />
              )}
              <span
                className={`block h-[2px] rounded-full bg-white/25 transition-all duration-300 ${
                  isActive ? 'w-9 opacity-0' : 'w-4 group-hover:w-6 group-hover:bg-white/60'
                }`}
              />
            </span>
          </a>
        )
      })}
    </nav>
  )
}
