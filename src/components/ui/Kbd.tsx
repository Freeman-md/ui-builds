import type { ComponentProps } from 'react'
import { cn } from 'cn'

function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
  return <kbd data-slot="kbd" className={cn('inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-sm bg-muted px-1 font-sans text-xs text-muted-foreground', className)} {...props} />
}

function KbdGroup({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot="kbd-group" className={cn('inline-flex items-center gap-1', className)} {...props} />
}

export { Kbd, KbdGroup }
