import { useState } from 'react'
import { ItemGroup } from '@/components/ui/Item'
import { sampleResultGroups } from '../data/sample-results'
import { SearchResultRow } from './SearchResultRow'

export function SearchResults() {
  const [selectedId, setSelectedId] = useState('store')

  return (
    <div className="search-results" role="region" aria-label="Search results">
      {sampleResultGroups.map((group) => (
        <section key={group.id} aria-labelledby={`search-${group.id}-heading`}>
          <h2 className="search-result-group-heading" id={`search-${group.id}-heading`}>{group.title}</h2>
          <ItemGroup className="search-result-group">
            {group.items.map((result) => (
              <SearchResultRow key={result.id} result={result} selected={selectedId === result.id} onSelect={setSelectedId} />
            ))}
          </ItemGroup>
        </section>
      ))}
    </div>
  )
}
