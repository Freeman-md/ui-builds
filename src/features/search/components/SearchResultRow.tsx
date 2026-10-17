import { Item, ItemActions, ItemContent, ItemMedia } from '@/components/ui/Item'
import type { SearchResult } from '../data/sample-results'

type SearchResultRowProps = {
  result: SearchResult
  selected: boolean
  onSelect: (id: string) => void
}

export function SearchResultRow({ result, selected, onSelect }: SearchResultRowProps) {
  return (
    <Item role="listitem" className="search-result-item">
      <button type="button" className="search-result-row" aria-pressed={selected} onClick={() => onSelect(result.id)}>
        <ItemMedia className="search-result-icon">
          <img src={result.icon} alt="" width={20} height={20} />
        </ItemMedia>
        <ItemContent className="search-result-content">
          <span className="search-result-title">{result.title}</span>
          {result.subtitle && <span className="search-result-subtitle">{result.subtitle}</span>}
        </ItemContent>
        <ItemActions className="search-result-kind">{result.kind}</ItemActions>
      </button>
    </Item>
  )
}
