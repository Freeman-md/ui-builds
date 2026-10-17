import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import './search.css'

export default function SearchPage() {
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
    </Card>
  )
}
