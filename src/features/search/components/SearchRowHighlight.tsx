import { motion, useReducedMotion } from 'motion/react'
import { uiMotion } from '@/lib/motion'

export function SearchRowHighlight() {
  const reducedMotion = useReducedMotion()
  return (
    <motion.span
      layoutId={reducedMotion ? undefined : 'row-highlight'}
      className="search-moving-highlight"
      aria-hidden="true"
      initial={false}
      transition={{ duration: reducedMotion ? 0 : uiMotion.travelDuration, ease: uiMotion.easeOut }}
    />
  )
}
