import { useRef, useState } from 'react'

type Selection = { teamId: string; itemId: string; open: boolean; animate: boolean }

export function useTriageSelection(teamId: string) {
  const [selection, setSelection] = useState<Selection | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const listPositionRef = useRef<{ element: HTMLElement; top: number } | null>(null)
  const pendingScrollRestore = useRef(false)
  const currentSelection = selection?.teamId === teamId ? selection : null

  function openDetails(itemId: string, trigger: HTMLButtonElement, animate = true) {
    const list = trigger.closest<HTMLElement>('[role="region"]')
    listPositionRef.current = list ? { element: list, top: list.scrollTop } : null
    pendingScrollRestore.current = false
    triggerRef.current = trigger
    setSelection({ teamId, itemId, open: true, animate })
  }

  function restoreListPosition() {
    const position = listPositionRef.current
    if (!pendingScrollRestore.current || !position?.element.isConnected) return
    position.element.scrollTop = position.top
    // During height collapse the viewport may still be too tall for this offset.
    // Retry at transition end; with reduced motion the first attempt succeeds.
    if (position.element.scrollTop === position.top) pendingScrollRestore.current = false
  }

  function closeDetails(restoreFocus = true) {
    // Retain the item while its pane completes the closing transition.
    setSelection((current) => current ? { ...current, open: false } : current)
    pendingScrollRestore.current = restoreFocus
    if (restoreFocus) {
      const trigger = triggerRef.current
      requestAnimationFrame(() => {
        trigger?.focus({ preventScroll: true })
        restoreListPosition()
      })
    }
  }

  return {
    itemId: currentSelection?.itemId ?? null,
    isOpen: currentSelection?.open ?? false,
    animateSelection: currentSelection?.animate ?? false,
    openDetails,
    closeDetails,
    restoreListPosition,
  }
}
