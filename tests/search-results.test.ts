import { test } from 'node:test'
import assert from 'node:assert/strict'
import { filterResults } from '../src/features/search/filter-results.ts'
import type { SearchResultGroup } from '../src/features/search/data/sample-results.ts'

const groups: SearchResultGroup[] = [
  { id: 'suggestions', title: 'Suggestions', items: [
    { id: 'store', title: 'Store', subtitle: 'Raycast', kind: 'Command', icon: '' },
    { id: 'extensions', title: 'Manage Extensions', subtitle: 'Developer', kind: 'Command', icon: '' },
  ] },
  { id: 'commands', title: 'Commands', items: [
    { id: 'notes', title: 'Search Notes', subtitle: 'Notes', kind: 'Command', icon: '' },
    { id: 'code', title: 'Visual Studio Code', kind: 'Application', icon: '' },
  ] },
]

test('main search matches titles and sources, normalizes queries, and hides empty groups', () => {
  const sourceMatch = filterResults(groups, '  DEVELOPER  ', 'store')
  assert.deepEqual(sourceMatch.groups.map((group) => group.id), ['suggestions'])
  assert.deepEqual(sourceMatch.items.map((item) => item.id), ['extensions'])
  assert.equal(sourceMatch.selectedResult?.id, 'extensions')
  assert.deepEqual(filterResults(groups, 'notes', 'store').items.map((item) => item.id), ['notes'])
  assert.deepEqual(filterResults(groups, 'studio', 'store').items.map((item) => item.id), ['code'])
  assert.equal(groups[0].items.length, 2)
})

test('selection stays on a matching result and otherwise moves to the first match', () => {
  assert.equal(filterResults(groups, '', 'notes').selectedResult?.id, 'notes')
  assert.equal(filterResults(groups, 'raycast', 'store').selectedResult?.id, 'store')
  assert.equal(filterResults(groups, 'search', 'store').selectedResult?.id, 'notes')
})

test('no matches clears selection; clearing restores results and a valid selection', () => {
  const empty = filterResults(groups, 'unavailable', 'store')
  assert.deepEqual(empty.groups, [])
  assert.deepEqual(empty.items, [])
  assert.equal(empty.selectedResult, null)
  const restored = filterResults(groups, '   ', null)
  assert.equal(restored.items.length, 4)
  assert.equal(restored.selectedResult?.id, 'store')
})
