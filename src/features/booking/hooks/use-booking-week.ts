import { useState } from 'react'
import { getLondonDay, shiftWeek } from '../week'
import { getWeekAvailability } from '../data/sample-availability'

export function useBookingWeek() {
  const [weekStart, setWeekStart] = useState(getLondonDay)

  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const days = getWeekAvailability(weekStart)

  function changeWeek(direction: -1 | 1) {
    setWeekStart((current) => shiftWeek(current, direction))
    setSelectedSlotId(null)
  }

  return { weekStart, changeWeek, days, selectedSlotId, selectSlot: setSelectedSlotId }
}
