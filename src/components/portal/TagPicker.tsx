'use client'

import { useState } from 'react'

type Option = { id: string; label: string }

// Sélecteur à puces (chips) avec recherche — évite d'afficher toute une
// liste (coachs du club, équipes d'un athlète...) d'un coup.
export function TagPicker({
  name,
  options,
  initialSelectedIds,
  placeholder,
}: {
  name: string
  options: Option[]
  initialSelectedIds: string[]
  placeholder: string
}) {
  const [selected, setSelected] = useState<string[]>(initialSelectedIds)
  const [query, setQuery] = useState('')

  const available = options.filter(
    (o) => !selected.includes(o.id) && o.label.toLowerCase().includes(query.toLowerCase())
  )
  const selectedOptions = selected
    .map((id) => options.find((o) => o.id === id))
    .filter((o): o is Option => Boolean(o))

  return (
    <div>
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedOptions.map((opt) => (
            <span key={opt.id} className="inline-flex items-center gap-1.5 bg-cream-2 text-ink text-xs px-2.5 py-1.5">
              {opt.label}
              <button
                type="button"
                onClick={() => setSelected((s) => s.filter((id) => id !== opt.id))}
                className="text-fire hover:text-ink"
                aria-label={`Retirer ${opt.label}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink"
        />
        {query && (
          <div className="absolute z-10 left-0 right-0 mt-1 border border-border bg-white max-h-48 overflow-y-auto shadow-sm">
            {available.length > 0 ? (
              available.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelected((s) => [...s, opt.id])
                    setQuery('')
                  }}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-cream"
                >
                  {opt.label}
                </button>
              ))
            ) : (
              <p className="px-3 py-2 text-xs text-muted">Aucun résultat.</p>
            )}
          </div>
        )}
      </div>
      {selected.map((id) => (
        <input key={id} type="hidden" name={name} value={id} />
      ))}
    </div>
  )
}
