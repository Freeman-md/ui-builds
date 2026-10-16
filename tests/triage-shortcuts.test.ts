import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createTriageShortcutHandler } from '../src/features/triage/triage-shortcuts.ts'

// Only the event boundary is mocked: the production shortcut handler runs intact.
function setup() {
  const calls: string[] = []
  const handler = createTriageShortcutHandler({
    navigate: (key) => calls.push(key),
    createTeam: () => calls.push('create'),
    favourite: () => calls.push('favourite'),
    copy: () => calls.push('copy'),
    help: () => calls.push('help'),
    escape: () => { calls.push('escape'); return true },
  })
  function press(key: string, overrides = {}) {
    let prevented = false
    const event = {
      key, nativeEvent: { isComposing: false },
      target: { closest: () => null },
      currentTarget: { contains: () => true },
      preventDefault: () => { prevented = true },
      ...overrides,
    }
    handler(event as Parameters<typeof handler>[0])
    return prevented
  }
  return { calls, press }
}

test('scoped shortcuts dispatch their actions, including repeated navigation', () => {
  const originalWindow = globalThis.window
  globalThis.window = { getSelection: () => ({ isCollapsed: true }) } as unknown as Window & typeof globalThis
  try {
    const { calls, press } = setup()
    for (const key of ['j', 'k', 'n', 'f', 'c', '?']) assert.equal(press(key), true)
    press('j', { repeat: true })
    assert.deepEqual(calls, ['ArrowDown', 'ArrowUp', 'create', 'favourite', 'copy', 'help', 'ArrowDown'])
  } finally { globalThis.window = originalWindow }
})

test('forms, dialogs, outside focus, modifiers, composition and handled events are untouched', () => {
  for (const overrides of [
    { target: { closest: () => ({}) } },
    { currentTarget: { contains: () => false } },
    { ctrlKey: true }, { altKey: true }, { metaKey: true },
    { nativeEvent: { isComposing: true } }, { defaultPrevented: true },
  ]) {
    const { calls, press } = setup()
    assert.equal(press('n', overrides), false)
    assert.deepEqual(calls, [])
  }
})

test('selected text, shifted letters and repeated toggles do not activate commands', () => {
  const originalWindow = globalThis.window
  globalThis.window = { getSelection: () => ({ isCollapsed: false }) } as unknown as Window & typeof globalThis
  try {
    const { calls, press } = setup()
    assert.equal(press('n'), false)
    globalThis.window = { getSelection: () => ({ isCollapsed: true }) } as unknown as Window & typeof globalThis
    assert.equal(press('F', { shiftKey: true }), false)
    for (const key of ['n', 'f', 'c', '?']) assert.equal(press(key, { repeat: true }), false)
    assert.equal(press('ArrowDown'), false)
    assert.equal(press('Tab'), false)
    assert.deepEqual(calls, [])
  } finally { globalThis.window = originalWindow }
})

test('Escape is consumed only when a layer was dismissed', () => {
  const { calls, press } = setup()
  assert.equal(press('Escape'), true)
  assert.deepEqual(calls, ['escape'])
  const handler = createTriageShortcutHandler({
    navigate() {}, createTeam() {}, favourite() {}, copy() {}, help() {}, escape: () => false,
  })
  let prevented = false
  handler({ key: 'Escape', nativeEvent: {}, target: { closest: () => null }, currentTarget: { contains: () => true }, preventDefault: () => { prevented = true } } as unknown as Parameters<typeof handler>[0])
  assert.equal(prevented, false)
})
