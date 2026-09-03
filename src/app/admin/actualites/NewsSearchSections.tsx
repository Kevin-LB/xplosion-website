'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ConfirmButton } from '@/components/portal/ConfirmButton'

type NewsRow = {
  id: string
  title: string
  authorName: string
  scheduledLabel: string | null
}

function NewsRowItem({ article, deleteAction }: { article: NewsRow; deleteAction: (id: string) => Promise<void> }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="min-w-0">
        <div className="font-semibold text-ink truncate">{article.title}</div>
        <div className="text-xs text-muted truncate">
          {article.authorName}
          {article.scheduledLabel && ` · ${article.scheduledLabel}`}
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <Link href={`/admin/actualites/${article.id}`} className="text-sm text-ink underline underline-offset-2">
          Modifier
        </Link>
        <form action={deleteAction.bind(null, article.id)}>
          <ConfirmButton confirmMessage={`Supprimer l'actualité "${article.title}" ?`} className="text-sm text-fire">
            Supprimer
          </ConfirmButton>
        </form>
      </div>
    </div>
  )
}

function Section({
  title,
  items,
  deleteAction,
}: {
  title: string
  items: NewsRow[]
  deleteAction: (id: string) => Promise<void>
}) {
  return (
    <div className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-fire mb-3">
        {title} ({items.length})
      </h2>
      <div className="border border-border divide-y divide-border bg-white">
        {items.map((article) => (
          <NewsRowItem key={article.id} article={article} deleteAction={deleteAction} />
        ))}
        {items.length === 0 && <p className="px-5 py-6 text-sm text-muted">Rien ici pour l&apos;instant.</p>}
      </div>
    </div>
  )
}

export function NewsSearchSections({
  drafts,
  scheduled,
  published,
  deleteAction,
}: {
  drafts: NewsRow[]
  scheduled: NewsRow[]
  published: NewsRow[]
  deleteAction: (id: string) => Promise<void>
}) {
  const [query, setQuery] = useState('')
  const q = query.toLowerCase()
  const matches = (a: NewsRow) => !q || a.title.toLowerCase().includes(q)

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher une actualité par titre…"
        className="w-full max-w-sm border border-border px-3 py-2 text-sm mb-8 focus:outline-none focus:border-ink bg-white"
      />

      <Section title="Brouillons" items={drafts.filter(matches)} deleteAction={deleteAction} />
      <Section title="Programmées" items={scheduled.filter(matches)} deleteAction={deleteAction} />
      <Section title="Publiées" items={published.filter(matches)} deleteAction={deleteAction} />
    </div>
  )
}
