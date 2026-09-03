import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { createUser, resetPassword, deleteUser } from './actions'
import { AccountsSearchList } from './AccountsSearchList'

export const dynamic = 'force-dynamic'

const inputClass = 'w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink bg-white'
const labelClass = 'block text-xs font-medium uppercase tracking-wider text-muted mb-1.5'

export default async function AdminUsersPage() {
  const session = await auth()
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'asc' } })

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
          <AccountsSearchList
            users={users.map((u) => ({
              id: u.id,
              name: u.name,
              username: u.username,
              roleLabel: u.role === 'ADMIN' ? 'Bureau' : 'Coach',
              title: u.title,
              mustChangePassword: u.mustChangePassword,
              canDelete: u.id !== session?.user.id,
            }))}
            resetAction={resetPassword}
            deleteAction={deleteUser}
          />
        </div>
      </div>
    </div>
  )
}
