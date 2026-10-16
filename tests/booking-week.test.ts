import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatWeekRange, getLondonDay, shiftWeek } from '../src/features/booking/week.ts'

test('initial date follows London, including its summer offset', () => {
  assert.equal(getLondonDay(new Date('2026-06-01T23:30:00Z')).toISOString(), '2026-06-02T00:00:00.000Z')
  assert.equal(getLondonDay(new Date('2026-12-01T23:30:00Z')).toISOString(), '2026-12-01T00:00:00.000Z')
})

test('week navigation stays reversible across month, year, leap day and DST boundaries', () => {
  for (const date of ['2026-12-28', '2028-02-25', '2026-03-27', '2026-10-23']) {
    const start = new Date(`${date}T00:00:00Z`)
    const next = shiftWeek(start, 1)
    assert.equal(next.getTime() - start.getTime(), 7 * 86400000)
    assert.equal(shiftWeek(next, -1).getTime(), start.getTime())
    assert.equal(start.toISOString(), `${date}T00:00:00.000Z`)
  }
})

test('range includes seven dates and disambiguates a year crossing', () => {
  assert.equal(formatWeekRange(new Date('2026-10-16T00:00:00Z')), '16 Oct – 22 Oct')
  assert.equal(formatWeekRange(new Date('2026-12-28T00:00:00Z')), '28 Dec 2026 – 3 Jan 2027')
  assert.equal(formatWeekRange(new Date('2026-10-16T00:00:00Z'), true), '16 Oct 2026 – 22 Oct 2026')
})
