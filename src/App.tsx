import { TeamHeader } from '@/components/triage/team-header'
import { TriageInbox } from '@/components/triage/triage-inbox'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { sampleGigs } from '@/data/sample-gigs'
import { useTeams } from '@/hooks/use-teams'

function App() {
  const { teams, selectedTeam, selectTeam, createTeam, setTeamStarred } = useTeams()

  return (
    <TooltipProvider delay={300}>
      <main className="grid min-h-svh place-items-center p-6 sm:p-10" aria-label="Triage inbox">
        <Card className="@container w-full min-w-0 max-w-[480px] gap-0 rounded-xl py-0 shadow-none ring-white/10">
          <Tabs
            value={selectedTeam}
            onValueChange={(value) => {
              if (typeof value === 'string') selectTeam(value)
            }}
            className="min-w-0 gap-0"
          >
            <TeamHeader teams={teams} selectedTeam={selectedTeam} onCreateTeam={createTeam} />
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
                  onStarredChange={(starred) => setTeamStarred(team.id, starred)}
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
