import { useRef } from 'react'
import { SelectedSlotSummary } from './components/SelectedSlotSummary'
import { BOOKING_TIMEZONE, formatBookingDate } from './week'
import { BookingHeader } from './components/BookingHeader'
import { WeeklySlots } from './components/WeeklySlots'
import { useBookingWeek } from './hooks/use-booking-week'
import './booking.css'

export default function BookingPage() {
  const { weekStart, changeWeek, days, selectedSlotId, selection, selectSlot, clearSelection, showBookingNotice, previewBooking } = useBookingWeek()

  const availabilityRef = useRef<HTMLElement>(null)

  function handleClear() {
    availabilityRef.current?.querySelector<HTMLButtonElement>('.booking-slot[aria-pressed="true"]')?.focus()
    clearSelection()
  }

  return (
    <div className="booking-study">
      <section ref={availabilityRef} className="booking-shell" aria-label="Project discussion booking demo">
        <BookingHeader weekStart={weekStart} onWeekChange={changeWeek} />
        <WeeklySlots days={days} selectedSlotId={selectedSlotId} onSelectSlot={selectSlot} />
      </section>
      {selection ? (
        <SelectedSlotSummary
          day={selection.day}
          slot={selection.slot}
          onClear={handleClear}
          onBook={previewBooking}
          showBookingNotice={showBookingNotice}
        />
      ) : null}
      <p className="sr-only" role="status" aria-atomic="true">
        {selection
          ? `Selected ${formatBookingDate(selection.day.date)} at ${selection.slot.time} · ${BOOKING_TIMEZONE}`
          : 'Select an available time.'}
      </p>
      <p className="booking-caption">Demo · No real appointment is created. Inspired by <a href="https://demo.cal.com/api-slots">Cal.com</a>.</p>
    </div>
  )
}
