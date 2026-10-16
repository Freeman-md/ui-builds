import { PopoverContent, PopoverDescription, PopoverTitle } from '@/components/ui/popover'
import type { Gig } from '@/features/triage/data/sample-gigs'

type TriagePeekProps = {
  item: Gig | undefined
  popupId: string
  descriptionId: string
  announce: boolean
}

export function TriagePeek({ item, popupId, descriptionId, announce }: TriagePeekProps) {
  return (
    <>
      <PopoverContent
        id={popupId}
        data-triage-peek=""
        initialFocus={false}
        finalFocus={false}
        side="right"
        align="start"
        sideOffset={8}
        positionerClassName="triage-peek-positioner"
        className="w-72 max-w-[calc(100vw-2rem)] gap-2 bg-card p-4 shadow-none ring-white/15 duration-150"
      >
        {item && (
          <>
            <span className="text-xs text-muted-foreground">{item.id}</span>
            <PopoverTitle className="line-clamp-2 text-sm/5">{item.title}</PopoverTitle>
            <PopoverDescription id={descriptionId} className="line-clamp-3 text-sm/6">
              {item.brief}
            </PopoverDescription>
            <span className="text-xs text-muted-foreground">{item.age}</span>
          </>
        )}
      </PopoverContent>
      <span role="status" className="sr-only">
        {announce && item ? `${item.id}. ${item.title}. ${item.brief} Received ${item.age}.` : ''}
      </span>
    </>
  )
}
