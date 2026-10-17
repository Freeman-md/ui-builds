import { useRef, useState, type KeyboardEvent } from 'react'
import { FileText, RotateCcw, Settings, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Item, ItemGroup } from '@/components/ui/Item'
import { Kbd, KbdGroup } from '@/components/ui/Kbd'
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from '@/components/ui/Popover'

const actions = [
  { title: 'Open Command', icon: FileText, keys: ['↵'], group: 'command' },
  { title: 'Add to Favorites', icon: Star, keys: ['⌘', '⇧', 'F'], group: 'command' },
  { title: 'Reset Ranking', icon: RotateCcw, keys: ['⌘', '⌥', 'R'], group: 'command' },
  { title: 'Manage Extensions', icon: Settings, keys: ['⌘', '⇧', ','], group: 'extension' },
]

type SearchActionPanelProps = {
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchActionPanel({ title, open, onOpenChange }: SearchActionPanelProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const matches = actions.filter((action) => action.title.toLowerCase().includes(normalizedQuery))
  const hasCommandActions = matches.some((action) => action.group === 'command')
  const hasExtensionActions = matches.some((action) => action.group === 'extension')

  function navigateActions(event: KeyboardEvent) {
    if (event.nativeEvent.isComposing || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return
    event.preventDefault()
    if (matches.length === 0) return
    const fromInput = event.target === inputRef.current
    const nextIndex = fromInput
      ? (event.key === 'ArrowDown' ? 0 : matches.length - 1)
      : (activeIndex + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length
    setActiveIndex(nextIndex)
    rowRefs.current[nextIndex]?.focus()
  }

  function renderRows(group: string) {
    return matches.map((action, index) => {
      if (action.group !== group) return null
      const Icon = action.icon
      return (
        <Item key={action.title} role="listitem" className="search-action-item">
          <button
            ref={(node) => { rowRefs.current[index] = node }}
            type="button"
            className="search-action-row"
            aria-pressed={activeIndex === index}
            title="Demo action; execution comes later"
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
            <span className="search-action-label">{action.title}</span>
            <KbdGroup aria-hidden="true">
              {action.keys.map((key) => <Kbd key={key}>{key}</Kbd>)}
            </KbdGroup>
          </button>
        </Item>
      )
    })
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger ref={triggerRef} render={<Button variant="ghost" size="sm" />} className="search-footer-action search-footer-actions" aria-label="Actions" aria-keyshortcuts="Meta+K">
        Actions
        <KbdGroup aria-hidden="true"><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
      </PopoverTrigger>
      <PopoverContent className="search-action-panel" data-filtering={normalizedQuery.length > 0} align="end" side="top" sideOffset={16} initialFocus={inputRef} finalFocus={triggerRef} onKeyDown={navigateActions}>
        <div className="search-action-scroll">
          <PopoverTitle className="search-action-heading">{title}</PopoverTitle>
          <p role="status" className={matches.length ? 'sr-only' : 'search-action-empty'}>
            {matches.length ? `${matches.length} ${matches.length === 1 ? 'action' : 'actions'} found` : 'No actions found'}
          </p>
          {hasCommandActions && <ItemGroup className="search-action-group">{renderRows('command')}</ItemGroup>}
          {hasExtensionActions && <>
            <h3 className="search-action-heading search-action-section">Configure Extension</h3>
            <ItemGroup className="search-action-group">{renderRows('extension')}</ItemGroup>
          </>}
        </div>
        <Input ref={inputRef} className="search-action-input" aria-label="Search for action" placeholder="Search for action…" value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }} autoComplete="off" spellCheck={false} />
      </PopoverContent>
    </Popover>
  )
}
