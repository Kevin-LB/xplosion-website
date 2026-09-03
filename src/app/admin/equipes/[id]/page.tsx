import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { TeamForm } from '../TeamForm'
import { updateTeam, createAthleteForTeam, attachExistingAthlete, detachAthlete } from '../actions'
import { ConfirmButton } from '@/components/portal/ConfirmButton'
import { AthleteSearchPicker } from '@/components/portal/AthleteSearchPicker'

export const dynamic = 'force-dynamic'

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const team = await prisma.team.findUnique({
    where: { id },
    include: { athletes: { orderBy: { lastName: 'asc' } }, coaches: true },
  })
  if (!team) notFound()

  const [allCoaches, otherAthletes] = await Promise.all([
    prisma.user.findMany({ where: { role: Role.COACH }, orderBy: { name: 'asc' } }),
    prisma.athlete.findMany({
      where: { teams: { none: { id: team.id } } },
      orderBy: { lastName: 'asc' },
    }),
  ])

  const attachAction = attachExistingAthlete.bind(null, team.id)

  return (
    <div className="max-w-6xl">
      <Link href="/admin/equipes" className="text-xs text-muted underline underline-offset-2 mb-4 inline-block">
        ← Retour
      </Link>
      <h1 className="text-2xl font-bold text-ink mb-2">{team.name}</h1>
      <p className="text-xs text-muted mb-8">/equipes/{team.slug}</p>

      <TeamForm
        action={updateTeam.bind(null, team.id)}
        defaultValues={team}
        coachOptions={allCoaches.map((c) => ({ id: c.id, label: c.name }))}
        initialCoachIds={team.coaches.map((c) => c.id)}
        submitLabel="Enregistrer"
      />

      <div className="mt-12 border-t border-border pt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-lg font-semibold text-ink mb-4">Athlètes ({team.athletes.length})</h2>
          <div className="border border-border divide-y divide-border bg-white">
            {team.athletes.map((athlete) => (
              <div key={athlete.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <Link href={`/admin/athletes/${athlete.id}`} className="hover:underline underline-offset-2">
                  {athlete.firstName} {athlete.lastName}
                  {athlete.position && <span className="text-muted"> — {athlete.position}</span>}
                </Link>
                <form
                  action={async () => {
                    'use server'
                    await detachAthlete(athlete.id, team.id)
                  }}
                >
                  <ConfirmButton
                    confirmMessage={`Retirer ${athlete.firstName} ${athlete.lastName} de cette équipe ?`}
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
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-semibold text-ink mb-4">Ajouter un athlète existant</h2>
            <AthleteSearchPicker
              athletes={otherAthletes.map((a) => ({ id: a.id, label: `${a.firstName} ${a.lastName}` }))}
              attachAction={attachAction}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink mb-4">Ou créer un nouvel athlète</h2>
            <form
              action={async (formData: FormData) => {
                'use server'
                await createAthleteForTeam(team.id, formData)
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
                <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-1.5">Rôle</label>
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
    </div>
  )
}
