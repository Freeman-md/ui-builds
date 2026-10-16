import { motion, useIsPresent, useReducedMotion } from 'motion/react'
import { uiMotion } from '@/lib/motion'
import type { ReactNode } from 'react'
import { CalendarDays } from 'lucide-react'
import type { BookingDay, BookingSlot } from '../data/sample-availability'
import { BOOKING_TIMEZONE, formatBookingDate } from '../week'

type SelectedSlotSummaryProps = {
  day: BookingDay
  slot: BookingSlot
  children: ReactNode
}

export function SelectedSlotSummary({ day, slot, children }: SelectedSlotSummaryProps) {
  const isPresent = useIsPresent()
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="booking-summary-motion"
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      initial={{ height: 0, opacity: 0, y: reducedMotion ? 0 : -10 }}
      animate={{ height: 'auto', opacity: 1, y: 0 }}
      exit={{ height: 0, opacity: 0, y: reducedMotion ? 0 : -10 }}
      transition={{ duration: reducedMotion ? 0 : uiMotion.travelDuration, ease: uiMotion.easeOut }}
    >
      <section className="booking-summary" aria-label="Selected slot summary">
        <div className="booking-summary-details">
          <span className="booking-summary-icon" aria-hidden="true"><CalendarDays className="size-4" /></span>
          <div className="booking-summary-text">
            <h2><time dateTime={day.dateKey}>{formatBookingDate(day.date)}</time></h2>
            <p>{slot.time} <span>· {BOOKING_TIMEZONE}</span></p>
          </div>
        </div>
        <div className="booking-summary-actions">{children}</div>
      </section>
    </motion.div>
  )
}
