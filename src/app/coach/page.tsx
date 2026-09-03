import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { computeAthletePercent } from '@/lib/homeworkStats'
import { HomeworksTable } from './HomeworksTable'

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
      homeworkWeeks: { orderBy: { weekStart: 'desc' }, include: { exercises: { include: { completions: true } } } },
    },
  })
  const news = await prisma.news.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const athleteCount = teams.reduce((n, t) => n + t.athletes.length, 0)
  const weekCount = teams.reduce((n, t) => n + t.homeworkWeeks.length, 0)

  // Une ligne par athlète et par équipe suivie — le % global porte sur
  // toutes les semaines confondues, le % semaine seulement sur la plus
  // récente (homeworkWeeks triées par weekStart desc).
  const homeworkRows = teams.flatMap((team) => {
    const latestWeek = team.homeworkWeeks[0]
    return team.athletes.map((athlete) => ({
      athleteId: athlete.id,
      name: `${athlete.firstName} ${athlete.lastName}`,
      position: athlete.position,
      teamId: team.id,
      teamName: team.name,
      weekPct: latestWeek ? computeAthletePercent([latestWeek], athlete.id) : 0,
      globalPct: computeAthletePercent(team.homeworkWeeks, athlete.id),
    }))
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="grid grid-cols-3 gap-4 mb-12">
            <Link href="/coach/equipes" className="border border-border bg-white px-5 py-6 hover:border-ink transition-colors">
              <div className="text-3xl font-bold text-ink mb-1">{teams.length}</div>
              <div className="text-xs uppercase tracking-wider text-muted">Équipe{teams.length !== 1 ? 's' : ''}</div>
            </Link>
            <Link href="/coach/athletes" className="border border-border bg-white px-5 py-6 hover:border-ink transition-colors">
              <div className="text-3xl font-bold text-ink mb-1">{athleteCount}</div>
              <div className="text-xs uppercase tracking-wider text-muted">Athlète{athleteCount !== 1 ? 's' : ''}</div>
            </Link>
            <Link href="/coach/homeworks" className="border border-border bg-white px-5 py-6 hover:border-ink transition-colors">
              <div className="text-3xl font-bold text-ink mb-1">{weekCount}</div>
              <div className="text-xs uppercase tracking-wider text-muted">Semaine{weekCount !== 1 ? 's' : ''} suivies</div>
            </Link>
          </div>

          <h2 className="text-lg font-semibold text-ink mb-4">Mes dernières actualités</h2>
          <div className="border border-border bg-white divide-y divide-border">
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

        <div>
          <h2 className="text-lg font-semibold text-ink mb-4">Homeworks</h2>
          <HomeworksTable rows={homeworkRows} teams={teams.map((t) => ({ id: t.id, name: t.name }))} />
        </div>
      </div>
    </div>
  )
}
