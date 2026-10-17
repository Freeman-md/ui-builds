import { motion, useIsPresent, useReducedMotion } from 'motion/react'
import { uiMotion } from '@/lib/motion'

export function SearchRowHighlight() {
  const present = useIsPresent()
  const reducedMotion = useReducedMotion()
  if (!present) return null
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
