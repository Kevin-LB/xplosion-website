'use client'

import { useState } from 'react'

// Recherche + ajout immédiat d'un athlète déjà en base (une équipe à la
// fois) — chaque résultat est son propre petit formulaire vers une server
// action déjà partiellement appliquée (bind sur l'id de l'équipe).
export function AthleteSearchPicker({
  athletes,
  attachAction,
}: {
  athletes: { id: string; label: string }[]
  attachAction: (athleteId: string) => Promise<void>
}) {
  const [query, setQuery] = useState('')
  const filtered = query
    ? athletes.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))
    : athletes

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un athlète existant…"
        className="w-full border border-border px-3 py-2 text-sm mb-2 focus:outline-none focus:border-ink"
      />
      <div className="border border-border bg-white divide-y divide-border max-h-56 overflow-y-auto">
        {filtered.map((athlete) => (
          <form key={athlete.id} action={attachAction.bind(null, athlete.id)} className="flex items-center justify-between px-3 py-2">
            <span className="text-sm text-ink">{athlete.label}</span>
            <button type="submit" className="text-xs text-ink underline underline-offset-2 shrink-0">
              Ajouter
            </button>
          </form>
        ))}
        {filtered.length === 0 && <p className="px-3 py-4 text-xs text-muted">Aucun athlète disponible.</p>}
      </div>
    </div>
  )
}
