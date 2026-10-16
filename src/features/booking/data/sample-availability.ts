import { BOOKING_TIMEZONE, getLondonDay } from '../week.ts'

export type BookingSlot = { id: string; time: string }
export type BookingDay = { date: Date; dateKey: string; slots: BookingSlot[] }

// Fictional 30-minute appointments, expressed as London wall times for this study.
// Dates, rather than column positions, own their availability across navigation.
const weeklySchedule: Record<number, readonly string[]> = {
  1: ['09:00', '10:00', '11:30', '13:00', '14:30', '16:00'],
  2: ['09:30', '10:30', '13:30', '15:00'],
  3: ['10:00', '11:00', '12:30', '14:00', '15:30'],
  4: ['09:00', '10:30', '11:30', '14:30', '16:00'],
  5: ['09:30', '11:00', '13:00', '14:00'],
}

export function getWeekAvailability(start: Date, now = new Date()): BookingDay[] {
  const todayKey = getLondonDay(now).toISOString().slice(0, 10)
  const currentTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: BOOKING_TIMEZONE, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(now)

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setUTCDate(date.getUTCDate() + index)
    const dateKey = date.toISOString().slice(0, 10)
    const times = weeklySchedule[date.getUTCDay()] ?? []
    const slots = times
      .filter((time) => dateKey > todayKey || (dateKey === todayKey && time > currentTime))
      .map((time) => ({ id: `${dateKey}/${time}`, time }))

    return { date, dateKey, slots }
  })
}
