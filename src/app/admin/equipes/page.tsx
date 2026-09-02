import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { deleteTeam } from './actions'
import { ConfirmButton } from '@/components/portal/ConfirmButton'

export const dynamic = 'force-dynamic'

export default async function AdminTeamsPage() {
  const teams = await prisma.team.findMany({
    orderBy: { createdAt: 'asc' },
    include: { _count: { select: { athletes: true } }, coaches: true },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-ink">Équipes</h1>
        <Link
          href="/admin/equipes/nouvelle"
          className="bg-ink text-white text-sm font-medium px-4 py-2 hover:bg-fire transition-colors"
        >
          + Nouvelle équipe
        </Link>
      </div>

      <div className="border border-border divide-y divide-border bg-white">
        {teams.map((team) => (
          <div key={team.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-fire font-medium mb-1">{team.level}</div>
              <div className="font-semibold text-ink">{team.name}</div>
              <div className="text-xs text-muted mt-1">
                {team._count.athletes} athlète{team._count.athletes !== 1 ? 's' : ''} ·{' '}
                {team.coaches.map((c) => c.name).join(', ') || 'Aucun coach assigné'}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/equipes/${team.id}`} className="text-sm text-ink underline underline-offset-2">
                Modifier
              </Link>
              <form
                action={async () => {
                  'use server'
                  await deleteTeam(team.id)
                }}
              >
                <ConfirmButton
                  confirmMessage={`Supprimer l'équipe ${team.name} ? Ses athlètes seront aussi supprimés.`}
                  className="text-sm text-fire"
                >
                  Supprimer
                </ConfirmButton>
              </form>
            </div>
          </div>
        ))}
        {teams.length === 0 && <p className="px-5 py-8 text-sm text-muted">Aucune équipe pour l&apos;instant.</p>}
      </div>
    </div>
  )
}
