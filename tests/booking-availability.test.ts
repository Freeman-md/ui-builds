import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getWeekAvailability } from '../src/features/booking/data/sample-availability.ts'

const now = new Date('2026-10-16T06:00:00Z')

test('availability has seven consecutive dates across a month boundary, with unique slots', () => {
  const days = getWeekAvailability(new Date('2026-10-30T00:00:00Z'), now)
  assert.deepEqual(days.map((day) => day.dateKey), [
    '2026-10-30', '2026-10-31', '2026-11-01', '2026-11-02',
    '2026-11-03', '2026-11-04', '2026-11-05',
  ])
  const slots = days.flatMap((day) => day.slots)
  assert.equal(new Set(slots.map((slot) => slot.id)).size, slots.length)
  assert.ok(slots.every((slot) => /^\d{4}-\d{2}-\d{2}\/\d{2}:\d{2}$/.test(slot.id)))
})

test('dates own stable fixture times and weekends have no availability', () => {
  const first = getWeekAvailability(new Date('2026-10-16T00:00:00Z'), now)
  const shifted = getWeekAvailability(new Date('2026-10-19T00:00:00Z'), now)
  assert.deepEqual(first.find((day) => day.dateKey === '2026-10-19')!.slots, shifted[0].slots)
  assert.ok(first.filter((day) => [0, 6].includes(day.date.getUTCDay())).every((day) => day.slots.length === 0))
  assert.notEqual(first[0].slots.length, first[3].slots.length)
})

test('past dates and elapsed London times are never offered', () => {
  const days = getWeekAvailability(new Date('2026-10-15T00:00:00Z'), new Date('2026-10-16T10:00:00Z'))
  assert.equal(days[0].slots.length, 0)
  assert.deepEqual(days[1].slots.map((slot) => slot.time), ['13:00', '14:00'])
  const afterClose = getWeekAvailability(new Date('2026-10-16T00:00:00Z'), new Date('2026-10-16T20:00:00Z'))
  assert.equal(afterClose[0].slots.length, 0)
})
