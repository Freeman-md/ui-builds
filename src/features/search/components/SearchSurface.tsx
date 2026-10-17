import type { ReactNode } from 'react'
import { motion, useIsPresent, useReducedMotion } from 'motion/react'
import { uiMotion } from '@/lib/motion'

export function SearchSurface({ children, onEntered }: { children: ReactNode; onEntered: () => void }) {
  const present = useIsPresent()
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className="search-stage"
      inert={!present}
      initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : 4 }}
      transition={{ duration: reducedMotion ? 0 : uiMotion.enterDuration, ease: uiMotion.easeOut }}
      onAnimationComplete={() => { if (present) onEntered() }}
    >
      {children}
    </motion.div>
  )
}
