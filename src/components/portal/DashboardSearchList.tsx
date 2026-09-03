'use client'

import { useState } from 'react'
import Link from 'next/link'

type Item = {
  id: string
  href: string
  label: string
  sublabel?: string
  badge?: { text: string; className: string }
}

// Recherche + liste défilante réutilisée pour les deux colonnes du tableau
// de bord (équipes / actualités) — seule la liste défile, pas la page.
export function DashboardSearchList({ items, placeholder }: { items: Item[]; placeholder: string }) {
  const [query, setQuery] = useState('')
  const q = query.toLowerCase()
  const filtered = q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-border px-3 py-2 text-sm mb-4 focus:outline-none focus:border-ink bg-white"
      />

      <div className="border border-border divide-y divide-border bg-white max-h-[480px] overflow-y-auto">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center justify-between px-4 py-3 hover:bg-cream transition-colors gap-3"
          >
            <div className="min-w-0">
              <div className="text-sm font-medium text-ink truncate">{item.label}</div>
              {item.sublabel && <div className="text-xs text-muted truncate">{item.sublabel}</div>}
            </div>
            {item.badge && (
              <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 shrink-0 ${item.badge.className}`}>
                {item.badge.text}
              </span>
            )}
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="px-4 py-6 text-sm text-muted">{query ? 'Aucun résultat.' : 'Rien pour l’instant.'}</p>
        )}
      </div>
    </div>
  )
}
