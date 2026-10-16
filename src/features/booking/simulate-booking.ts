import { BOOKING_TIMEZONE } from './week.ts'

export const PROJECT_MEETING = {
  title: 'Project discussion', host: 'Freeman', duration: 30, timezone: BOOKING_TIMEZONE,
} as const

export type DemoBookingRequest = {
  dateKey: string
  time: string
  name: string
  email: string
  note: string
}
export type DemoBooking = DemoBookingRequest & { meeting: typeof PROJECT_MEETING }

// Local simulation only: no network, email, storage, or calendar side effects.
export function simulateBooking(request: DemoBookingRequest, signal: AbortSignal): Promise<DemoBooking> {
  if (signal.aborted) return Promise.reject(new DOMException('Booking cancelled.', 'AbortError'))
  if (!request.name.trim() || !request.email.trim() || !request.dateKey || !request.time) {
    return Promise.reject(new Error('A selected time and contact details are required.'))
  }
  const booking: DemoBooking = { ...request, name: request.name.trim(), email: request.email.trim(), meeting: PROJECT_MEETING }

  return new Promise((resolve, reject) => {
    const cancel = () => {
      clearTimeout(timer)
      reject(new DOMException('Booking cancelled.', 'AbortError'))
    }
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', cancel)
      resolve(booking)
    }, 700)
    signal.addEventListener('abort', cancel, { once: true })
  })
}
