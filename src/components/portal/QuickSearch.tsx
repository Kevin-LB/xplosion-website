'use client'

import { useState } from 'react'
import Link from 'next/link'

// Recherche instantanée façon "autocomplete" : tape, une liste de
// suggestions cliquables apparaît en dessous — pas besoin d'Entrée.
export function QuickSearch({
  items,
  placeholder,
}: {
  items: { id: string; label: string; href: string }[]
  placeholder: string
}) {
  const [query, setQuery] = useState('')
  const matches = query
    ? items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : []

  return (
    <div className="relative max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink bg-white"
      />
      {query && (
        <div className="absolute z-10 left-0 right-0 mt-1 border border-border bg-white max-h-64 overflow-y-auto shadow-sm">
          {matches.length > 0 ? (
            matches.map((item) => (
              <Link key={item.id} href={item.href} className="block px-3 py-2 text-sm text-ink hover:bg-cream">
                {item.label}
              </Link>
            ))
          ) : (
            <p className="px-3 py-2 text-xs text-muted">Aucun résultat.</p>
          )}
        </div>
      )}
    </div>
  )
}
