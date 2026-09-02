import { notFound } from 'next/navigation'
import { Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { TeamForm } from '../TeamForm'
import { updateTeam, addAthlete, removeAthlete, setTeamCoaches } from '../actions'
import { ConfirmButton } from '@/components/portal/ConfirmButton'

export const dynamic = 'force-dynamic'

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const team = await prisma.team.findUnique({
    where: { id },
    include: { athletes: { orderBy: { lastName: 'asc' } }, coaches: true },
  })
  if (!team) notFound()

  const allCoaches = await prisma.user.findMany({ where: { role: Role.COACH }, orderBy: { name: 'asc' } })
  const coachIds = new Set(team.coaches.map((c) => c.id))

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-ink mb-2">{team.name}</h1>
      <p className="text-xs text-muted mb-8">/equipes/{team.slug}</p>

      <TeamForm action={updateTeam.bind(null, team.id)} defaultValues={team} submitLabel="Enregistrer" />

      <div className="mt-12 border-t border-border pt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-lg font-semibold text-ink mb-4">Coachs de l&apos;équipe</h2>
          <form
            action={async (formData: FormData) => {
              'use server'
              const ids = formData.getAll('coachIds') as string[]
              await setTeamCoaches(team.id, ids)
            }}
            className="flex flex-col gap-2"
          >
            {allCoaches.map((coach) => (
              <label key={coach.id} className="flex items-center gap-2 text-sm text-ink">
                <input type="checkbox" name="coachIds" value={coach.id} defaultChecked={coachIds.has(coach.id)} />
                {coach.name} <span className="text-muted">(@{coach.username})</span>
              </label>
            ))}
            {allCoaches.length === 0 && (
              <p className="text-sm text-muted">Aucun compte coach créé pour l&apos;instant.</p>
            )}
            <button
              type="submit"
              className="self-start mt-2 border border-ink text-ink text-sm font-medium px-4 py-2 hover:bg-ink hover:text-white transition-colors"
            >
              Mettre à jour
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-4">Athlètes ({team.athletes.length})</h2>
          <div className="border border-border divide-y divide-border bg-white mb-4">
            {team.athletes.map((athlete) => (
              <div key={athlete.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span>
                  {athlete.firstName} {athlete.lastName}
                  {athlete.position && <span className="text-muted"> — {athlete.position}</span>}
                </span>
                <form
                  action={async () => {
                    'use server'
                    await removeAthlete(athlete.id, team.id)
                  }}
                >
                  <ConfirmButton
                    confirmMessage={`Retirer ${athlete.firstName} ${athlete.lastName} de l'équipe ?`}
                    className="text-fire text-xs"
                  >
                    Retirer
                  </ConfirmButton>
                </form>
              </div>
            ))}
            {team.athletes.length === 0 && (
              <p className="px-4 py-6 text-sm text-muted">Aucun athlète pour l&apos;instant.</p>
            )}
          </div>

          <form
            action={async (formData: FormData) => {
              'use server'
              await addAthlete(team.id, formData)
            }}
            className="flex flex-wrap items-end gap-3"
          >
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-1.5">Prénom</label>
              <input name="firstName" required className="border border-border px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-1.5">Nom</label>
              <input name="lastName" required className="border border-border px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-1.5">Rôle (optionnel)</label>
              <input name="position" placeholder="Flyer, Base…" className="border border-border px-3 py-2 text-sm" />
            </div>
            <button
              type="submit"
              className="border border-ink text-ink text-sm font-medium px-4 py-2 hover:bg-ink hover:text-white transition-colors"
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
