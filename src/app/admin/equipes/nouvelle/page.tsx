import { TeamForm } from '../TeamForm'
import { createTeam } from '../actions'

export default function NewTeamPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-8">Nouvelle équipe</h1>
      <TeamForm action={createTeam} submitLabel="Créer l'équipe" />
    </div>
  )
}
