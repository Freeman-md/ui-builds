import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { uiMotion } from '@/lib/motion'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { SearchFilterItem } from './SearchFilterItem'
import { usePanelContentHeight } from '../hooks/use-panel-content-height'
import { SearchRowHighlight } from './SearchRowHighlight'
import { FileText, RotateCcw, Settings, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Item, ItemGroup } from '@/components/ui/Item'
import { Kbd, KbdGroup } from '@/components/ui/Kbd'
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from '@/components/ui/Popover'

const panelMotionStyle = {
  '--action-enter-duration': `${uiMotion.enterDuration}s`,
  '--action-exit-duration': `${uiMotion.enterDuration}s`,
  '--action-ease': `cubic-bezier(${uiMotion.easeOut.join(',')})`,
} as CSSProperties

const actions = [
  { title: 'Open Command', icon: FileText, keys: ['↵'], group: 'command' },
  { title: 'Add to Favorites', icon: Star, keys: ['⌘', '⇧', 'F'], group: 'command' },
  { title: 'Reset Ranking', icon: RotateCcw, keys: ['⌘', '⌥', 'R'], group: 'command' },
  { title: 'Manage Extensions', icon: Settings, keys: ['⌘', '⇧', ','], group: 'extension' },
]

type SearchActionPanelProps = {
  title: string
  modifier: string
  disabled?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchActionPanel({ title, modifier, disabled = false, open, onOpenChange }: SearchActionPanelProps) {
  const layoutId = useId()
  const reducedMotion = useReducedMotion()
  const { contentRef, height } = usePanelContentHeight()
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const rowRefs = useRef(new Map<string, HTMLButtonElement>())
  const [activeIndex, setActiveIndex] = useState(0)
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const matches = actions.filter((action) => action.title.toLowerCase().includes(normalizedQuery))
  const hoveredIndex = matches.findIndex((action) => action.title === hoveredTitle)
  const highlightedIndex = hoveredIndex >= 0 ? hoveredIndex : activeIndex
  const hasCommandActions = matches.some((action) => action.group === 'command')
  const hasExtensionActions = matches.some((action) => action.group === 'extension')

  function navigateActions(event: KeyboardEvent) {
    if (event.nativeEvent.isComposing || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return
    event.preventDefault()
    setHoveredTitle(null)
    if (matches.length === 0) return
    const fromInput = event.target === inputRef.current
    const nextIndex = fromInput
      ? (event.key === 'ArrowDown' ? 0 : matches.length - 1)
      : (activeIndex + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length
    setActiveIndex(nextIndex)
    rowRefs.current.get(matches[nextIndex].title)?.focus()
  }

  function renderRows(group: string) {
    return matches.map((action, index) => {
      if (action.group !== group) return null
      const Icon = action.icon
      return (
        <SearchFilterItem key={action.title}>
          <Item role="listitem" className="search-action-item">
          <button
            ref={(node) => { if (node) rowRefs.current.set(action.title, node); else rowRefs.current.delete(action.title) }}
            type="button"
            className="search-action-row"
            aria-pressed={activeIndex === index}
            data-highlighted={highlightedIndex === index}
            onPointerMove={(event) => { if (event.pointerType === 'mouse') setHoveredTitle(action.title) }}
            title="Demo action; execution comes later"
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            {highlightedIndex === index && <SearchRowHighlight />}
            <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
            <span className="search-action-label">{action.title}</span>
            <KbdGroup aria-hidden="true">
              {action.keys.map((key) => <Kbd key={key}>{key}</Kbd>)}
            </KbdGroup>
          </button>
          </Item>
        </SearchFilterItem>
      )
    })
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger disabled={disabled} ref={triggerRef} render={<Button variant="ghost" size="sm" />} className="search-footer-action search-footer-actions" aria-label="Actions" aria-keyshortcuts={modifier === '⌘' ? 'Meta+Enter' : 'Control+Enter'}>
        Actions
        <KbdGroup aria-hidden="true"><Kbd>{modifier}</Kbd><Kbd>↵</Kbd></KbdGroup>
      </PopoverTrigger>
      <PopoverContent style={panelMotionStyle} inert={!open} className="search-action-panel" align="end" side="top" sideOffset={16} initialFocus={inputRef} finalFocus={triggerRef} onKeyDown={navigateActions}>
        <motion.div
          className="search-action-size"
          initial={false}
          animate={{ height: height ?? 'auto' }}
          transition={{ duration: reducedMotion ? 0 : uiMotion.enterDuration, delay: reducedMotion ? 0 : uiMotion.exitDuration, ease: uiMotion.easeOut }}
        >
          <motion.div layoutScroll className="search-action-scroll" onPointerLeave={() => setHoveredTitle(null)}>
            <div ref={contentRef} className="search-action-measure">
              <LayoutGroup id={layoutId}>
                <PopoverTitle className="search-action-heading">{title}</PopoverTitle>
                <p role="status" className="sr-only">
                  {matches.length ? `${matches.length} ${matches.length === 1 ? 'action' : 'actions'} found` : 'No actions found'}
                </p>
                <AnimatePresence initial={false} mode="popLayout">
                  {!matches.length && (
                    <SearchFilterItem key="empty">
                      <p className="search-action-empty" aria-hidden="true">No actions found</p>
                    </SearchFilterItem>
                  )}
                  {hasCommandActions && (
                    <SearchFilterItem key="commands">
                      <ItemGroup className="search-action-group">
                        <AnimatePresence initial={false} mode="popLayout" propagate>{renderRows('command')}</AnimatePresence>
                      </ItemGroup>
                    </SearchFilterItem>
                  )}
                  {hasExtensionActions && (
                    <SearchFilterItem key="extension">
                      <h3 className="search-action-heading search-action-section">Configure Extension</h3>
                      <ItemGroup className="search-action-group">
                        <AnimatePresence initial={false} mode="popLayout" propagate>{renderRows('extension')}</AnimatePresence>
                      </ItemGroup>
                    </SearchFilterItem>
                  )}
                </AnimatePresence>
              </LayoutGroup>
            </div>
          </motion.div>
        </motion.div>
        <Input ref={inputRef} className="search-action-input" aria-label="Search for action" placeholder="Search for action…" value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); setHoveredTitle(null) }} autoComplete="off" spellCheck={false} />
      </PopoverContent>
    </Popover>
  )
}
