import { motion, useReducedMotion } from 'motion/react'
import { uiMotion } from '@/lib/motion'

type BookingProgressProps = { step: 'slots' | 'details' | 'confirmation'; onBack: () => void; isBooking: boolean }

export function BookingProgress({ step, onBack, isBooking }: BookingProgressProps) {
  const reducedMotion = useReducedMotion()
  const activeIndex = { slots: 0, details: 1, confirmation: 2 }[step]
  const labels = ['Choose a slot', 'Your details', 'Confirmed']

  return (
    <nav className="booking-progress" aria-label="Booking progress">
      <ol>
        {labels.map((label, index) => (
          <li key={label} data-reached={index <= activeIndex} aria-current={index === activeIndex ? 'step' : undefined}>
            <span className="booking-progress-line" aria-hidden="true">
              <motion.span className="booking-progress-fill" initial={false} animate={{ scaleX: index <= activeIndex ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : uiMotion.travelDuration, ease: uiMotion.easeOut }} />
            </span>
            {index === 0 && step === 'details' ? (
              <button type="button" onClick={onBack} disabled={isBooking}><span>1.</span> {label}</button>
            ) : <span className="booking-progress-label"><span>{index + 1}.</span> {label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
