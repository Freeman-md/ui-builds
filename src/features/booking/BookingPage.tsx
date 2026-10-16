import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { BookingConfirmation } from './components/BookingConfirmation'
import { BookingDetails } from './components/BookingDetails'
import { BookingProgress } from './components/BookingProgress'
import { SelectedSlotSummary } from './components/SelectedSlotSummary'
import { BOOKING_TIMEZONE, formatBookingDate } from './week'
import { BookingHeader } from './components/BookingHeader'
import { WeeklySlots } from './components/WeeklySlots'
import { useBookingFlow } from './hooks/use-booking-flow'
import './booking.css'

export default function BookingPage() {
  const flow = useBookingFlow()
  const availabilityRef = useRef<HTMLElement>(null)
  const restoreSlotFocus = useRef(false)

  useEffect(() => {
    if (flow.step === 'slots' && restoreSlotFocus.current) {
      availabilityRef.current?.querySelector<HTMLButtonElement>('.booking-slot[aria-pressed="true"]')?.focus()
      restoreSlotFocus.current = false
    }
  }, [flow.step])

  function handleClear() {
    availabilityRef.current?.querySelector<HTMLButtonElement>('.booking-slot[aria-pressed="true"]')?.focus()
    flow.clearSelection()
  }

  function handleBack() {
    restoreSlotFocus.current = true
    flow.backToSlots()
  }

  return (
    <div className="booking-study">
      <BookingProgress step={flow.step} onBack={handleBack} isBooking={flow.isBooking} />
      <section ref={availabilityRef} className="booking-shell booking-step-shell" aria-label="Project discussion booking demo">
        {flow.step === 'confirmation' && flow.confirmedBooking ? (
          <BookingConfirmation booking={flow.confirmedBooking} />
        ) : flow.step === 'slots' ? <>
          <BookingHeader weekStart={flow.weekStart} onWeekChange={flow.changeWeek} />
          <WeeklySlots days={flow.days} selectedSlotId={flow.selectedSlotId} onSelectSlot={flow.selectSlot} />
        </> : (
          <BookingDetails values={flow.details} errors={flow.errors} onChange={flow.updateDetails} onSubmit={flow.submitDetails} isBooking={flow.isBooking} bookingError={flow.bookingError} />
        )}
      </section>
      {flow.selection ? (
        <SelectedSlotSummary day={flow.selection.day} slot={flow.selection.slot}>
          {/* Keep opening and submitting as distinct button instances. */}
          {flow.step === 'confirmation' ? <span className="booking-summary-complete">Confirmed</span> : flow.step === 'slots' ? <>
            <Button type="button" variant="ghost" onClick={handleClear}>Clear</Button>
            <Button key="open-details" type="button" onClick={flow.openDetails}>Book it</Button>
          </> : <>
            <Button type="button" variant="ghost" onClick={handleBack} disabled={flow.isBooking}>Back</Button>
            <Button key="confirm-booking" type="submit" form="booking-details-form" disabled={flow.isBooking}>{flow.isBooking ? 'Confirming…' : 'Confirm booking'}</Button>
          </>}
        </SelectedSlotSummary>
      ) : null}
      <p className="sr-only" role="status" aria-atomic="true">
        {flow.selection
          ? `Selected ${formatBookingDate(flow.selection.day.date)} at ${flow.selection.slot.time} · ${BOOKING_TIMEZONE}`
          : 'Select an available time.'}
      </p>
      <p className="booking-caption">Demo · No real appointment is created. Inspired by <a href="https://demo.cal.com/api-slots">Cal.com</a>.</p>
    </div>
  )
}
