import { Button } from '@/components/ui/Button'
import { BOOKING_TIMEZONE } from '../week'
import type { BookingDay, BookingSlot } from '../data/sample-availability'

const weekdayFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', weekday: 'short' })
const fullDateFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
})

type WeeklySlotsProps = {
  days: BookingDay[]
  selectedSlotId: string | null
  onSelectSlot: (slotId: string) => void
}

export function WeeklySlots({ days, selectedSlotId, onSelectSlot }: WeeklySlotsProps) {
  let selection: { day: BookingDay; slot: BookingSlot } | undefined
  for (const day of days) {
    const slot = day.slots.find((slot) => slot.id === selectedSlotId)
    if (slot) selection = { day, slot }
  }

  return (
    <>
      <p className="booking-scroll-hint" id="booking-scroll-hint">Scroll horizontally to see all seven days.</p>
      <div className="booking-slots-scroll" role="region" aria-label="Weekly available times" aria-describedby="booking-scroll-hint" tabIndex={0}>
        <div className="booking-slots-grid">
          {days.map((day) => (
            <section className="booking-day" key={day.dateKey} aria-label={fullDateFormat.format(day.date)}>
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
                    aria-label={`${fullDateFormat.format(day.date)} at ${slot.time}, ${BOOKING_TIMEZONE}`}
                    onClick={() => onSelectSlot(slot.id)}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <p className="booking-selection" role="status" aria-atomic="true">
        {selection
          ? `Selected ${fullDateFormat.format(selection.day.date)} at ${selection.slot.time} · ${BOOKING_TIMEZONE}`
          : 'Select an available time.'}
      </p>
    </>
  )
}
