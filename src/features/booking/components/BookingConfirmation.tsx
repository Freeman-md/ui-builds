import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { uiMotion } from '@/lib/motion'
import type { DemoBooking } from '../simulate-booking'
import { formatBookingDate } from '../week'

type BookingConfirmationProps = { booking: DemoBooking; onRestart: () => void }
const characterInterval = 0.018
const immediate = { duration: 0, delay: 0 }

function flipAt(delay: number, rise = 0): Variants {
  const settled = { opacity: 1, rotateX: 0, y: 0 }
  return {
    hidden: { opacity: 0, rotateX: -75, y: rise },
    visible: { ...settled, transition: { delay, duration: uiMotion.enterDuration, ease: uiMotion.easeOut } },
    instant: { ...settled, transition: immediate },
  }
}

function TypedText({ text, delay }: { text: string; delay: number }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((character, index) => (
          <motion.span key={index} variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0, delay: delay + index * characterInterval } },
            instant: { opacity: 1, transition: immediate },
          }}>{character}</motion.span>
        ))}
      </span>
    </>
  )
}

export function BookingConfirmation({ booking, onRestart }: BookingConfirmationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const reduceMotion = useReducedMotion()
  const [skipSequence, setSkipSequence] = useState(false)
  useEffect(() => { headingRef.current?.focus({ preventScroll: true }) }, [])
  const date = new Date(`${booking.dateKey}T00:00:00Z`)
  const firstName = booking.name.split(/\s+/)[0]
  const duration = `${booking.meeting.duration} minutes with ${booking.meeting.host}`
  const dateLabel = formatBookingDate(date)
  // Each reveal follows the preceding animation; text length sets typing time.
  const headingAt = uiMotion.enterDuration + 0.5
  const messageAt = headingAt + uiMotion.enterDuration
  const titleAt = messageAt + uiMotion.enterDuration
  const durationAt = titleAt + uiMotion.enterDuration
  const dateAt = durationAt + duration.length * characterInterval
  const timeAt = dateAt + dateLabel.length * characterInterval
  const buttonAt = timeAt + uiMotion.enterDuration

  return (
    <motion.div className="booking-confirmation" aria-labelledby="booking-confirmation-heading"
      initial={reduceMotion ? false : 'hidden'} animate={reduceMotion || skipSequence ? 'instant' : 'visible'}>
      <svg className="booking-success-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="29" fill="currentColor" opacity="0.04" />
        <motion.circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1, transition: { delay: uiMotion.enterDuration, duration: 0.35, ease: uiMotion.easeOut } },
          instant: { pathLength: 1, transition: immediate },
        }} />
        <motion.path d="M20 32.5 28 40 44 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1, transition: { delay: uiMotion.enterDuration + 0.2, duration: uiMotion.travelDuration, ease: uiMotion.easeOut } },
          instant: { pathLength: 1, transition: immediate },
        }} />
      </svg>
      <motion.h1 id="booking-confirmation-heading" ref={headingRef} tabIndex={-1} variants={flipAt(headingAt)}>Confirmation</motion.h1>
      <motion.p className="booking-confirmation-message" variants={flipAt(messageAt, 6)}>Demo booking confirmed, {firstName}.</motion.p>
      <div className="booking-confirmation-meeting">
        <motion.h2 variants={flipAt(titleAt)}>{booking.meeting.title}</motion.h2>
        <p><TypedText text={duration} delay={durationAt} /></p>
        <p><time dateTime={booking.dateKey}><TypedText text={dateLabel} delay={dateAt} /></time></p>
        <motion.p variants={flipAt(timeAt)}>{booking.time} · {booking.meeting.timezone}</motion.p>
      </div>
      <motion.div variants={flipAt(buttonAt)}>
        <Button type="button" className="booking-new-booking" onFocus={() => setSkipSequence(true)} onClick={onRestart}>Make a new booking</Button>
      </motion.div>
    </motion.div>
  )
}
