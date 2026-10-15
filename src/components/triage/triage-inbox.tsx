import { Inbox, Star } from 'lucide-react'
import { Item, ItemGroup, ItemTitle } from '@/components/ui/item'
import { Toggle } from '@/components/ui/toggle'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Gig } from '@/data/sample-gigs'

type TriageInboxProps = {
  teamName: string
  items: Gig[]
  starred: boolean
  onStarredChange: (starred: boolean) => void
}

export function TriageInbox({ teamName, items, starred, onStarredChange }: TriageInboxProps) {
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
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 rounded-none border-0 border-b border-white/5 px-4 py-2.5 last:border-b-0"
              >
                <ItemTitle className="block w-full min-w-0 truncate text-sm/5" title={item.title}>
                  {item.title}
                </ItemTitle>
                <span className="text-right text-xs/5 whitespace-nowrap text-muted-foreground tabular-nums">
                  {item.id}
                </span>
                <span className="truncate text-xs/5 text-muted-foreground">{item.source}</span>
                <span className="text-right text-xs/5 whitespace-nowrap text-muted-foreground tabular-nums">
                  {item.age}
                </span>
              </Item>
            ))}
          </ItemGroup>
        )}
      </div>
    </div>
  )
}
