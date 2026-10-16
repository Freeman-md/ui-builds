import { test } from 'node:test'
import assert from 'node:assert/strict'
import { simulateBooking } from '../src/features/booking/simulate-booking.ts'

const request = {
  dateKey: '2026-10-19', time: '09:00', name: ' Demo visitor ',
  email: 'visitor@example.com', note: 'A project discussion.',
}

test('booking resolves only after the simulated operation finishes, using a request snapshot', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  const input = { ...request }
  let settled = false
  const pending = simulateBooking(input, new AbortController().signal).then((booking) => {
    settled = true
    return booking
  })
  input.time = '14:00'
  t.mock.timers.tick(699)
  await Promise.resolve()
  assert.equal(settled, false)
  t.mock.timers.tick(1)
  const booking = await pending
  assert.equal(settled, true)
  assert.equal(booking.time, '09:00')
  assert.equal(booking.name, 'Demo visitor')
  assert.deepEqual(booking.meeting, { title: 'Project discussion', host: 'Freeman', duration: 30, timezone: 'Europe/London' })
})

test('missing booking data rejects instead of returning confirmation', async () => {
  await assert.rejects(simulateBooking({ ...request, name: ' ' }, new AbortController().signal), /required/)
})

test('cancelling an in-flight booking rejects and never resolves as success', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  const controller = new AbortController()
  const pending = simulateBooking(request, controller.signal)
  const rejected = assert.rejects(pending, { name: 'AbortError' })
  controller.abort()
  t.mock.timers.tick(700)
  await rejected
})

test('an already cancelled request does not start a booking', async () => {
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(simulateBooking(request, controller.signal), { name: 'AbortError' })
})
