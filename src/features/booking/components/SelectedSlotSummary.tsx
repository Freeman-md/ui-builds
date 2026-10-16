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
  return (
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
  )
}
