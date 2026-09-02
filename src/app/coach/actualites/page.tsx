import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function CoachNewsPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const news = await prisma.news.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-ink">Mes actualités</h1>
        <Link
          href="/coach/actualites/nouvelle"
          className="bg-ink text-white text-sm font-medium px-4 py-2 hover:bg-fire transition-colors"
        >
          + Nouvelle actualité
        </Link>
      </div>

      <div className="border border-border divide-y divide-border bg-white">
        {news.map((article) => {
          const isScheduled = article.published && article.publishedAt && article.publishedAt.getTime() > Date.now()
          const statusLabel = !article.published ? 'Brouillon' : isScheduled ? 'Programmée' : 'Publié'
          const statusClass = !article.published
            ? 'bg-cream-2 text-muted'
            : isScheduled
              ? 'bg-gold text-white'
              : 'bg-fire text-white'

          return (
            <div key={article.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <span className={`text-xs font-medium uppercase tracking-wider px-2 py-0.5 ${statusClass}`}>
                  {statusLabel}
                </span>
                <div className="font-semibold text-ink mt-1">{article.title}</div>
              </div>
            </div>
          )
        })}
        {news.length === 0 && <p className="px-5 py-8 text-sm text-muted">Aucune actualité pour l&apos;instant.</p>}
      </div>
    </div>
  )
}
