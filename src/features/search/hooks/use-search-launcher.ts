import { useEffect, useRef, useState } from 'react'
import { getSearchShortcut } from '../search-shortcuts'

type SearchLauncherOptions = {
  actionsOpen: boolean
  canOpenActions: boolean
  onActionsOpenChange: (open: boolean) => void
}

export function useSearchLauncher({ actionsOpen, canOpenActions, onActionsOpenChange }: SearchLauncherOptions) {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 639px)').matches)
  const [desktopState, setDesktopState] = useState<'closed' | 'open' | 'closing'>('closed')
  const [isMac] = useState(() => /Mac|iPhone|iPad/.test(navigator.platform))
  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const visible = mobile || desktopState === 'open'

  function closeSearch() {
    onActionsOpenChange(false)
    setDesktopState('closing')
  }

  function finishClose() {
    setDesktopState('closed')
    requestAnimationFrame(() => launcherRef.current?.focus())
  }

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)')
    function onChange() {
      setMobile(media.matches)
      setDesktopState('closed')
      onActionsOpenChange(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [onActionsOpenChange])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const shortcut = getSearchShortcut(event, { isMac, mobile, visible, actionsOpen })
      if (!shortcut) return
      event.preventDefault()
      if (shortcut === 'toggle-search') {
        onActionsOpenChange(false)
        setDesktopState(desktopState === 'open' ? 'closing' : 'open')
      } else if (shortcut === 'toggle-actions') {
        if (canOpenActions) onActionsOpenChange(!actionsOpen)
      } else {
        setDesktopState('closing')
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [actionsOpen, canOpenActions, desktopState, isMac, mobile, onActionsOpenChange, visible])

  return { visible, showLauncher: !visible && desktopState !== 'closing', finishClose, mobile, isMac, modifier: isMac ? '⌘' : 'Ctrl', launcherRef, inputRef, closeSearch, openSearch: () => setDesktopState('open') }
}
