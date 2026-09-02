import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { computeAthletePercent } from '@/lib/homeworkStats'

export const dynamic = 'force-dynamic'

export default async function CoachDashboard() {
  const session = await auth()
  if (!session) redirect('/login')

  const teamFilter = session.user.role === 'ADMIN' ? {} : { coaches: { some: { id: session.user.id } } }

  const teams = await prisma.team.findMany({
    where: teamFilter,
    orderBy: { name: 'asc' },
    include: {
      athletes: true,
      homeworkWeeks: { include: { exercises: { include: { completions: true } } } },
    },
  })
  const news = await prisma.news.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const athleteCount = teams.reduce((n, t) => n + t.athletes.length, 0)
  const weekCount = teams.reduce((n, t) => n + t.homeworkWeeks.length, 0)

  const teamStats = teams.map((team) => {
    const pct =
      team.athletes.length > 0
        ? Math.round(
            team.athletes.reduce((sum, a) => sum + computeAthletePercent(team.homeworkWeeks, a.id), 0) / team.athletes.length
          )
        : 0
    return { ...team, pct }
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl">
        <div className="border border-border bg-white px-5 py-6">
          <div className="text-3xl font-bold text-ink mb-1">{teams.length}</div>
          <div className="text-xs uppercase tracking-wider text-muted">Équipe{teams.length !== 1 ? 's' : ''}</div>
        </div>
        <div className="border border-border bg-white px-5 py-6">
          <div className="text-3xl font-bold text-ink mb-1">{athleteCount}</div>
          <div className="text-xs uppercase tracking-wider text-muted">Athlète{athleteCount !== 1 ? 's' : ''}</div>
        </div>
        <div className="border border-border bg-white px-5 py-6">
          <div className="text-3xl font-bold text-ink mb-1">{weekCount}</div>
          <div className="text-xs uppercase tracking-wider text-muted">Semaine{weekCount !== 1 ? 's' : ''} suivies</div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-ink mb-4">Mes équipes</h2>
      <div className="border border-border bg-white divide-y divide-border mb-12 max-w-3xl">
        {teamStats.map((team) => (
          <Link
            key={team.id}
            href={`/coach/homeworks/${team.id}/global`}
            className="flex items-center justify-between px-5 py-4 hover:bg-cream transition-colors"
          >
            <div>
              <div className="font-semibold text-ink">{team.name}</div>
              <div className="text-xs text-muted">
                {team.athletes.length} athlète{team.athletes.length !== 1 ? 's' : ''} · {team.homeworkWeeks.length} semaine
                {team.homeworkWeeks.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="flex items-center gap-3 w-40">
              <div className="flex-1 h-1.5 bg-cream-2 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-fire" style={{ width: `${team.pct}%` }} />
              </div>
              <span className="font-medium text-ink w-10 text-right text-sm">{team.pct}%</span>
            </div>
          </Link>
        ))}
        {teamStats.length === 0 && <p className="px-5 py-8 text-sm text-muted">Aucune équipe ne t&apos;est assignée pour l&apos;instant.</p>}
      </div>

      <h2 className="text-lg font-semibold text-ink mb-4">Mes dernières actualités</h2>
      <div className="border border-border bg-white divide-y divide-border max-w-3xl">
        {news.map((article) => {
          const isScheduled = article.published && article.publishedAt && article.publishedAt.getTime() > Date.now()
          const statusLabel = !article.published ? 'Brouillon' : isScheduled ? 'Programmée' : 'Publié'
          const statusClass = !article.published ? 'bg-cream-2 text-muted' : isScheduled ? 'bg-gold text-white' : 'bg-fire text-white'
          return (
            <div key={article.id} className="flex items-center justify-between px-5 py-4">
              <div className="font-semibold text-ink">{article.title}</div>
              <span className={`text-xs font-medium uppercase tracking-wider px-2 py-0.5 ${statusClass}`}>{statusLabel}</span>
            </div>
          )
        })}
        {news.length === 0 && (
          <p className="px-5 py-8 text-sm text-muted">
            Aucune actualité pour l&apos;instant —{' '}
            <Link href="/coach/actualites/nouvelle" className="text-ink underline underline-offset-2">
              en créer une
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  )
}
