import { CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { BookingDay, BookingSlot } from '../data/sample-availability'
import { BOOKING_TIMEZONE, formatBookingDate } from '../week'

type SelectedSlotSummaryProps = {
  day: BookingDay
  slot: BookingSlot
  onClear: () => void
  onBook: () => void
  showBookingNotice: boolean
}

export function SelectedSlotSummary({ day, slot, onClear, onBook, showBookingNotice }: SelectedSlotSummaryProps) {
  return (
    <section className="booking-summary" aria-label="Selected slot summary">
      <div className="booking-summary-details">
        <span className="booking-summary-icon" aria-hidden="true"><CalendarDays className="size-4" /></span>
        <div className="booking-summary-text">
          <h2><time dateTime={day.dateKey}>{formatBookingDate(day.date)}</time></h2>
          <p>{slot.time} <span>· {BOOKING_TIMEZONE}</span></p>
        </div>
      </div>
      <div className="booking-summary-actions">
        <Button variant="ghost" onClick={onClear}>Clear</Button>
        <Button onClick={onBook}>Book it</Button>
      </div>
      {showBookingNotice ? (
        <p className="booking-summary-notice" role="status">Demo only. Booking details are coming next; no appointment has been created.</p>
      ) : null}
    </section>
  )
}
