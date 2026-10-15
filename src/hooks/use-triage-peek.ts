import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import type { Gig } from '@/data/sample-gigs'

type Preview = { itemId: string; keyboard: boolean }

export function useTriagePeek(
  items: Gig[],
  enabled: boolean,
  onSelectItem: (itemId: string, trigger: HTMLButtonElement, animate?: boolean) => void,
) {
  const instanceId = useId()
  const [preview, setPreview] = useState<Preview | null>(null)
  const [focusedId, setFocusedId] = useState(items[0]?.id ?? null)
  const rows = useRef(new Map<string, HTMLButtonElement>())
  const suppressFocusPreview = useRef(false)
  const itemId = enabled ? preview?.itemId ?? null : null

  const dismiss = useCallback(() => setPreview(null), [])

  const openDetails = useCallback((id: string, trigger: HTMLButtonElement, animate = true) => {
    dismiss()
    // Returning from full details should restore focus without reopening Peek.
    suppressFocusPreview.current = true
    onSelectItem(id, trigger, animate)
  }, [dismiss, onSelectItem])

  const navigate = useCallback((key: string, currentId: string | null) => {
    if (!items.length) return false
    const index = items.findIndex((item) => item.id === currentId)
    let nextIndex: number
    if (key === 'ArrowDown') nextIndex = Math.min(index + 1, items.length - 1)
    else if (key === 'ArrowUp') nextIndex = index < 0 ? items.length - 1 : Math.max(index - 1, 0)
    else if (key === 'Home') nextIndex = 0
    else if (key === 'End') nextIndex = items.length - 1
    else return false

    const nextId = items[nextIndex].id
    const row = rows.current.get(nextId)
    row?.focus({ preventScroll: true })
    row?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    setFocusedId(nextId)
    if (enabled) setPreview({ itemId: nextId, keyboard: true })
    return true
  }, [items, enabled])

  function onRowFocus(id: string) {
    setFocusedId(id)
    if (suppressFocusPreview.current) {
      suppressFocusPreview.current = false
      return
    }
    if (enabled) setPreview({ itemId: id, keyboard: true })
  }

  function onRowKeyDown(event: KeyboardEvent<HTMLButtonElement>, id: string) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (navigate(event.key, id)) event.preventDefault()
    else if (event.key === 'Escape' && itemId) {
      event.preventDefault()
      event.stopPropagation()
      dismiss()
    }
  }

  useEffect(() => {
    if (!itemId) return
    const activeId = itemId
    // Hover does not steal focus. Allow keyboard handoff when focus is on the
    // page itself, while leaving forms and unrelated controls alone.
    function handlePageKey(event: globalThis.KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      const target = event.target
      if (target !== document.body && !(target instanceof Element && target.closest('[data-triage-peek]'))) return
      if (navigate(event.key, activeId)) event.preventDefault()
      else if (event.key === 'Escape') {
        event.preventDefault()
        dismiss()
      } else if (event.key === 'Enter') {
        const row = rows.current.get(activeId)
        if (row) {
          event.preventDefault()
          openDetails(activeId, row, false)
        }
      }
    }
    document.addEventListener('keydown', handlePageKey)
    return () => document.removeEventListener('keydown', handlePageKey)
  }, [itemId, navigate, dismiss, openDetails])

  return {
    itemId,
    item: items.find((item) => item.id === itemId),
    keyboard: enabled && preview?.keyboard === true,
    focusedId,
    popupId: `${instanceId}-peek`,
    descriptionId: `${instanceId}-peek-description`,
    triggerId: (id: string) => `${instanceId}-peek-trigger-${id}`,
    rows,
    dismiss,
    navigate,
    openDetails,
    onRowFocus,
    onRowKeyDown,
    showFromHover: (id: string) => {
      if (enabled) setPreview({ itemId: id, keyboard: false })
    },
  }
}
