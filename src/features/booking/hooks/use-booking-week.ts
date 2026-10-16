import { useState } from 'react'
import { getLondonDay, shiftWeek } from '../week'

export function useBookingWeek() {
  const [weekStart, setWeekStart] = useState(getLondonDay)

  function changeWeek(direction: -1 | 1) {
    setWeekStart((current) => shiftWeek(current, direction))
  }

  return { weekStart, changeWeek }
}
