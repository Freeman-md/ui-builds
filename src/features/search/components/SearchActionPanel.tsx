import { useRef, useState, type KeyboardEvent } from 'react'
import { FileText, RotateCcw, Settings, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Item, ItemGroup } from '@/components/ui/Item'
import { Kbd, KbdGroup } from '@/components/ui/Kbd'
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from '@/components/ui/Popover'

const actions = [
  { title: 'Open Command', icon: FileText, keys: ['↵'] },
  { title: 'Add to Favorites', icon: Star, keys: ['⌘', '⇧', 'F'] },
  { title: 'Reset Ranking', icon: RotateCcw, keys: ['⌘', '⌥', 'R'] },
  { title: 'Manage Extensions', icon: Settings, keys: ['⌘', '⇧', ','] },
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

  function navigateActions(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const fromInput = event.target === inputRef.current
    const nextIndex = fromInput
      ? (event.key === 'ArrowDown' ? 0 : actions.length - 1)
      : (activeIndex + (event.key === 'ArrowDown' ? 1 : -1) + actions.length) % actions.length
    setActiveIndex(nextIndex)
    rowRefs.current[nextIndex]?.focus()
  }

  function renderRows(start: number, end: number) {
    return actions.slice(start, end).map((action, offset) => {
      const index = start + offset
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
      <PopoverContent className="search-action-panel" align="end" side="top" sideOffset={16} initialFocus={inputRef} finalFocus={triggerRef} onKeyDown={navigateActions}>
        <div className="search-action-scroll">
          <PopoverTitle className="search-action-heading">{title}</PopoverTitle>
          <ItemGroup className="search-action-group">{renderRows(0, 3)}</ItemGroup>
          <h3 className="search-action-heading search-action-section">Configure Extension</h3>
          <ItemGroup className="search-action-group">{renderRows(3, 4)}</ItemGroup>
        </div>
        <Input ref={inputRef} className="search-action-input" aria-label="Search for action" placeholder="Search for action…" autoComplete="off" spellCheck={false} />
      </PopoverContent>
    </Popover>
  )
}
