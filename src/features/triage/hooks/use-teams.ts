import { useState } from 'react'

export type Team = {
  id: string
  name: string
  starred: boolean
}

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([
    { id: 'engineering', name: 'Engineering', starred: false },
    { id: 'design', name: 'Design', starred: false },
  ])
  const [selectedTeam, selectTeam] = useState('engineering')

  function createTeam(name: string) {
    const team = { id: crypto.randomUUID(), name, starred: false }
    setTeams((currentTeams) => [...currentTeams, team])
    selectTeam(team.id)
  }

  function setTeamStarred(teamId: string, starred: boolean) {
    setTeams((currentTeams) => currentTeams.map((team) => (
      team.id === teamId ? { ...team, starred } : team
    )))
  }

  return { teams, selectedTeam, selectTeam, createTeam, setTeamStarred }
}
