import { BookingHeader } from './components/BookingHeader'
import { WeeklySlots } from './components/WeeklySlots'
import { useBookingWeek } from './hooks/use-booking-week'
import './booking.css'

export default function BookingPage() {
  const { weekStart, changeWeek, days, selectedSlotId, selectSlot } = useBookingWeek()

  return (
    <div className="booking-study">
      <section className="booking-shell" aria-label="Project discussion booking demo">
        <BookingHeader weekStart={weekStart} onWeekChange={changeWeek} />
        <WeeklySlots days={days} selectedSlotId={selectedSlotId} onSelectSlot={selectSlot} />
      </section>
      <p className="booking-caption">Demo · No real appointment is created. Inspired by <a href="https://demo.cal.com/api-slots">Cal.com</a>.</p>
    </div>
  )
}
