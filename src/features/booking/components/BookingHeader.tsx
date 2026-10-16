import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BOOKING_TIMEZONE, formatWeekRange } from '../week'

type BookingHeaderProps = {
  weekStart: Date
  onWeekChange: (direction: -1 | 1) => void
}

export function BookingHeader({ weekStart, onWeekChange }: BookingHeaderProps) {
  return (
    <header className="booking-header">
      <div className="booking-week-controls">
        <div className="booking-week-buttons" role="group" aria-label="Week navigation">
          <Button variant="outline" size="icon" aria-label="Previous week" onClick={() => onWeekChange(-1)}>
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Next week" onClick={() => onWeekChange(1)}>
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
        <p className="booking-week-range" aria-live="polite" aria-atomic="true">
          <span aria-hidden="true">{formatWeekRange(weekStart)}</span>
          <span className="sr-only">{formatWeekRange(weekStart, true)}</span>
        </p>
      </div>
      <span className="booking-timezone" aria-label={`Timezone: ${BOOKING_TIMEZONE}`}>{BOOKING_TIMEZONE}</span>
    </header>
  )
}
