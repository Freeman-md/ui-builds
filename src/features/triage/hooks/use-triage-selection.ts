import { useRef, useState } from 'react'
import type { Gig } from '@/features/triage/data/sample-gigs'

type Selection = { teamId: string; itemId: string; open: boolean; focusDetails: boolean; direction: number }

export function useTriageSelection(teamId: string, items: Gig[]) {
  const [selection, setSelection] = useState<Selection | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const listPositionRef = useRef<{ element: HTMLElement; top: number } | null>(null)
  const pendingScrollRestore = useRef(false)
  const currentSelection = selection?.teamId === teamId ? selection : null

  function openDetails(itemId: string, trigger: HTMLButtonElement, focusDetails = true) {
    const list = trigger.closest<HTMLElement>('[role="region"]')
    listPositionRef.current = list ? { element: list, top: list.scrollTop } : null
    pendingScrollRestore.current = false
    triggerRef.current = trigger
    const previousIndex = items.findIndex((item) => item.id === currentSelection?.itemId)
    const nextIndex = items.findIndex((item) => item.id === itemId)
    const direction = currentSelection?.open ? Math.sign(nextIndex - previousIndex) : 0
    setSelection({ teamId, itemId, open: true, focusDetails, direction })
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
    focusDetails: currentSelection?.focusDetails ?? false,
    direction: currentSelection?.direction ?? 0,
    openDetails,
    closeDetails,
    restoreListPosition,
  }
}
