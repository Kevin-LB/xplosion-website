import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { deleteNews } from './actions'
import { ConfirmButton } from '@/components/portal/ConfirmButton'

export const dynamic = 'force-dynamic'

export default async function AdminNewsPage() {
  const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' }, include: { author: true } })

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-ink">Actualités</h1>
        <Link
          href="/admin/actualites/nouvelle"
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
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium uppercase tracking-wider px-2 py-0.5 ${statusClass}`}>
                  {statusLabel}
                </span>
                {isScheduled && article.publishedAt && (
                  <span className="text-xs text-muted">
                    le {article.publishedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} à{' '}
                    {article.publishedAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
                <span className="text-xs text-muted">{article.author.name}</span>
              </div>
              <div className="font-semibold text-ink">{article.title}</div>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/actualites/${article.id}`} className="text-sm text-ink underline underline-offset-2">
                Modifier
              </Link>
              <form
                action={async () => {
                  'use server'
                  await deleteNews(article.id)
                }}
              >
                <ConfirmButton confirmMessage={`Supprimer l'actualité "${article.title}" ?`} className="text-sm text-fire">
                  Supprimer
                </ConfirmButton>
              </form>
            </div>
          </div>
          )
        })}
        {news.length === 0 && <p className="px-5 py-8 text-sm text-muted">Aucune actualité pour l&apos;instant.</p>}
      </div>
    </div>
  )
}
