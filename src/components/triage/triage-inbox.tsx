import { Inbox, Star } from 'lucide-react'
import { TriagePeek } from '@/components/triage/triage-peek'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { useTriagePeek } from '@/hooks/use-triage-peek'
import { Item, ItemGroup } from '@/components/ui/item'
import { Toggle } from '@/components/ui/toggle'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Gig } from '@/data/sample-gigs'

type TriageInboxProps = {
  teamName: string
  detailPaneId: string
  items: Gig[]
  starred: boolean
  onStarredChange: (starred: boolean) => void
  selectedItemId: string | null
  onSelectItem: (itemId: string, trigger: HTMLButtonElement, animate?: boolean) => void
}

export function TriageInbox({
  teamName, detailPaneId, items, starred, onStarredChange, selectedItemId, onSelectItem,
}: TriageInboxProps) {
  const peek = useTriagePeek(items, selectedItemId === null, onSelectItem)

  return (
    <Popover
      modal={false}
      open={peek.itemId !== null}
      triggerId={peek.itemId ? peek.triggerId(peek.itemId) : null}
      onOpenChange={(open, details) => {
        // Row presses open full details, and row focus owns keyboard previews.
        if (details.reason === 'trigger-press' || details.reason === 'focus-out') {
          details.cancel()
          return
        }
        const id = details.trigger?.getAttribute('data-peek-item')
        if (open && id) peek.showFromHover(id)
        else if (!open) peek.dismiss()
      }}
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex h-11 shrink-0 items-center gap-1 border-b border-white/7 px-4">
          <Inbox className="mr-1 size-4 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-sm font-medium">Triage</h2>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  type="button"
                  pressed={starred}
                  onPressedChange={onStarredChange}
                  aria-label={`Favourite ${teamName} triage`}
                  className="size-8 min-w-8 p-0 text-muted-foreground transition-colors aria-pressed:bg-transparent aria-pressed:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />
              }
            >
              <Star className={starred ? 'size-3.5 fill-current' : 'size-3.5'} aria-hidden="true" />
            </TooltipTrigger>
            <TooltipContent>{starred ? 'Remove from favourites' : 'Add to favourites'}</TooltipContent>
          </Tooltip>
        </div>
        <div
          role="region"
          aria-label={`${teamName} triage items`}
          tabIndex={items.length ? 0 : undefined}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
            if (event.target === event.currentTarget && peek.navigate(event.key, null)) event.preventDefault()
          }}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[var(--inbox-list)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
        >
          {items.length > 0 && (
            <ItemGroup className="gap-0">
              {items.map((item) => (
                <Item
                  key={item.id}
                  role="listitem"
                  className="block rounded-none border-0 border-b border-white/5 p-0 last:border-b-0"
                >
                  <PopoverTrigger
                    id={peek.triggerId(item.id)}
                    data-peek-item={item.id}
                    ref={(element) => {
                      if (element instanceof HTMLButtonElement) peek.rows.current.set(item.id, element)
                      else peek.rows.current.delete(item.id)
                    }}
                    type="button"
                    openOnHover={selectedItemId === null}
                    delay={200}
                    closeDelay={150}
                    tabIndex={peek.focusedId === item.id ? 0 : -1}
                    onFocus={() => peek.onRowFocus(item.id)}
                    onBlur={(event) => {
                      const next = event.relatedTarget
                      if (!(next instanceof Element && next.closest('[data-peek-item], [data-triage-peek]'))) peek.dismiss()
                    }}
                    onKeyDown={(event) => peek.onRowKeyDown(event, item.id)}
                    onClick={(event) => {
                      event.preventBaseUIHandler()
                      peek.openDetails(item.id, event.currentTarget, event.detail !== 0)
                    }}
                    aria-label={`View ${item.id}: ${item.title}`}
                    aria-expanded={selectedItemId === item.id || peek.itemId === item.id}
                    aria-controls={peek.itemId === item.id ? peek.popupId : detailPaneId}
                    aria-describedby={peek.itemId === item.id ? peek.descriptionId : undefined}
                    data-peeking={peek.itemId === item.id}
                    aria-current={selectedItemId === item.id ? 'true' : undefined}
                    className="triage-row"
                  >
                    <span className="block w-full min-w-0 truncate text-sm/5 font-medium">
                      {item.title}
                    </span>
                    <span className="text-right text-xs/5 whitespace-nowrap text-muted-foreground tabular-nums">
                      {item.id}
                    </span>
                    <span className="truncate text-xs/5 text-muted-foreground">{item.source}</span>
                    <span className="text-right text-xs/5 whitespace-nowrap text-muted-foreground tabular-nums">
                      {item.age}
                    </span>
                  </PopoverTrigger>
                </Item>
              ))}
            </ItemGroup>
          )}
        </div>
      </div>
      <TriagePeek item={peek.item} popupId={peek.popupId} descriptionId={peek.descriptionId} announce={peek.keyboard} />
    </Popover>
  )
}
