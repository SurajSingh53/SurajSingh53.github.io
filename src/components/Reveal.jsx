import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: EASE },
  }),
}

/**
 * Scroll-triggered reveal. Animates once when it enters the viewport.
 */
export default function Reveal({ children, i = 0, className = '', as = 'div' }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      custom={i}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </Comp>
  )
}
