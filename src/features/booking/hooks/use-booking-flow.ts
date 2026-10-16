import { useEffect, useRef, useState } from 'react'
import { simulateBooking, type DemoBooking } from '../simulate-booking'
import { getLondonDay, shiftWeek } from '../week'
import { getWeekAvailability, type BookingDay, type BookingSlot } from '../data/sample-availability'

export type BookingDetailsValues = { name: string; email: string; note: string }
export type BookingDetailsErrors = Partial<Record<'name' | 'email', string>>

export function useBookingFlow() {
  const [weekStart, setWeekStart] = useState(getLondonDay)
  // Keep fixture availability stable during the session while forms are edited.
  const [fixtureNow] = useState(() => new Date())
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [step, setStep] = useState<'slots' | 'details' | 'confirmation'>('slots')
  const [details, setDetails] = useState<BookingDetailsValues>({ name: '', email: '', note: '' })
  const [errors, setErrors] = useState<BookingDetailsErrors>({})
  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [confirmedBooking, setConfirmedBooking] = useState<DemoBooking | null>(null)
  const pendingRequest = useRef<AbortController | null>(null)

  useEffect(() => () => pendingRequest.current?.abort(), [])
  const days = getWeekAvailability(weekStart, fixtureNow)
  let selection: { day: BookingDay; slot: BookingSlot } | null = null
  for (const day of days) {
    const slot = day.slots.find((slot) => slot.id === selectedSlotId)
    if (slot) selection = { day, slot }
  }

  function selectSlot(slotId: string) {
    setSelectedSlotId(slotId)
    setBookingError(null)
  }

  function clearSelection() {
    setSelectedSlotId(null)
    setBookingError(null)
  }

  function openDetails() {
    if (!selection) return
    setErrors({})
    setBookingError(null)
    setStep('details')
  }

  function backToSlots() {
    if (pendingRequest.current) return
    setStep('slots')
    setBookingError(null)
  }

  function updateDetails(field: keyof BookingDetailsValues, value: string) {
    setDetails((current) => ({ ...current, [field]: value }))
    if (field !== 'note') setErrors((current) => ({ ...current, [field]: undefined }))
    setBookingError(null)
  }

  function submitDetails(emailIsValid: boolean): 'name' | 'email' | null {
    if (step !== 'details' || pendingRequest.current || !selection) return null
    const nextErrors: BookingDetailsErrors = {}
    if (!details.name.trim()) nextErrors.name = 'Enter your name.'
    if (!details.email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!emailIsValid) nextErrors.email = 'Enter a valid email address.'
    setErrors(nextErrors)
    if (nextErrors.name) return 'name'
    if (nextErrors.email) return 'email'

    const controller = new AbortController()
    pendingRequest.current = controller
    setBookingError(null)
    setIsBooking(true)
    void simulateBooking({
      dateKey: selection.day.dateKey, time: selection.slot.time, ...details,
    }, controller.signal).then((booking) => {
      if (controller.signal.aborted) return
      setConfirmedBooking(booking)
      setStep('confirmation')
    }).catch(() => {
      if (!controller.signal.aborted) setBookingError('The demo booking could not be confirmed. Your details are saved here; try again.')
    }).finally(() => {
      if (pendingRequest.current === controller) {
        pendingRequest.current = null
        if (!controller.signal.aborted) setIsBooking(false)
      }
    })
    return null
  }

  function changeWeek(direction: -1 | 1) {
    setWeekStart((current) => shiftWeek(current, direction))
    clearSelection()
  }

  return {
    weekStart, changeWeek, days, selectedSlotId, selection, selectSlot, clearSelection,
    step, openDetails, backToSlots, details, errors, updateDetails, submitDetails, isBooking, bookingError, confirmedBooking,
  }
}
