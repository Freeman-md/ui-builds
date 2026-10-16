export const BOOKING_TIMEZONE = 'Europe/London'

// These Dates represent calendar days, not appointment instants. UTC arithmetic
// keeps seven-day navigation stable when London's clocks change.
export function getLondonDay(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: BOOKING_TIMEZONE, year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(now)
  const value = (type: string) => Number(parts.find((part) => part.type === type)!.value)
  return new Date(Date.UTC(value('year'), value('month') - 1, value('day')))
}

export function shiftWeek(start: Date, direction: -1 | 1) {
  const next = new Date(start)
  next.setUTCDate(next.getUTCDate() + direction * 7)
  return next
}

export function formatWeekRange(start: Date, includeYear = false) {
  const end = new Date(start)
  end.setUTCDate(end.getUTCDate() + 6)
  const showYear = includeYear || start.getUTCFullYear() !== end.getUTCFullYear()
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC', day: 'numeric', month: 'short',
    ...(showYear ? { year: 'numeric' } : {}),
  })
  return `${formatter.format(start)} – ${formatter.format(end)}`
}

export function formatBookingDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(date)
}
