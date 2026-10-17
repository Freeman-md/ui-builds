import { ItemGroup } from '@/components/ui/Item'
import type { KeyboardEventHandler, RefObject } from 'react'
import type { SearchResultGroup } from '../data/sample-results'
import { SearchResultRow } from './SearchResultRow'

type SearchResultsProps = {
  groups: SearchResultGroup[]
  selectedId: string | null
  onSelect: (id: string) => void
  rowRefs: RefObject<Map<string, HTMLButtonElement>>
  onKeyDown: KeyboardEventHandler
}

export function SearchResults({ groups, selectedId, onSelect, rowRefs, onKeyDown }: SearchResultsProps) {
  const count = groups.reduce((total, group) => total + group.items.length, 0)
  return (
    <div className="search-results" role="region" aria-label="Search results" onKeyDown={onKeyDown}>
      <p role="status" className={count ? 'sr-only' : 'search-results-empty'}>{count ? `${count} ${count === 1 ? 'result' : 'results'} found` : 'No results found'}</p>
      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`search-${group.id}-heading`}>
          <h2 className="search-result-group-heading" id={`search-${group.id}-heading`}>{group.title}</h2>
          <ItemGroup className="search-result-group">
            {group.items.map((result) => (
              <SearchResultRow key={result.id} result={result} selected={selectedId === result.id} onSelect={onSelect} buttonRef={(node) => { if (node) rowRefs.current.set(result.id, node); else rowRefs.current.delete(result.id) }} />
            ))}
          </ItemGroup>
        </section>
      ))}
    </div>
  )
}
