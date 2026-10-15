import { Inbox, Star } from 'lucide-react'
import { Item, ItemGroup } from '@/components/ui/item'
import { Toggle } from '@/components/ui/toggle'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Gig } from '@/data/sample-gigs'

type TriageInboxProps = {
  teamName: string
  items: Gig[]
  starred: boolean
  onStarredChange: (starred: boolean) => void
  selectedItemId: string | null
  onSelectItem: (itemId: string, trigger: HTMLButtonElement) => void
}

export function TriageInbox({
  teamName, items, starred, onStarredChange, selectedItemId, onSelectItem,
}: TriageInboxProps) {
  return (
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
                <button
                  type="button"
                  onClick={(event) => onSelectItem(item.id, event.currentTarget)}
                  aria-label={`View ${item.id}: ${item.title}`}
                  aria-expanded={selectedItemId === item.id}
                  aria-controls="triage-details"
                  aria-current={selectedItemId === item.id ? 'true' : undefined}
                  className="triage-row"
                >
                  <span className="block w-full min-w-0 truncate text-sm/5 font-medium" title={item.title}>
                    {item.title}
                  </span>
                  <span className="text-right text-xs/5 whitespace-nowrap text-muted-foreground tabular-nums">
                    {item.id}
                  </span>
                  <span className="truncate text-xs/5 text-muted-foreground">{item.source}</span>
                  <span className="text-right text-xs/5 whitespace-nowrap text-muted-foreground tabular-nums">
                    {item.age}
                  </span>
                </button>
              </Item>
            ))}
          </ItemGroup>
        )}
      </div>
    </div>
  )
}
