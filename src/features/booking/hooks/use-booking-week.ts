import { useState } from 'react'
import { getLondonDay, shiftWeek } from '../week'
import { getWeekAvailability, type BookingDay, type BookingSlot } from '../data/sample-availability'

export function useBookingWeek() {
  const [weekStart, setWeekStart] = useState(getLondonDay)

  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [showBookingNotice, setShowBookingNotice] = useState(false)
  const days = getWeekAvailability(weekStart)
  let selection: { day: BookingDay; slot: BookingSlot } | null = null
  for (const day of days) {
    const slot = day.slots.find((slot) => slot.id === selectedSlotId)
    if (slot) selection = { day, slot }
  }

  function selectSlot(slotId: string) {
    setSelectedSlotId(slotId)
    setShowBookingNotice(false)
  }

  function clearSelection() {
    setSelectedSlotId(null)
    setShowBookingNotice(false)
  }

  function previewBooking() {
    if (selection) setShowBookingNotice(true)
  }

  function changeWeek(direction: -1 | 1) {
    setWeekStart((current) => shiftWeek(current, direction))
    clearSelection()
  }

  return { weekStart, changeWeek, days, selectedSlotId, selection, selectSlot, clearSelection, showBookingNotice, previewBooking }
}
