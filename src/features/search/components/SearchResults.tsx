import { ItemGroup } from '@/components/ui/Item'
import { useId, type KeyboardEventHandler, type RefObject } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import type { SearchResultGroup } from '../data/sample-results'
import { SearchFilterItem } from './SearchFilterItem'
import { SearchResultRow } from './SearchResultRow'

type SearchResultsProps = {
  hoveredId: string | null
  onHover: (id: string | null) => void
  groups: SearchResultGroup[]
  selectedId: string | null
  onSelect: (id: string) => void
  rowRefs: RefObject<Map<string, HTMLButtonElement>>
  onKeyDown: KeyboardEventHandler
}

export function SearchResults({ groups, selectedId, hoveredId, onHover, onSelect, rowRefs, onKeyDown }: SearchResultsProps) {
  const layoutId = useId()
  const highlightedId = groups.some((group) => group.items.some((item) => item.id === hoveredId)) ? hoveredId : selectedId
  const count = groups.reduce((total, group) => total + group.items.length, 0)
  return (
    <motion.div layoutScroll className="search-results" role="region" aria-label="Search results" onPointerLeave={() => onHover(null)} onKeyDown={(event) => { onHover(null); onKeyDown(event) }}>
      <LayoutGroup id={layoutId}>
        <p role="status" className="sr-only">{count ? `${count} ${count === 1 ? 'result' : 'results'} found` : 'No results found'}</p>
        <AnimatePresence initial={false} mode="popLayout">
          {!count && (
            <SearchFilterItem key="empty">
              <p className="search-results-empty" aria-hidden="true">No results found</p>
            </SearchFilterItem>
          )}
          {groups.map((group) => (
            <SearchFilterItem key={group.id}>
              <section aria-labelledby={`search-${group.id}-heading`}>
                <h2 className="search-result-group-heading" id={`search-${group.id}-heading`}>{group.title}</h2>
                <ItemGroup className="search-result-group">
                  <AnimatePresence initial={false} mode="popLayout" propagate>
                    {group.items.map((result) => (
                      <SearchFilterItem key={result.id}>
                        <SearchResultRow
                          result={result}
                          selected={selectedId === result.id}
                          highlighted={highlightedId === result.id}
                          onHover={() => onHover(result.id)}
                          onSelect={onSelect}
                          buttonRef={(node) => { if (node) rowRefs.current.set(result.id, node); else rowRefs.current.delete(result.id) }}
                        />
                      </SearchFilterItem>
                    ))}
                  </AnimatePresence>
                </ItemGroup>
              </section>
            </SearchFilterItem>
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </motion.div>
  )
}
