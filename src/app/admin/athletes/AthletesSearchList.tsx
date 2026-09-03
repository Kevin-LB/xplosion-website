'use client'

import { useState } from 'react'
import Link from 'next/link'

type AthleteRow = {
  id: string
  name: string
  position: string | null
  birthDateLabel: string | null
  teamNames: string[]
}

export function AthletesSearchList({ athletes, basePath }: { athletes: AthleteRow[]; basePath: string }) {
  const [query, setQuery] = useState('')
  const filtered = query
    ? athletes.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
    : athletes

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un athlète…"
        className="w-full max-w-sm border border-border px-3 py-2 text-sm mb-6 focus:outline-none focus:border-ink bg-white"
      />

      <div className="border border-border bg-white divide-y divide-border">
        {filtered.map((athlete) => (
          <Link
            key={athlete.id}
            href={`${basePath}/${athlete.id}`}
            className="flex items-center justify-between px-5 py-4 hover:bg-cream transition-colors gap-4"
          >
            <div className="min-w-0">
              <div className="font-semibold text-ink truncate">
                {athlete.name}
                {athlete.position && <span className="text-muted font-normal"> — {athlete.position}</span>}
              </div>
              <div className="text-xs text-muted truncate">
                {athlete.birthDateLabel ? `Né(e) le ${athlete.birthDateLabel}` : 'Date de naissance non renseignée'}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-end shrink-0 max-w-xs">
              {athlete.teamNames.length > 0 ? (
                athlete.teamNames.map((name) => (
                  <span key={name} className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-cream-2 text-muted">
                    {name}
                  </span>
                ))
              ) : (
                <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-cream-2 text-fire">
                  Aucune équipe
                </span>
              )}
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="px-5 py-8 text-sm text-muted">
            {query ? 'Aucun athlète ne correspond à ta recherche.' : 'Aucun athlète pour l’instant.'}
          </p>
        )}
      </div>
    </div>
  )
}
