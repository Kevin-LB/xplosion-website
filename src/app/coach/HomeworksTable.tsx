'use client'

import { useState } from 'react'
import Link from 'next/link'

type Row = {
  athleteId: string
  name: string
  position: string | null
  teamId: string
  teamName: string
  weekPct: number
  globalPct: number
}

type SortColumn = 'name' | 'position' | 'teamName' | 'weekPct' | 'globalPct'
type SortDirection = 'asc' | 'desc'

const COLUMNS: { key: SortColumn; label: string; align?: 'right' }[] = [
  { key: 'name', label: 'Nom' },
  { key: 'position', label: 'Rôle' },
  { key: 'teamName', label: 'Équipe' },
  { key: 'weekPct', label: '% Semaine', align: 'right' },
  { key: 'globalPct', label: '% Global', align: 'right' },
]

export function HomeworksTable({ rows, teams }: { rows: Row[]; teams: { id: string; name: string }[] }) {
  const [teamId, setTeamId] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<{ column: SortColumn; direction: SortDirection } | null>(null)

  const q = query.toLowerCase()
  const filtered = rows.filter(
    (row) => (teamId === 'all' || row.teamId === teamId) && (!q || row.name.toLowerCase().includes(q))
  )

  const sorted = sort
    ? [...filtered].sort((a, b) => {
        const av = a[sort.column]
        const bv = b[sort.column]
        const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av ?? '').localeCompare(String(bv ?? ''))
        return sort.direction === 'asc' ? cmp : -cmp
      })
    : filtered

  function toggleSort(column: SortColumn) {
    setSort((current) => {
      if (!current || current.column !== column) return { column, direction: 'asc' }
      if (current.direction === 'asc') return { column, direction: 'desc' }
      return null
    })
  }

  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink bg-white"
        >
          <option value="all">Toutes les équipes</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un athlète…"
          className="flex-1 min-w-[200px] border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink bg-white"
        />
      </div>

      <div className="border border-border bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              {COLUMNS.map((col) => {
                const active = sort?.column === col.key
                return (
                  <th key={col.key} className={`px-5 py-3 text-xs uppercase tracking-wider font-medium ${col.align === 'right' ? 'text-right' : ''}`}>
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className={`inline-flex items-center gap-1 hover:text-ink transition-colors ${active ? 'text-ink' : 'text-muted'}`}
                    >
                      {col.label}
                      <span className="text-[10px] leading-none">
                        {active ? (sort!.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((row) => (
              <tr key={`${row.teamId}-${row.athleteId}`} className="hover:bg-cream transition-colors">
                <td className="px-5 py-3">
                  <Link href={`/coach/homeworks/${row.teamId}/global`} className="font-medium text-ink hover:underline underline-offset-2">
                    {row.name}
                  </Link>
                </td>
                <td className="px-5 py-3 text-muted">{row.position ?? '—'}</td>
                <td className="px-5 py-3 text-muted">{row.teamName}</td>
                <td className="px-5 py-3 text-right font-semibold text-ink">{row.weekPct}%</td>
                <td className="px-5 py-3 text-right font-semibold text-ink">{row.globalPct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length === 0 && (
          <p className="px-5 py-8 text-sm text-muted">{query || teamId !== 'all' ? 'Aucun résultat.' : 'Aucun athlète pour l’instant.'}</p>
        )}
      </div>
    </div>
  )
}
