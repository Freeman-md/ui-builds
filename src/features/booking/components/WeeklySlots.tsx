import { AnimatePresence, motion, useIsPresent, useReducedMotion } from 'motion/react'
import { uiMotion } from '@/lib/motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BOOKING_TIMEZONE, formatBookingDate } from '../week'
import type { BookingDay } from '../data/sample-availability'

const weekdayFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', weekday: 'short' })

type WeeklySlotsProps = {
  days: BookingDay[]
  direction: -1 | 1
  selectedSlotId: string | null
  onSelectSlot: (slotId: string) => void
}

export function WeeklySlots({ days, direction, selectedSlotId, onSelectSlot }: WeeklySlotsProps) {
  return (
    <>
      <p className="booking-scroll-hint" id="booking-scroll-hint">Scroll horizontally to see all seven days.</p>
      <div className="booking-slots-scroll" role="region" aria-label="Weekly available times" aria-describedby="booking-scroll-hint" tabIndex={0}>
        <AnimatePresence initial={false} mode="wait">
          <WeekGrid key={days[0].dateKey} days={days} direction={direction} selectedSlotId={selectedSlotId} onSelectSlot={onSelectSlot} />
        </AnimatePresence>
      </div>
    </>
  )
}

function WeekGrid({ days, direction, selectedSlotId, onSelectSlot }: WeeklySlotsProps) {
  const isPresent = useIsPresent()
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="booking-slots-grid"
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      initial={{ opacity: 0, x: reducedMotion ? 0 : direction * 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : uiMotion.exitDuration } }}
      transition={{ duration: reducedMotion ? 0 : uiMotion.enterDuration, ease: uiMotion.easeOut }}
    >
      {days.map((day) => (
        <section className="booking-day" key={day.dateKey} aria-label={formatBookingDate(day.date)}>
          <h2 className="booking-day-heading">
            <time dateTime={day.dateKey}>{weekdayFormat.format(day.date)} <span>{day.date.getUTCDate()}</span></time>
          </h2>
          <div className="booking-day-slots">
            {day.slots.length === 0 ? <p className="booking-no-slots">No availability</p> : day.slots.map((slot) => (
              <Button
                key={slot.id}
                variant="outline"
                className="booking-slot"
                aria-pressed={slot.id === selectedSlotId}
                aria-label={`${formatBookingDate(day.date)} at ${slot.time}, ${BOOKING_TIMEZONE}`}
                onClick={() => onSelectSlot(slot.id)}
              >
                {slot.id === selectedSlotId ? <Check className="size-3" aria-hidden="true" /> : null}
                <span>{slot.time}</span>
              </Button>
            ))}
          </div>
        </section>
      ))}
    </motion.div>
  )
}
