import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useIsPresent, useReducedMotion } from 'motion/react'
import { uiMotion } from '@/lib/motion'

type BookingStepContentProps = {
  direction: -1 | 1
  children: ReactNode
  onReady?: (element: HTMLDivElement) => void
}

export function BookingStepContent({ direction, children, onReady }: BookingStepContentProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const isPresent = useIsPresent()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = elementRef.current
    if (!isPresent || !element) return
    onReady?.(element)
  }, [isPresent, onReady])

  return (
    <motion.div
      ref={elementRef}
      className="booking-step-content"
      data-direction={direction}
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      initial={reducedMotion ? false : { opacity: 0, x: direction * 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : uiMotion.exitDuration } }}
      transition={{ duration: reducedMotion ? 0 : uiMotion.enterDuration, ease: uiMotion.easeOut }}
    >
      {children}
    </motion.div>
  )
}
