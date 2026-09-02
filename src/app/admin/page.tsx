import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [teams, news, coachCount] = await Promise.all([
    prisma.team.findMany({
      orderBy: { name: 'asc' },
      include: {
        athletes: true,
        coaches: { select: { name: true } },
      },
    }),
    prisma.news.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { author: { select: { name: true } } } }),
    prisma.user.count({ where: { role: 'COACH' } }),
  ])

  const athleteCount = teams.reduce((n, t) => n + t.athletes.length, 0)
  const publishedCount = news.filter((n) => n.published).length

  const cards = [
    { label: 'Équipes', value: teams.length, href: '/admin/equipes' },
    { label: 'Athlètes', value: athleteCount, href: '/admin/equipes' },
    { label: 'Actualités publiées', value: publishedCount, href: '/admin/actualites' },
    { label: 'Comptes coach', value: coachCount, href: '/admin/comptes' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {cards.map((card) => (
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

      <h2 className="text-lg font-semibold text-ink mb-4">Équipes</h2>
      <div className="border border-border bg-white divide-y divide-border mb-12 max-w-4xl">
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/admin/equipes/${team.id}`}
            className="flex items-center justify-between px-5 py-4 hover:bg-cream transition-colors gap-4"
          >
            <div className="min-w-0">
              <div className="font-semibold text-ink truncate">{team.name}</div>
              <div className="text-xs text-muted truncate">
                {team.athletes.length} athlète{team.athletes.length !== 1 ? 's' : ''} ·{' '}
                {team.coaches.length > 0 ? (
                  team.coaches.map((c) => c.name).join(', ')
                ) : (
                  <span className="text-fire">Aucun coach assigné</span>
                )}
              </div>
            </div>
          </Link>
        ))}
        {teams.length === 0 && <p className="px-5 py-8 text-sm text-muted">Aucune équipe pour l&apos;instant.</p>}
      </div>

      <h2 className="text-lg font-semibold text-ink mb-4">Dernières actualités</h2>
      <div className="border border-border bg-white divide-y divide-border max-w-4xl">
        {news.map((article) => {
          const isScheduled = article.published && article.publishedAt && article.publishedAt.getTime() > Date.now()
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
        {news.length === 0 && (
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
