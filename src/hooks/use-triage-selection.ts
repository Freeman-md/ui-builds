import { useRef, useState } from 'react'

type Selection = { teamId: string; itemId: string; open: boolean }

export function useTriageSelection(teamId: string) {
  const [selection, setSelection] = useState<Selection | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const currentSelection = selection?.teamId === teamId ? selection : null

  function openDetails(itemId: string, trigger: HTMLButtonElement) {
    triggerRef.current = trigger
    setSelection({ teamId, itemId, open: true })
  }

  function closeDetails(restoreFocus = true) {
    // Retain the item while its pane completes the closing transition.
    setSelection((current) => current ? { ...current, open: false } : current)
    if (restoreFocus) {
      const trigger = triggerRef.current
      requestAnimationFrame(() => trigger?.focus({ preventScroll: true }))
    }
  }

  return {
    itemId: currentSelection?.itemId ?? null,
    isOpen: currentSelection?.open ?? false,
    openDetails,
    closeDetails,
  }
}
