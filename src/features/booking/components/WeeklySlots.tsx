import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BOOKING_TIMEZONE, formatBookingDate } from '../week'
import type { BookingDay } from '../data/sample-availability'

const weekdayFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', weekday: 'short' })

type WeeklySlotsProps = {
  days: BookingDay[]
  selectedSlotId: string | null
  onSelectSlot: (slotId: string) => void
}

export function WeeklySlots({ days, selectedSlotId, onSelectSlot }: WeeklySlotsProps) {
  return (
    <>
      <p className="booking-scroll-hint" id="booking-scroll-hint">Scroll horizontally to see all seven days.</p>
      <div className="booking-slots-scroll" role="region" aria-label="Weekly available times" aria-describedby="booking-scroll-hint" tabIndex={0}>
        <div className="booking-slots-grid">
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
        </div>
      </div>
    </>
  )
}
