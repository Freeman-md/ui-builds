import type { Ref } from 'react'
import { Item, ItemActions, ItemContent, ItemMedia } from '@/components/ui/Item'
import { SearchRowHighlight } from './SearchRowHighlight'
import type { SearchResult } from '../data/sample-results'

type SearchResultRowProps = {
  result: SearchResult
  selected: boolean
  highlighted: boolean
  onHover: () => void
  onSelect: (id: string) => void
  buttonRef: Ref<HTMLButtonElement>
}

export function SearchResultRow({ result, selected, highlighted, onHover, onSelect, buttonRef }: SearchResultRowProps) {
  return (
    <Item role="listitem" className="search-result-item">
      <button ref={buttonRef} type="button" className="search-result-row" aria-pressed={selected} data-highlighted={highlighted} onPointerMove={(event) => { if (event.pointerType === 'mouse') onHover() }} onClick={() => onSelect(result.id)}>
        {highlighted && <SearchRowHighlight />}
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
