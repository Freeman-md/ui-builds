import { useState } from 'react'
import { getLondonDay, shiftWeek } from '../week'
import { getWeekAvailability, type BookingDay, type BookingSlot } from '../data/sample-availability'

export type BookingDetailsValues = { name: string; email: string; note: string }
export type BookingDetailsErrors = Partial<Record<'name' | 'email', string>>

export function useBookingFlow() {
  const [weekStart, setWeekStart] = useState(getLondonDay)
  // Keep fixture availability stable during the session while forms are edited.
  const [fixtureNow] = useState(() => new Date())
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [step, setStep] = useState<'slots' | 'details'>('slots')
  const [details, setDetails] = useState<BookingDetailsValues>({ name: '', email: '', note: '' })
  const [errors, setErrors] = useState<BookingDetailsErrors>({})
  const [showConfirmationNotice, setShowConfirmationNotice] = useState(false)
  const days = getWeekAvailability(weekStart, fixtureNow)
  let selection: { day: BookingDay; slot: BookingSlot } | null = null
  for (const day of days) {
    const slot = day.slots.find((slot) => slot.id === selectedSlotId)
    if (slot) selection = { day, slot }
  }

  function selectSlot(slotId: string) {
    setSelectedSlotId(slotId)
    setShowConfirmationNotice(false)
  }

  function clearSelection() {
    setSelectedSlotId(null)
    setShowConfirmationNotice(false)
  }

  function openDetails() {
    if (!selection) return
    setErrors({})
    setShowConfirmationNotice(false)
    setStep('details')
  }

  function backToSlots() {
    setStep('slots')
    setShowConfirmationNotice(false)
  }

  function updateDetails(field: keyof BookingDetailsValues, value: string) {
    setDetails((current) => ({ ...current, [field]: value }))
    if (field !== 'note') setErrors((current) => ({ ...current, [field]: undefined }))
    setShowConfirmationNotice(false)
  }

  function submitDetails(emailIsValid: boolean): 'name' | 'email' | null {
    const nextErrors: BookingDetailsErrors = {}
    if (!details.name.trim()) nextErrors.name = 'Enter your name.'
    if (!details.email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!emailIsValid) nextErrors.email = 'Enter a valid email address.'
    setErrors(nextErrors)
    setShowConfirmationNotice(!nextErrors.name && !nextErrors.email)
    return nextErrors.name ? 'name' : nextErrors.email ? 'email' : null
  }

  function changeWeek(direction: -1 | 1) {
    setWeekStart((current) => shiftWeek(current, direction))
    clearSelection()
  }

  return {
    weekStart, changeWeek, days, selectedSlotId, selection, selectSlot, clearSelection,
    step, openDetails, backToSlots, details, errors, updateDetails, submitDetails, showConfirmationNotice,
  }
}
