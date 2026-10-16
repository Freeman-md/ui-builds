import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { uiMotion } from '@/lib/motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BOOKING_TIMEZONE, formatWeekRange } from '../week'

type BookingHeaderProps = {
  weekStart: Date
  direction: -1 | 1
  onWeekChange: (direction: -1 | 1) => void
}

export function BookingHeader({ weekStart, direction, onWeekChange }: BookingHeaderProps) {
  const reducedMotion = useReducedMotion()

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
          <span className="booking-range-window" aria-hidden="true">
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={weekStart.toISOString()}
                initial={{ opacity: 0, x: reducedMotion ? 0 : direction * 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : uiMotion.exitDuration } }}
                transition={{ duration: reducedMotion ? 0 : uiMotion.enterDuration, ease: uiMotion.easeOut }}
              >{formatWeekRange(weekStart)}</motion.span>
            </AnimatePresence>
          </span>
          <span className="sr-only">{formatWeekRange(weekStart, true)}</span>
        </p>
      </div>
      <span className="booking-timezone" aria-label={`Timezone: ${BOOKING_TIMEZONE}`}>{BOOKING_TIMEZONE}</span>
    </header>
  )
}
