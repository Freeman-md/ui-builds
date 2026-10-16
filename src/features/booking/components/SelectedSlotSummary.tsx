import { AnimatePresence, motion, useIsPresent, useReducedMotion } from 'motion/react'
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
            <h2>
              <time dateTime={day.dateKey}>
                <span className="sr-only">{formatBookingDate(day.date)}</span>
                <span className="booking-summary-date" aria-hidden="true">
                  {reducedMotion ? formatBookingDate(day.date) : (
                    <AnimatePresence initial={false} mode="wait">
                      <motion.span
                        key={day.dateKey}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: uiMotion.exitDuration } }}
                        transition={{ duration: uiMotion.enterDuration, ease: uiMotion.easeOut }}
                      >{formatBookingDate(day.date)}</motion.span>
                    </AnimatePresence>
                  )}
                </span>
              </time>
            </h2>
            <p>
              <span className="sr-only">{slot.time}</span>
              <span className="booking-summary-time" aria-hidden="true">
                {reducedMotion ? slot.time : (
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      className="booking-summary-time-value"
                      key={slot.time}
                      initial={{ opacity: 0, transform: 'rotateX(-75deg)' }}
                      animate={{ opacity: 1, transform: 'rotateX(0deg)' }}
                      exit={{ opacity: 0, transform: 'rotateX(75deg)', transition: { duration: uiMotion.exitDuration } }}
                      transition={{ duration: uiMotion.enterDuration, ease: uiMotion.easeOut }}
                    >{slot.time}</motion.span>
                  </AnimatePresence>
                )}
              </span>{' '}
              <span className="booking-summary-timezone">· {BOOKING_TIMEZONE}</span>
            </p>
          </div>
        </div>
        <div className="booking-summary-actions">{children}</div>
      </section>
    </motion.div>
  )
}
