import type { RefObject } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/Dialog'

const shortcuts = [
  ['↑ ↓', 'Navigate rows in the list; update Peek or open details.'],
  ['J K', 'Next / previous item from the list or details.'],
  ['Home End', 'First / last item while in the list.'],
  ['Enter', 'Open an item or activate the focused control.'],
  ['Esc', 'Dismiss Peek or a dialog, or return to the list.'],
  ['← →', 'Switch teams while the team tabs have focus.'],
  ['N', 'Create a team.'],
  ['F', 'Toggle the current team’s favourite.'],
  ['C', 'Copy the identifier while details are open.'],
  ['Tab ⇧Tab', 'Move forward / backward between controls.'],
  ['?', 'Show this guide.'],
]

function Keycap({ children }: { children: string }) {
  return <kbd className="rounded border border-white/12 bg-white/4 px-1.5 py-0.5 font-mono text-[11px] leading-4 text-foreground">{children}</kbd>
}

export function TriageShortcutFooter({ detailsOpen, onHelp }: { detailsOpen: boolean; onHelp: () => void }) {
  return (
    <footer className="flex min-h-10 flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/7 px-4 py-2 text-xs text-muted-foreground" aria-label="Keyboard shortcuts">
      <span className="inline-flex items-center gap-1.5"><Keycap>{detailsOpen ? 'J K' : '↑ ↓'}</Keycap>{detailsOpen ? 'Next / previous' : 'Navigate'}</span>
      <span className="hidden items-center gap-1.5 min-[440px]:inline-flex"><Keycap>{detailsOpen ? 'Esc' : '↵'}</Keycap>{detailsOpen ? 'Back' : 'Open'}</span>
      <span className="hidden items-center gap-1.5 min-[700px]:inline-flex"><Keycap>{detailsOpen ? 'C' : 'N'}</Keycap>{detailsOpen ? 'Copy ID' : 'New team'}</span>
      <button type="button" onClick={onHelp} className="ml-auto inline-flex items-center gap-1.5 rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring" aria-label="Show keyboard shortcuts" aria-keyshortcuts="Shift+/"><Keycap>?</Keycap>Shortcuts</button>
    </footer>
  )
}

export function TriageShortcutDialog({ open, onOpenChange, returnFocus }: {
  open: boolean; onOpenChange: (open: boolean) => void; returnFocus: RefObject<HTMLElement | null>
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent finalFocus={returnFocus} className="max-h-[85svh] max-w-[calc(100%-2rem)] overflow-y-auto bg-card p-5 sm:max-w-md">
        <DialogTitle>Keyboard shortcuts</DialogTitle>
        <DialogDescription>Active while focus is inside the inbox. Letter shortcuts pause in text fields and dialogs. Arrow keys scroll normally in detail text.</DialogDescription>
        <dl className="grid gap-3">
          {shortcuts.map(([keys, description]) => (
            <div key={keys} className="grid grid-cols-[5.5rem_1fr] items-start gap-3">
              <dt><Keycap>{keys}</Keycap></dt>
              <dd className="text-sm text-muted-foreground">{description}</dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  )
}
