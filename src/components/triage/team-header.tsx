import { useEffect, useRef } from 'react'
import { ChevronRight, CircleDashed, PanelLeft } from 'lucide-react'
import { CreateTeamDialog } from '@/components/triage/create-team-dialog'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Team } from '@/hooks/use-teams'

type TeamHeaderProps = {
  teams: Team[]
  selectedTeam: string
  onCreateTeam: (name: string) => void
}

export function TeamHeader({ teams, selectedTeam, onCreateTeam }: TeamHeaderProps) {
  const activeTabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [selectedTeam])

  return (
    <div className="flex h-10 min-w-0 items-center bg-[var(--inbox-header)]">
      <div className="flex h-full w-12 shrink-0 items-center justify-center border-b border-white/7">
        <PanelLeft className="size-4 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="inbox-team-strip h-full min-w-0 overflow-x-auto overflow-y-hidden">
        <TabsList aria-label="Teams" className="inbox-team-tabs">
          {teams.map((team) => (
            <TabsTrigger
              key={team.id}
              ref={selectedTeam === team.id ? activeTabRef : undefined}
              value={team.id}
              aria-label={`${team.name}, Triage`}
              className="inbox-team-tab"
            >
              <CircleDashed className="size-4 text-muted-foreground" aria-hidden="true" />
              <span className="min-w-0 max-w-36 truncate" title={team.name}>{team.name}</span>
              <ChevronRight className="size-3 text-muted-foreground" aria-hidden="true" />
              <span>Triage</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <div className="flex h-full flex-1 shrink-0 items-center border-b border-white/7 pr-2 pl-1">
        <CreateTeamDialog teamNames={teams.map((team) => team.name)} onCreate={onCreateTeam} />
      </div>
    </div>
  )
}
