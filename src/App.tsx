import { useEffect, useRef, useState } from 'react'
import { ChevronRight, CircleDashed, PanelLeft } from 'lucide-react'
import { CreateTeamDialog } from '@/components/triage/create-team-dialog'
import { TriageInbox } from '@/components/triage/triage-inbox'
import { sampleGigs } from '@/data/sample-gigs'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'

type Team = { id: string; name: string; starred: boolean }

function App() {
  const [teams, setTeams] = useState<Team[]>([{ id: 'engineering', name: 'Engineering', starred: false }])
  const [selectedTeam, setSelectedTeam] = useState('engineering')
  const activeTabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [selectedTeam])

  function createTeam(name: string) {
    const team = { id: crypto.randomUUID(), name, starred: false }
    setTeams((currentTeams) => [...currentTeams, team])
    setSelectedTeam(team.id)
  }

  return (
    <TooltipProvider delay={300}>
      <main className="grid min-h-svh place-items-center p-6 sm:p-10" aria-label="Triage inbox">
        <Card className="@container w-full min-w-0 max-w-[480px] gap-0 rounded-xl py-0 shadow-none ring-white/10">
          <Tabs
            value={selectedTeam}
            onValueChange={(value) => {
              if (typeof value === 'string') setSelectedTeam(value)
            }}
            className="min-w-0 gap-0"
          >
            <div className="flex h-10 min-w-0 items-center bg-[var(--inbox-header)]">
              <div className="flex h-full w-12 shrink-0 items-center justify-center border-b border-white/7">
                <PanelLeft className="size-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <div className="inbox-team-strip h-full min-w-0 overflow-x-auto">
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
                <CreateTeamDialog teamNames={teams.map((team) => team.name)} onCreate={createTeam} />
              </div>
            </div>
            {teams.map((team) => (
              <TabsContent
                key={team.id}
                value={team.id}
                className="m-0 h-[280px] flex-none rounded-b-xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring sm:h-[320px]"
              >
                <TriageInbox
                  teamName={team.name}
                  items={team.id === 'engineering' ? sampleGigs : []}
                  starred={team.starred}
                  onStarredChange={(starred) => {
                    setTeams((currentTeams) => currentTeams.map((currentTeam) => (
                      currentTeam.id === team.id ? { ...currentTeam, starred } : currentTeam
                    )))
                  }}
                />
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </main>
    </TooltipProvider>
  )
}

export default App
