'use client'

import { useState } from 'react'
import { ConfirmButton } from '@/components/portal/ConfirmButton'

type UserRow = {
  id: string
  name: string
  username: string
  roleLabel: string
  title: string | null
  mustChangePassword: boolean
  canDelete: boolean
  canReset: boolean
}

export function AccountsSearchList({
  users,
  resetAction,
  deleteAction,
}: {
  users: UserRow[]
  resetAction: (userId: string, formData: FormData) => Promise<void>
  deleteAction: (userId: string) => Promise<void>
}) {
  const [query, setQuery] = useState('')
  const q = query.toLowerCase()
  const filtered = q
    ? users.filter((u) => u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q))
    : users

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un compte…"
        className="w-full border border-border px-3 py-2 text-sm mb-4 focus:outline-none focus:border-ink bg-white"
      />

      {/* Note maquette : seule cette liste défile, pas la page entière. */}
      <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
        {filtered.map((user) => (
          <div key={user.id} className="border border-border bg-white p-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-serif text-sm shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-ink text-sm truncate">{user.name}</div>
                <div className="text-xs text-muted">@{user.username}</div>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-cream-2 text-muted">
                    {user.roleLabel}
                  </span>
                  {user.title && (
                    <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-cream-2 text-muted">
                      {user.title}
                    </span>
                  )}
                  {user.mustChangePassword && (
                    <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-fire text-white">
                      Provisoire
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              {user.canReset && (
                <details className="relative">
                  <summary className="text-xs text-ink underline underline-offset-2 cursor-pointer list-none">
                    Réinitialiser
                  </summary>
                  <form
                    action={resetAction.bind(null, user.id)}
                    className="absolute right-0 z-10 mt-2 w-56 border border-border bg-white p-4 flex flex-col gap-2 shadow-sm"
                  >
                    <label className="text-xs font-medium uppercase tracking-wider text-muted">
                      Nouveau mot de passe provisoire
                    </label>
                    <input name="temporaryPassword" required className="border border-border px-3 py-2 text-sm" />
                    <button
                      type="submit"
                      className="bg-ink text-white text-sm font-medium px-4 py-2 hover:bg-fire transition-colors"
                    >
                      Valider
                    </button>
                  </form>
                </details>
              )}
              {user.canDelete && (
                <form action={deleteAction.bind(null, user.id)}>
                  <ConfirmButton confirmMessage={`Supprimer le compte de ${user.name} ?`} className="text-xs text-fire">
                    Supprimer
                  </ConfirmButton>
                </form>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted">{query ? 'Aucun compte trouvé.' : 'Aucun compte pour l’instant.'}</p>
        )}
      </div>
    </div>
  )
}
