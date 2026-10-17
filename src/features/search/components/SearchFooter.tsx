import { Button } from '@/components/ui/Button'
import { Kbd, KbdGroup } from '@/components/ui/Kbd'
import footerMark from '../assets/footer-mark.svg'

export function SearchFooter() {
  return (
    <footer className="search-footer" aria-label="Search actions">
      <img className="search-footer-mark" src={footerMark} alt="" width={18} height={18} />
      {/* These reference controls stay disabled until command execution and the panel are implemented. */}
      <Button className="search-footer-action search-footer-open" variant="ghost" size="sm" disabled title="Command execution comes later">
        Open Command <Kbd aria-label="Return">↵</Kbd>
      </Button>
      <span className="search-footer-divider" aria-hidden="true" />
      <Button className="search-footer-action search-footer-actions" variant="ghost" size="sm" disabled title="Action Panel comes later">
        Actions
        <KbdGroup aria-label="Command K">
          <Kbd>⌘</Kbd><Kbd>K</Kbd>
        </KbdGroup>
      </Button>
    </footer>
  )
}
