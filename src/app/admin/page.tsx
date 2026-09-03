import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { QuickSearch } from '@/components/portal/QuickSearch'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [teams, news, coachCount, athleteCount, weekCount] = await Promise.all([
    prisma.team.findMany({
      orderBy: { name: 'asc' },
      include: { coaches: { select: { name: true } } },
    }),
    prisma.news.findMany({ orderBy: { createdAt: 'desc' }, include: { author: { select: { name: true } } } }),
    prisma.user.count({ where: { role: 'COACH' } }),
    prisma.athlete.count(),
    prisma.homeworkWeek.count(),
  ])

  const now = Date.now()
  const publishedCount = news.filter((n) => n.published && (!n.publishedAt || n.publishedAt.getTime() <= now)).length
  const draftCount = news.filter((n) => !n.published).length
  const scheduledCount = news.filter((n) => n.published && n.publishedAt && n.publishedAt.getTime() > now).length
  const teamsWithoutCoachCount = teams.filter((t) => t.coaches.length === 0).length
  const latestNews = news.slice(0, 3)

  const mainCards = [
    { label: 'Équipes', value: teams.length, href: '/admin/equipes' },
    { label: 'Athlètes', value: athleteCount, href: '/admin/athletes' },
    { label: 'Actualités publiées', value: publishedCount, href: '/admin/actualites' },
    { label: 'Comptes coach', value: coachCount, href: '/admin/comptes' },
  ]

  const secondaryCards = [
    { label: 'Brouillons', value: draftCount, href: '/admin/actualites' },
    { label: 'Programmées', value: scheduledCount, href: '/admin/actualites' },
    { label: 'Équipes sans coach', value: teamsWithoutCoachCount, href: '/admin/equipes', warn: teamsWithoutCoachCount > 0 },
    { label: 'Semaines de homework', value: weekCount, href: '/admin/equipes' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {mainCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-border bg-white px-5 py-6 hover:border-ink transition-colors"
          >
            <div className="text-3xl font-bold text-ink mb-1">{card.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {secondaryCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-border bg-white px-5 py-4 hover:border-ink transition-colors"
          >
            <div className={`text-xl font-bold mb-0.5 ${card.warn ? 'text-fire' : 'text-ink'}`}>{card.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-ink">Équipes</h2>
        <Link href="/admin/equipes" className="text-sm text-ink underline underline-offset-2">
          Voir tout →
        </Link>
      </div>
      <div className="mb-12">
        <QuickSearch
          items={teams.map((t) => ({ id: t.id, label: t.name, href: `/admin/equipes/${t.id}` }))}
          placeholder="Rechercher une équipe…"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-ink">Dernières actualités</h2>
        <Link href="/admin/actualites" className="text-sm text-ink underline underline-offset-2">
          Voir tout →
        </Link>
      </div>
      <div className="border border-border bg-white divide-y divide-border max-w-4xl">
        {latestNews.map((article) => {
          const isScheduled = article.published && article.publishedAt && article.publishedAt.getTime() > now
          const statusLabel = !article.published ? 'Brouillon' : isScheduled ? 'Programmée' : 'Publié'
          const statusClass = !article.published ? 'bg-cream-2 text-muted' : isScheduled ? 'bg-gold text-white' : 'bg-fire text-white'
          return (
            <Link
              key={article.id}
              href={`/admin/actualites/${article.id}`}
              className="flex items-center justify-between px-5 py-4 hover:bg-cream transition-colors gap-4"
            >
              <div className="min-w-0">
                <div className="font-semibold text-ink truncate">{article.title}</div>
                <div className="text-xs text-muted">{article.author.name}</div>
              </div>
              <span className={`text-xs font-medium uppercase tracking-wider px-2 py-0.5 shrink-0 ${statusClass}`}>{statusLabel}</span>
            </Link>
          )
        })}
        {latestNews.length === 0 && (
          <p className="px-5 py-8 text-sm text-muted">
            Aucune actualité pour l&apos;instant —{' '}
            <Link href="/admin/actualites/nouvelle" className="text-ink underline underline-offset-2">
              en créer une
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  )
}
