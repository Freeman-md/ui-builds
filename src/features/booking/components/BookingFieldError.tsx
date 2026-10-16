import { AnimatePresence, motion, useIsPresent, useReducedMotion } from 'motion/react'
import { uiMotion } from '@/lib/motion'

type BookingFieldErrorProps = { message?: string | null; id?: string }

function ErrorMessage({ message, id }: BookingFieldErrorProps) {
  const isPresent = useIsPresent()
  const reducedMotion = useReducedMotion()
  return (
    <motion.div className="booking-error-motion" aria-hidden={!isPresent || undefined}
      initial={reducedMotion ? false : { height: 0, opacity: 0, y: -4 }}
      animate={{ height: 'auto', opacity: 1, y: 0 }}
      exit={{ height: 0, opacity: 0, y: reducedMotion ? 0 : -4 }}
      transition={{ duration: reducedMotion ? 0 : isPresent ? uiMotion.enterDuration : uiMotion.exitDuration, ease: uiMotion.easeOut }}>
      <p className="booking-field-error" id={id} role="alert">{message}</p>
    </motion.div>
  )
}

export function BookingFieldError({ message, id }: BookingFieldErrorProps) {
  return <AnimatePresence initial={false}>{message ? <ErrorMessage key="error" message={message} id={id} /> : null}</AnimatePresence>
}
