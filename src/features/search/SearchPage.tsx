import { AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Kbd, KbdGroup } from '@/components/ui/Kbd'
import { SearchResults } from './components/SearchResults'
import { SearchFooter } from './components/SearchFooter'
import { SearchSurface } from './components/SearchSurface'
import { useSearchWorkspace } from './hooks/use-search-workspace'
import { useSearchLauncher } from './hooks/use-search-launcher'
import './search.css'

export default function SearchPage() {
  const workspace = useSearchWorkspace()
  const { launcherRef, inputRef, ...launcher } = useSearchLauncher({
    actionsOpen: workspace.actionsOpen,
    canOpenActions: workspace.selectedResult !== null,
    onActionsOpenChange: workspace.setActionsOpen,
  })

  return (
    <div className="search-study">
      {!launcher.mobile && (
        <Button
          ref={launcherRef}
          className="search-launcher"
          variant="outline"
          onClick={launcher.openSearch}
          aria-expanded={launcher.visible}
          aria-controls="study-search-panel"
          aria-keyshortcuts={launcher.isMac ? 'Meta+K' : 'Control+K'}
          hidden={!launcher.showLauncher}
        >
          Open search
          <KbdGroup aria-hidden="true"><Kbd>{launcher.modifier}</Kbd><Kbd>K</Kbd></KbdGroup>
        </Button>
      )}
      <AnimatePresence initial={false} onExitComplete={() => { if (!launcher.visible && !launcher.mobile) launcher.finishClose() }}>
        {launcher.visible && (
          <SearchSurface key="search" onEntered={() => { if (!launcher.mobile && !workspace.actionsOpen && !document.activeElement?.closest('#study-search-panel')) inputRef.current?.focus({ preventScroll: true }) }}>
            <Card className="search-shell" id="study-search-panel" role="region" aria-label="Raycast-inspired search study">
              <div className="search-input-header">
                <Input
                  ref={inputRef}
                  className="search-input"
                  id="study-search"
                  name="search"
                  type="text"
                  aria-label="Search for apps and commands"
                  placeholder="Search for apps and commands…"
                  autoComplete="off"
                  spellCheck={false}
                  value={workspace.query}
                  onChange={(event) => workspace.setQuery(event.target.value)}
                  onKeyDown={workspace.navigateResults}
                />
                {!launcher.mobile && <Button className="search-dismiss" variant="ghost" size="sm" aria-label="Close search" aria-keyshortcuts="Escape" onClick={launcher.closeSearch}><Kbd>Esc</Kbd></Button>}
              </div>
              <SearchResults hoveredId={workspace.hoveredResultId} onHover={workspace.setHoveredResultId} groups={workspace.groups} selectedId={workspace.selectedId} onSelect={workspace.selectResult} rowRefs={workspace.rowRefs} onKeyDown={workspace.navigateResults} />
              <SearchFooter modifier={launcher.modifier} title={workspace.selectedResult?.title ?? null} actionsOpen={workspace.actionsOpen} onActionsOpenChange={workspace.setActionsOpen} />
            </Card>
          </SearchSurface>
        )}
      </AnimatePresence>
    </div>
  )
}
