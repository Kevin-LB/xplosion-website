import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { createUser, resetPassword, deleteUser } from './actions'
import { ConfirmButton } from '@/components/portal/ConfirmButton'

export const dynamic = 'force-dynamic'

const inputClass = 'w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink bg-white'
const labelClass = 'block text-xs font-medium uppercase tracking-wider text-muted mb-1.5'

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''
  const session = await auth()

  const users = await prisma.user.findMany({
    where: query
      ? { OR: [{ name: { contains: query, mode: 'insensitive' } }, { username: { contains: query, mode: 'insensitive' } }] }
      : undefined,
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-ink mb-8">Comptes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
        <div>
          <h2 className="text-lg font-semibold text-ink mb-5">Nouveau compte</h2>
          <form action={createUser} className="max-w-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className={labelClass}>Nom</label>
                <input name="name" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Identifiant</label>
                <input name="username" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Rôle</label>
                <select name="role" defaultValue="COACH" className={inputClass}>
                  <option value="COACH">Coach</option>
                  <option value="ADMIN">Bureau</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Intitulé (optionnel)</label>
                <input name="title" placeholder="Présidente, Trésorière…" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Mot de passe provisoire</label>
                <input name="temporaryPassword" required className={inputClass} />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 bg-ink text-white text-sm font-medium px-6 py-2.5 hover:bg-fire transition-colors"
            >
              Créer le compte
            </button>
          </form>
        </div>

        <div>
          <form action="/admin/comptes" method="get" className="mb-4">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Rechercher un compte…"
              className={inputClass}
            />
          </form>

          <div className="flex flex-col gap-3">
            {users.map((user) => (
              <div key={user.id} className="border border-border bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-serif text-sm shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-ink text-sm truncate">{user.name}</div>
                    <div className="text-xs text-muted">@{user.username}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-cream-2 text-muted">
                    {user.role === 'ADMIN' ? 'Bureau' : 'Coach'}
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

                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border-light">
                  <details className="relative">
                    <summary className="text-xs text-ink underline underline-offset-2 cursor-pointer list-none">
                      Réinitialiser
                    </summary>
                    <form
                      action={async (formData: FormData) => {
                        'use server'
                        await resetPassword(user.id, formData)
                      }}
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
                  {user.id !== session?.user.id && (
                    <form
                      action={async () => {
                        'use server'
                        await deleteUser(user.id)
                      }}
                    >
                      <ConfirmButton confirmMessage={`Supprimer le compte de ${user.name} ?`} className="text-xs text-fire">
                        Supprimer
                      </ConfirmButton>
                    </form>
                  )}
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-sm text-muted">{query ? 'Aucun compte trouvé.' : 'Aucun compte pour l’instant.'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
