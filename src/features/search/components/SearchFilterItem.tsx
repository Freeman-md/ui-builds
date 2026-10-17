import type { ReactNode, Ref } from 'react'
import { motion, useIsPresent, useReducedMotion } from 'motion/react'
import { uiMotion } from '@/lib/motion'

// Presence owns the visual exit; removed matches must stop accepting input immediately.
export function SearchFilterItem({ children, className, ref }: { children: ReactNode; className?: string; ref?: Ref<HTMLDivElement> }) {
  const present = useIsPresent()
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      className={className}
      layout="position"
      inert={!present}
      aria-hidden={present ? undefined : true}
      data-filter-exiting={present ? undefined : true}
      initial={{ opacity: reducedMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : uiMotion.exitDuration } }}
      transition={{
        opacity: { duration: reducedMotion ? 0 : uiMotion.enterDuration, delay: reducedMotion ? 0 : uiMotion.exitDuration, ease: uiMotion.easeOut },
        layout: { duration: reducedMotion ? 0 : uiMotion.enterDuration, delay: reducedMotion ? 0 : uiMotion.exitDuration, ease: uiMotion.easeOut },
      }}
    >
      {children}
    </motion.div>
  )
}
