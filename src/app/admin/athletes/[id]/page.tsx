import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AthleteForm } from '../AthleteForm'
import { updateAthlete, deleteAthlete } from '../actions'
import { ConfirmButton } from '@/components/portal/ConfirmButton'

export const dynamic = 'force-dynamic'

export default async function EditAthletePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [athlete, teams] = await Promise.all([
    prisma.athlete.findUnique({ where: { id }, include: { teams: { select: { id: true } } } }),
    prisma.team.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])
  if (!athlete) notFound()

  return (
    <div>
      <Link href="/admin/athletes" className="text-xs text-muted underline underline-offset-2 mb-4 inline-block">
        ← Retour
      </Link>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-ink mb-8 text-center">
          {athlete.firstName} {athlete.lastName}
        </h1>
        <AthleteForm
          action={updateAthlete.bind(null, athlete.id)}
          defaultValues={athlete}
          teamOptions={teams.map((t) => ({ id: t.id, label: t.name }))}
          initialTeamIds={athlete.teams.map((t) => t.id)}
          submitLabel="Enregistrer"
          deleteSlot={
            <form
              action={async () => {
                'use server'
                await deleteAthlete(athlete.id)
              }}
            >
              <ConfirmButton
                confirmMessage={`Supprimer définitivement ${athlete.firstName} ${athlete.lastName} ?`}
                className="text-fire text-sm font-medium px-5 py-2.5 border border-fire hover:bg-fire hover:text-white transition-colors"
              >
                Supprimer
              </ConfirmButton>
            </form>
          }
        />
      </div>
    </div>
  )
}
