import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function CoachHomeworksPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const teams = await prisma.team.findMany({
    where: session.user.role === 'ADMIN' ? {} : { coaches: { some: { id: session.user.id } } },
    orderBy: { name: 'asc' },
    include: { _count: { select: { athletes: true } } },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-2">Homeworks</h1>
      <p className="text-sm text-muted mb-8">Choisis une équipe pour gérer ses devoirs de la semaine.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/coach/homeworks/${team.id}`}
            className="border border-border bg-white p-5 hover:border-ink transition-colors"
          >
            <div className="text-xs font-medium uppercase tracking-wider text-fire mb-1">{team.level}</div>
            <div className="font-semibold text-ink">{team.name}</div>
            <div className="text-xs text-muted mt-1">
              {team._count.athletes} athlète{team._count.athletes !== 1 ? 's' : ''}
            </div>
          </Link>
        ))}
        {teams.length === 0 && <p className="text-sm text-muted">Aucune équipe ne t&apos;est assignée pour l&apos;instant.</p>}
      </div>
    </div>
  )
}
