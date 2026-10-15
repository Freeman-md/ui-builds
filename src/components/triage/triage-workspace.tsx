import type { KeyboardEvent } from 'react'
import { TeamHeader } from '@/components/triage/team-header'
import { TriageDetails } from '@/components/triage/triage-details'
import { TriageInbox } from '@/components/triage/triage-inbox'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { sampleGigs } from '@/data/sample-gigs'
import { useTeams } from '@/hooks/use-teams'
import { useTriageSelection } from '@/hooks/use-triage-selection'

export function TriageWorkspace() {
  const { teams, selectedTeam, selectTeam, createTeam, setTeamStarred } = useTeams()
  const { itemId, isOpen, openDetails, closeDetails } = useTriageSelection(selectedTeam)
  const selectedItem = sampleGigs.find((item) => item.id === itemId)

  function handleTeamChange(value: string | number | null) {
    if (typeof value !== 'string') return
    closeDetails(false)
    selectTeam(value)
  }

  function handleCreateTeam(name: string) {
    closeDetails(false)
    createTeam(name)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Let an open create-team dialog handle its own Escape key.
    if (event.key !== 'Escape' || !isOpen || event.defaultPrevented ||
        (event.target as Element).closest('[role="dialog"]')) return
    event.preventDefault()
    closeDetails()
  }

  return (
    <Card
      data-expanded={isOpen}
      className="triage-shell @container min-w-0 gap-0 rounded-xl py-0 shadow-none ring-white/10"
      onKeyDown={handleKeyDown}
    >
      <Tabs value={selectedTeam} onValueChange={handleTeamChange} className="min-w-0 gap-0">
        <TeamHeader teams={teams} selectedTeam={selectedTeam} onCreateTeam={handleCreateTeam} />
        {teams.map((team) => (
          <TabsContent
            key={team.id}
            value={team.id}
            className="triage-panel m-0 flex-none rounded-b-xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring"
          >
            <div className="triage-workspace" data-open={isOpen}>
              <div className="triage-list-pane">
                <TriageInbox
                  teamName={team.name}
                  items={team.id === 'engineering' ? sampleGigs : []}
                  starred={team.starred}
                  selectedItemId={isOpen ? itemId : null}
                  onSelectItem={openDetails}
                  onStarredChange={(starred) => setTeamStarred(team.id, starred)}
                />
              </div>
              <div id="triage-details" className="triage-detail-pane" aria-hidden={!isOpen} inert={!isOpen}>
                {selectedItem && (
                  <TriageDetails key={selectedItem.id} item={selectedItem} open={isOpen} onClose={() => closeDetails()} />
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  )
}
