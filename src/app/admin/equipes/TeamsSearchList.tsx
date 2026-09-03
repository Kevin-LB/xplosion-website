'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ConfirmButton } from '@/components/portal/ConfirmButton'

type TeamRow = {
  id: string
  name: string
  level: string
  athleteCount: number
  coachNames: string[]
}

export function TeamsSearchList({
  teams,
  deleteAction,
}: {
  teams: TeamRow[]
  deleteAction: (teamId: string) => Promise<void>
}) {
  const [query, setQuery] = useState('')
  const filtered = query
    ? teams.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()))
    : teams

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher une équipe…"
        className="w-full max-w-sm border border-border px-3 py-2 text-sm mb-6 focus:outline-none focus:border-ink bg-white"
      />

      <div className="border border-border divide-y divide-border bg-white">
        {filtered.map((team) => (
          <div key={team.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-fire font-medium mb-1">{team.level}</div>
              <div className="font-semibold text-ink">{team.name}</div>
              <div className="text-xs text-muted mt-1">
                {team.athleteCount} athlète{team.athleteCount !== 1 ? 's' : ''} ·{' '}
                {team.coachNames.join(', ') || 'Aucun coach assigné'}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/equipes/${team.id}`} className="text-sm text-ink underline underline-offset-2">
                Modifier
              </Link>
              <form action={deleteAction.bind(null, team.id)}>
                <ConfirmButton confirmMessage={`Supprimer l'équipe ${team.name} ?`} className="text-sm text-fire">
                  Supprimer
                </ConfirmButton>
              </form>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="px-5 py-8 text-sm text-muted">
            {query ? 'Aucune équipe ne correspond à ta recherche.' : 'Aucune équipe pour l’instant.'}
          </p>
        )}
      </div>
    </div>
  )
}
