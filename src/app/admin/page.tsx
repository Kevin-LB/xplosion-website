import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { DashboardSearchList } from '@/components/portal/DashboardSearchList'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [teams, news, coachCount, athleteCount] = await Promise.all([
    prisma.team.findMany({
      orderBy: { name: 'asc' },
      include: { coaches: { select: { name: true } } },
    }),
    prisma.news.findMany({ orderBy: { createdAt: 'desc' }, include: { author: { select: { name: true } } } }),
    prisma.user.count({ where: { role: 'COACH' } }),
    prisma.athlete.count(),
  ])

  const now = Date.now()
  const publishedCount = news.filter((n) => n.published && (!n.publishedAt || n.publishedAt.getTime() <= now)).length

  const mainCards = [
    { label: 'Équipes', value: teams.length, href: '/admin/equipes' },
    { label: 'Athlètes', value: athleteCount, href: '/admin/athletes' },
    { label: 'Actualités publiées', value: publishedCount, href: '/admin/actualites' },
    { label: 'Comptes coach', value: coachCount, href: '/admin/comptes' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
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

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:pr-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-ink">Équipes</h2>
            <Link href="/admin/equipes" className="text-sm text-ink underline underline-offset-2">
              Voir tout →
            </Link>
          </div>
          <DashboardSearchList
            placeholder="Rechercher une équipe…"
            items={teams.map((t) => ({
              id: t.id,
              href: `/admin/equipes/${t.id}`,
              label: t.name,
              sublabel: t.coaches.map((c) => c.name).join(', ') || 'Aucun coach assigné',
            }))}
          />
        </div>

        <div className="mt-10 pt-10 border-t border-border lg:mt-0 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-ink">Actualités</h2>
            <Link href="/admin/actualites" className="text-sm text-ink underline underline-offset-2">
              Voir tout →
            </Link>
          </div>
          <DashboardSearchList
            placeholder="Rechercher une actualité…"
            items={news.map((article) => {
              const isScheduled = article.published && article.publishedAt && article.publishedAt.getTime() > now
              const statusLabel = !article.published ? 'Brouillon' : isScheduled ? 'Programmée' : 'Publié'
              const statusClass = !article.published ? 'bg-cream-2 text-muted' : isScheduled ? 'bg-gold text-white' : 'bg-fire text-white'
              return {
                id: article.id,
                href: `/admin/actualites/${article.id}`,
                label: article.title,
                sublabel: article.author.name,
                badge: { text: statusLabel, className: statusClass },
              }
            })}
          />
        </div>
      </div>
    </div>
  )
}
