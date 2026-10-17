type ShortcutEvent = {
  key: string
  metaKey?: boolean
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
  repeat?: boolean
  isComposing?: boolean
  defaultPrevented?: boolean
}

type ShortcutContext = { isMac: boolean; mobile: boolean; visible: boolean; actionsOpen: boolean }

export function getSearchShortcut(event: ShortcutEvent, context: ShortcutContext) {
  if (event.defaultPrevented || event.isComposing || event.repeat || event.altKey || event.shiftKey) return null
  const primary = context.isMac ? event.metaKey && !event.ctrlKey : event.ctrlKey && !event.metaKey
  if (primary && event.key.toLowerCase() === 'k' && !context.mobile) return 'toggle-search'
  if (primary && event.key === 'Enter' && context.visible) return 'toggle-actions'
  if (event.key === 'Escape' && !event.metaKey && !event.ctrlKey && !context.mobile && context.visible && !context.actionsOpen) return 'close-search'
  return null
}
