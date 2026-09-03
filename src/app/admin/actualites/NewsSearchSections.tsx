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

function NewsRowItem({
  article,
  deleteAction,
  basePath,
}: {
  article: NewsRow
  deleteAction: (id: string) => Promise<void>
  basePath: string
}) {
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
        <Link href={`${basePath}/${article.id}`} className="text-sm text-ink underline underline-offset-2">
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
  basePath,
}: {
  title: string
  items: NewsRow[]
  deleteAction: (id: string) => Promise<void>
  basePath: string
}) {
  return (
    <details className="group mb-6" open>
      <summary className="flex items-center gap-2 list-none cursor-pointer select-none mb-3">
        <span className="text-sm font-semibold uppercase tracking-wider text-fire">
          {title} ({items.length})
        </span>
        <svg
          viewBox="0 0 12 8"
          className="w-2.5 h-2.5 fill-fire transition-transform group-open:rotate-180"
          aria-hidden="true"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="border border-border divide-y divide-border bg-white">
        {items.map((article) => (
          <NewsRowItem key={article.id} article={article} deleteAction={deleteAction} basePath={basePath} />
        ))}
        {items.length === 0 && <p className="px-5 py-6 text-sm text-muted">Rien ici pour l&apos;instant.</p>}
      </div>
    </details>
  )
}

export function NewsSearchSections({
  drafts,
  scheduled,
  published,
  deleteAction,
  basePath,
}: {
  drafts: NewsRow[]
  scheduled: NewsRow[]
  published: NewsRow[]
  deleteAction: (id: string) => Promise<void>
  basePath: string
}) {
  const [query, setQuery] = useState('')
  const q = query.toLowerCase()
  const matches = (a: NewsRow) => !q || a.title.toLowerCase().includes(q)

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
        <h1 className="text-2xl font-bold text-ink shrink-0">Actualités</h1>
        <div className="flex items-center gap-4 flex-1 justify-end flex-wrap">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une actualité par titre…"
            className="w-full max-w-sm border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink bg-white"
          />
          <Link
            href={`${basePath}/nouvelle`}
            className="bg-ink text-white text-sm font-medium px-4 py-2 hover:bg-fire transition-colors shrink-0"
          >
            + Nouvelle actualité
          </Link>
        </div>
      </div>

      <Section title="Brouillons" items={drafts.filter(matches)} deleteAction={deleteAction} basePath={basePath} />
      <Section title="Programmées" items={scheduled.filter(matches)} deleteAction={deleteAction} basePath={basePath} />
      <Section title="Publiées" items={published.filter(matches)} deleteAction={deleteAction} basePath={basePath} />
    </div>
  )
}
