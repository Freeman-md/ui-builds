import { useEffect, useState } from 'react'
import { sampleResultGroups } from '../data/sample-results'

export function useSearchWorkspace() {
  const [selectedId, setSelectedId] = useState('store')
  const [actionsOpen, setActionsOpen] = useState(false)
  const selectedResult = sampleResultGroups.flatMap((group) => group.items).find((item) => item.id === selectedId)!

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.isComposing || event.repeat || !event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || event.key.toLowerCase() !== 'k') return
      event.preventDefault()
      setActionsOpen((open) => !open)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return { selectedId, setSelectedId, selectedResult, actionsOpen, setActionsOpen }
}
