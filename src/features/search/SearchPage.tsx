import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { SearchResults } from './components/SearchResults'
import { SearchFooter } from './components/SearchFooter'
import { useSearchWorkspace } from './hooks/use-search-workspace'
import './search.css'

export default function SearchPage() {
  const workspace = useSearchWorkspace()
  return (
    <Card className="search-shell" role="region" aria-label="Raycast-inspired search study">
      <Input
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
      <SearchResults hoveredId={workspace.hoveredResultId} onHover={workspace.setHoveredResultId} groups={workspace.groups} selectedId={workspace.selectedId} onSelect={workspace.selectResult} rowRefs={workspace.rowRefs} onKeyDown={workspace.navigateResults} />
      <SearchFooter title={workspace.selectedResult?.title ?? null} actionsOpen={workspace.actionsOpen} onActionsOpenChange={workspace.setActionsOpen} />
    </Card>
  )
}
