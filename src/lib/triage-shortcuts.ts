import type { KeyboardEvent } from 'react'

type ShortcutActions = {
  navigate: (key: string) => void
  createTeam: () => void
  favourite: () => void
  copy: () => void
  help: () => void
  escape: () => boolean
}

export function createTriageShortcutHandler(actions: ShortcutActions) {
  return function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const target = event.target as Element
    if (event.defaultPrevented || event.nativeEvent.isComposing || event.altKey || event.ctrlKey || event.metaKey ||
        !event.currentTarget.contains(target) || target.closest('[role="dialog"], input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return

    if (event.key === 'Escape') {
      if (actions.escape()) event.preventDefault()
      return
    }
    if (window.getSelection()?.isCollapsed === false) return
    const key = event.key.toLowerCase()
    if (event.shiftKey && key !== '?') return
    if (key === 'j' || key === 'k') actions.navigate(key === 'j' ? 'ArrowDown' : 'ArrowUp')
    else if (key === 'n' && !event.repeat) actions.createTeam()
    else if (key === 'f' && !event.repeat) actions.favourite()
    else if (key === 'c' && !event.repeat) actions.copy()
    else if (key === '?' && !event.repeat) actions.help()
    else return
    event.preventDefault()
  }
}
