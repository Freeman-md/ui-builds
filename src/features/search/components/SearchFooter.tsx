import { Button } from '@/components/ui/Button'
import { Kbd } from '@/components/ui/Kbd'
import { SearchActionPanel } from './SearchActionPanel'
import footerMark from '../assets/footer-mark.svg'

export function SearchFooter({ title, actionsOpen, onActionsOpenChange }: { title: string | null; actionsOpen: boolean; onActionsOpenChange: (open: boolean) => void }) {
  return (
    <footer className="search-footer" aria-label="Search actions">
      <img className="search-footer-mark" src={footerMark} alt="" width={18} height={18} />
      <Button className="search-footer-action search-footer-open" variant="ghost" size="sm" disabled title="Command execution comes later">
        Open Command <Kbd aria-label="Return">↵</Kbd>
      </Button>
      <span className="search-footer-divider" aria-hidden="true" />
      <SearchActionPanel key={title ?? 'no-selection'} title={title ?? 'Actions'} disabled={title === null} open={actionsOpen} onOpenChange={onActionsOpenChange} />
    </footer>
  )
}
