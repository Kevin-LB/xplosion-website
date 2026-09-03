import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { deleteNews } from './actions'
import { ConfirmButton } from '@/components/portal/ConfirmButton'
import type { News, User } from '@prisma/client'

export const dynamic = 'force-dynamic'

function NewsRow({ article }: { article: News & { author: User } }) {
  const isScheduled = article.published && article.publishedAt && article.publishedAt.getTime() > Date.now()

  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="min-w-0">
        <div className="font-semibold text-ink truncate">{article.title}</div>
        <div className="text-xs text-muted truncate">
          {article.author.name}
          {isScheduled && article.publishedAt && (
            <>
              {' · '}le {article.publishedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} à{' '}
              {article.publishedAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
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
}

function NewsSection({ title, items }: { title: string; items: (News & { author: User })[] }) {
  return (
    <div className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-fire mb-3">
        {title} ({items.length})
      </h2>
      <div className="border border-border divide-y divide-border bg-white">
        {items.map((article) => (
          <NewsRow key={article.id} article={article} />
        ))}
        {items.length === 0 && <p className="px-5 py-6 text-sm text-muted">Rien ici pour l&apos;instant.</p>}
      </div>
    </div>
  )
}

export default async function AdminNewsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''

  const news = await prisma.news.findMany({
    where: query ? { title: { contains: query, mode: 'insensitive' } } : undefined,
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  })

  const now = Date.now()
  const drafts = news.filter((a) => !a.published)
  const scheduled = news.filter((a) => a.published && a.publishedAt && a.publishedAt.getTime() > now)
  const published = news.filter((a) => a.published && (!a.publishedAt || a.publishedAt.getTime() <= now))

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-ink">Actualités</h1>
        <Link
          href="/admin/actualites/nouvelle"
          className="bg-ink text-white text-sm font-medium px-4 py-2 hover:bg-fire transition-colors"
        >
          + Nouvelle actualité
        </Link>
      </div>

      <form action="/admin/actualites" method="get" className="mb-8">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Rechercher une actualité par titre…"
          className="w-full max-w-sm border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink bg-white"
        />
      </form>

      <NewsSection title="Brouillons" items={drafts} />
      <NewsSection title="Programmées" items={scheduled} />
      <NewsSection title="Publiées" items={published} />
    </div>
  )
}
