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
      />
      <SearchResults selectedId={workspace.selectedId} onSelect={workspace.setSelectedId} />
      <SearchFooter title={workspace.selectedResult.title} actionsOpen={workspace.actionsOpen} onActionsOpenChange={workspace.setActionsOpen} />
    </Card>
  )
}
