import { useRef, useState, type KeyboardEvent } from 'react'
import { TeamHeader } from '@/features/triage/components/team-header'
import { TriageDetails, type TriageDetailsHandle } from '@/features/triage/components/triage-details'
import { TriageInbox, type TriageInboxHandle } from '@/features/triage/components/triage-inbox'
import { TriageShortcutDialog, TriageShortcutFooter } from '@/features/triage/components/triage-shortcuts'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { getTeamGigs } from '@/features/triage/data/sample-gigs'
import { useTeams } from '@/features/triage/hooks/use-teams'
import { useTriageSelection } from '@/features/triage/hooks/use-triage-selection'
import { createTriageShortcutHandler } from '@/features/triage/triage-shortcuts'

export function TriageWorkspace() {
  const { teams, selectedTeam, selectTeam, createTeam, setTeamStarred } = useTeams()
  const items = getTeamGigs(selectedTeam)
  const { itemId, isOpen, direction, focusDetails, openDetails, closeDetails, restoreListPosition } = useTriageSelection(selectedTeam, items)
  const selectedItem = items.find((item) => item.id === itemId)
  const inboxRef = useRef<TriageInboxHandle>(null)
  const detailRef = useRef<TriageDetailsHandle>(null)
  const helpReturnRef = useRef<HTMLElement | null>(null)
  const [createTeamOpen, setCreateTeamOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const team = teams.find((team) => team.id === selectedTeam)!

  function showHelp() {
    helpReturnRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    inboxRef.current?.dismissPeek()
    setHelpOpen(true)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    createTriageShortcutHandler({
      navigate: (key) => {
        const detailPane = document.activeElement?.closest('.triage-detail-pane')
        // Keep focus in the stable scroll area while its item body is replaced.
        detailPane?.querySelector<HTMLElement>('[data-detail-scroll]')?.focus({ preventScroll: true })
        const focusList = !isOpen || !!document.activeElement?.closest('.triage-list-pane')
        inboxRef.current?.navigate(key, focusList)
      },
      createTeam: () => {
        inboxRef.current?.dismissPeek()
        setCreateTeamOpen(true)
      },
      favourite: () => setTeamStarred(team.id, !team.starred),
      copy: () => { if (isOpen) void detailRef.current?.copyIdentifier() },
      help: showHelp,
      escape: () => {
        if (inboxRef.current?.dismissPeek()) return true
        if (!isOpen) return false
        closeDetails()
        return true
      },
    })(event)
  }

  function handleTeamChange(value: string | number | null) {
    if (typeof value !== 'string' || value === selectedTeam) return
    closeDetails(false)
    selectTeam(value)
  }

  function handleCreateTeam(name: string) {
    closeDetails(false)
    createTeam(name)
  }

  return (
    <Card
      data-expanded={isOpen}
      className="triage-shell @container min-w-0 gap-0 rounded-xl py-0 shadow-none ring-white/10"
      onKeyDown={handleKeyDown}
    >
      <Tabs value={selectedTeam} onValueChange={handleTeamChange} className="min-w-0 gap-0">
        <TeamHeader teams={teams} selectedTeam={selectedTeam} onCreateTeam={handleCreateTeam} createTeamOpen={createTeamOpen} onCreateTeamOpenChange={setCreateTeamOpen} />
        <div className="triage-panels">
          {teams.map((team) => (
            <TabsContent
              key={team.id}
              value={team.id}
              aria-hidden={team.id !== selectedTeam || undefined}
              onTransitionEnd={(event) => {
                if (event.target === event.currentTarget && event.propertyName === 'height') restoreListPosition()
              }}
              className="triage-panel m-0 flex-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring"
            >
              <div className="triage-workspace" data-open={isOpen}>
                <div className="triage-list-pane">
                  <TriageInbox
                    ref={team.id === selectedTeam ? inboxRef : undefined}
                    teamName={team.name}
                    detailPaneId={`${team.id}-triage-details`}
                    items={getTeamGigs(team.id)}
                    starred={team.starred}
                    selectedItemId={isOpen ? itemId : null}
                    onSelectItem={openDetails}
                    onStarredChange={(starred) => setTeamStarred(team.id, starred)}
                  />
                </div>
                <div id={`${team.id}-triage-details`} className="triage-detail-pane" aria-hidden={!isOpen} inert={!isOpen}>
                  {selectedItem && team.id === selectedTeam && (
                    <TriageDetails ref={detailRef} item={selectedItem} open={isOpen} direction={direction} focusDetails={focusDetails} onClose={() => closeDetails()} />
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <TriageShortcutFooter detailsOpen={isOpen} onHelp={showHelp} />
      <TriageShortcutDialog open={helpOpen} onOpenChange={setHelpOpen} returnFocus={helpReturnRef} />
      <span role="status" className="sr-only">
        {isOpen && selectedItem ? `${selectedItem.id}. ${selectedItem.title}. Item ${items.indexOf(selectedItem) + 1} of ${items.length}.` : ''}
      </span>
    </Card>
  )
}
