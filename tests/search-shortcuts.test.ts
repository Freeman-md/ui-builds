import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getSearchShortcut } from '../src/features/search/search-shortcuts.ts'

const desktop = { isMac: true, mobile: false, visible: false, actionsOpen: false }

test('launcher uses Command on Mac and Control on Windows/Linux', () => {
  assert.equal(getSearchShortcut({ key: 'k', metaKey: true }, desktop), 'toggle-search')
  assert.equal(getSearchShortcut({ key: 'k', ctrlKey: true }, desktop), null)
  assert.equal(getSearchShortcut({ key: 'k', ctrlKey: true }, { ...desktop, isMac: false }), 'toggle-search')
  assert.equal(getSearchShortcut({ key: 'k', metaKey: true }, { ...desktop, isMac: false }), null)
  assert.equal(getSearchShortcut({ key: 'k', metaKey: true }, { ...desktop, mobile: true }), null)
})

test('Actions shortcut requires visible Search; Escape gives the nested panel priority', () => {
  assert.equal(getSearchShortcut({ key: 'Enter', metaKey: true }, desktop), null)
  assert.equal(getSearchShortcut({ key: 'Enter', metaKey: true }, { ...desktop, visible: true }), 'toggle-actions')
  assert.equal(getSearchShortcut({ key: 'Escape' }, { ...desktop, visible: true, actionsOpen: true }), null)
  assert.equal(getSearchShortcut({ key: 'Escape' }, { ...desktop, visible: true }), 'close-search')
  assert.equal(getSearchShortcut({ key: 'Escape' }, { ...desktop, visible: true, mobile: true }), null)
})

test('composition, repeats, modified or already handled events do not launch anything', () => {
  for (const flag of ['defaultPrevented', 'isComposing', 'repeat', 'altKey', 'shiftKey']) {
    assert.equal(getSearchShortcut({ key: 'k', metaKey: true, [flag]: true }, desktop), null)
  }
})
