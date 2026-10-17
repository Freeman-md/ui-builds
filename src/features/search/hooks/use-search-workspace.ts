import { useRef, useState, type KeyboardEvent } from 'react'
import { sampleResultGroups } from '../data/sample-results'
import { filterResults } from '../filter-results'

type SearchState = { query: string; selectedId: string | null; actionsOpen: boolean }

export function useSearchWorkspace() {
  const [state, setState] = useState<SearchState>({ query: '', selectedId: 'store', actionsOpen: false })
  const [hoveredResultId, setHoveredResultId] = useState<string | null>(null)
  const rowRefs = useRef(new Map<string, HTMLButtonElement>())
  const matches = filterResults(sampleResultGroups, state.query, state.selectedId)

  function setQuery(query: string) {
    setHoveredResultId(null)
    setState((previous) => {
      const selectedId = filterResults(sampleResultGroups, query, previous.selectedId).selectedResult?.id ?? null
      return { query, selectedId, actionsOpen: previous.actionsOpen && selectedId !== null && selectedId === previous.selectedId }
    })
  }

  function selectResult(selectedId: string) {
    setHoveredResultId(null)
    setState((previous) => ({ ...previous, selectedId, actionsOpen: previous.actionsOpen && selectedId === previous.selectedId }))
  }

  function setActionsOpen(open: boolean) {
    setState((previous) => ({ ...previous, actionsOpen: open && previous.selectedId !== null }))
  }

  function navigateResults(event: KeyboardEvent) {
    if (event.nativeEvent.isComposing || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return
    event.preventDefault()
    setHoveredResultId(null)
    if (!matches.items.length) return
    const index = matches.items.findIndex((item) => item.id === state.selectedId)
    const nextIndex = (index + (event.key === 'ArrowDown' ? 1 : -1) + matches.items.length) % matches.items.length
    const nextId = matches.items[nextIndex].id
    selectResult(nextId)
    rowRefs.current.get(nextId)?.focus()
  }


  return { ...state, ...matches, hoveredResultId, setHoveredResultId, rowRefs, setQuery, selectResult, setActionsOpen, navigateResults }
}
