import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { motion, useReducedMotion } from 'motion/react'
import type { DemoBooking } from '../simulate-booking'
import { formatBookingDate } from '../week'

type BookingConfirmationProps = { booking: DemoBooking; onRestart: () => void }

export function BookingConfirmation({ booking, onRestart }: BookingConfirmationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const reduceMotion = useReducedMotion()
  useEffect(() => { headingRef.current?.focus() }, [])
  const date = new Date(`${booking.dateKey}T00:00:00Z`)
  const firstName = booking.name.split(/\s+/)[0]

  return (
    <div className="booking-confirmation" aria-labelledby="booking-confirmation-heading">
      <svg className="booking-success-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="29" fill="currentColor" opacity="0.04" />
        <motion.circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }} />
        <motion.path d="M20 32.5 28 40 44 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : 0.2, ease: 'easeOut' }} />
      </svg>
      <h1 id="booking-confirmation-heading" ref={headingRef} tabIndex={-1}>Confirmation</h1>
      <p className="booking-confirmation-message">Demo booking confirmed, {firstName}.</p>
      <div className="booking-confirmation-meeting">
        <h2>{booking.meeting.title}</h2>
        <p>{booking.meeting.duration} minutes with {booking.meeting.host}</p>
        <p><time dateTime={booking.dateKey}>{formatBookingDate(date)}</time></p>
        <p>{booking.time} · {booking.meeting.timezone}</p>
      </div>
      <Button type="button" className="booking-new-booking" onClick={onRestart}>Make a new booking</Button>
    </div>
  )
}
