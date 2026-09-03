import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { deleteTeam } from './actions'
import { TeamsSearchList } from './TeamsSearchList'

export const dynamic = 'force-dynamic'

export default async function AdminTeamsPage() {
  const teams = await prisma.team.findMany({
    orderBy: { createdAt: 'asc' },
    include: { _count: { select: { athletes: true } }, coaches: true },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-ink">Équipes</h1>
        <Link
          href="/admin/equipes/nouvelle"
          className="bg-ink text-white text-sm font-medium px-4 py-2 hover:bg-fire transition-colors"
        >
          + Nouvelle équipe
        </Link>
      </div>

      <TeamsSearchList
        teams={teams.map((t) => ({
          id: t.id,
          name: t.name,
          level: t.level,
          athleteCount: t._count.athletes,
          coachNames: t.coaches.map((c) => c.name),
        }))}
        deleteAction={deleteTeam}
      />
    </div>
  )
}
