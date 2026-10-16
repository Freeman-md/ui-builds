import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronRight, CircleDashed, PanelLeft } from 'lucide-react'
import { CreateTeamDialog } from '@/features/triage/components/CreateTeamDialog'
import { TabsList, TabsTrigger } from '@/components/ui/Tabs'
import type { Team } from '@/features/triage/hooks/use-teams'

type TeamHeaderProps = {
  teams: Team[]
  selectedTeam: string
  onCreateTeam: (name: string) => void
  createTeamOpen: boolean
  onCreateTeamOpenChange: (open: boolean) => void
}

export function TeamHeader({ teams, selectedTeam, onCreateTeam, createTeamOpen, onCreateTeamOpenChange }: TeamHeaderProps) {
  const activeTabRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()
  const tabTransition = { duration: reducedMotion ? 0 : 0.18, ease: [0.23, 1, 0.32, 1] as const }

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [selectedTeam])

  return (
    <div className="flex h-10 min-w-0 items-center bg-[var(--inbox-header)]">
      <div className="flex h-full w-12 shrink-0 items-center justify-center border-b border-white/7">
        <PanelLeft className="size-4 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="inbox-team-strip h-full min-w-0 overflow-x-auto overflow-y-hidden">
        <TabsList activateOnFocus aria-label="Teams" className="inbox-team-tabs">
          {teams.map((team) => (
            <TabsTrigger
              key={team.id}
              ref={selectedTeam === team.id ? activeTabRef : undefined}
              value={team.id}
              aria-label={`${team.name}, Triage`}
              className="inbox-team-tab"
              render={
                <motion.button
                  layout={reducedMotion ? false : 'position'}
                  layoutDependency={teams.length}
                  initial={reducedMotion || team.id === 'engineering' || team.id === 'design' ? false : { opacity: 0, transform: 'translateY(4px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  transition={tabTransition}
                />
              }
            >
              <CircleDashed className="size-4 text-muted-foreground" aria-hidden="true" />
              <span className="min-w-0 max-w-36 truncate" title={team.name}>{team.name}</span>
              <ChevronRight className="size-3 text-muted-foreground" aria-hidden="true" />
              <span>Triage</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <motion.div
        layout={reducedMotion ? false : 'position'}
        layoutDependency={teams.length}
        transition={tabTransition}
        className="flex h-full flex-1 shrink-0 items-center border-b border-white/7 pr-2 pl-1"
      >
        <CreateTeamDialog teamNames={teams.map((team) => team.name)} onCreate={onCreateTeam} open={createTeamOpen} onOpenChange={onCreateTeamOpenChange} />
      </motion.div>
    </div>
  )
}
