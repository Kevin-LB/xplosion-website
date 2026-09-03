import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { TagPicker } from '@/components/portal/TagPicker'
import { createUser, resetPassword, deleteUser } from './actions'
import { AccountsSearchList } from './AccountsSearchList'

export const dynamic = 'force-dynamic'

const inputClass = 'w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink bg-white'
const labelClass = 'block text-xs font-medium uppercase tracking-wider text-muted mb-1.5'

export default async function AdminUsersPage() {
  const session = await auth()
  const [users, teams] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.team.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])

  return (
    <div className="max-w-[1600px]">
      <h1 className="text-2xl font-bold text-ink mb-8">Comptes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
        <section className="lg:pr-10">
          <h2 className="text-lg font-semibold text-ink mb-5">Nouveau compte</h2>
          <form action={createUser}>
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
                <div className="flex items-center gap-5 h-[38px]">
                  <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                    <input type="radio" name="role" value="COACH" defaultChecked className="accent-ink" />
                    Coach
                  </label>
                  <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                    <input type="radio" name="role" value="ADMIN" className="accent-ink" />
                    Bureau
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>Intitulé (optionnel)</label>
                <input name="title" placeholder="Présidente, Trésorière…" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Équipes encadrées (optionnel)</label>
                <TagPicker
                  name="teamIds"
                  options={teams.map((t) => ({ id: t.id, label: t.name }))}
                  initialSelectedIds={[]}
                  placeholder="Rechercher une équipe…"
                />
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
        </section>

        <section className="mt-10 pt-10 border-t border-border lg:mt-0 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-10">
          <h2 className="text-lg font-semibold text-ink mb-5">Tout les comptes</h2>
          <AccountsSearchList
            users={users.map((u) => ({
              id: u.id,
              name: u.name,
              username: u.username,
              roleLabel: u.role === 'ADMIN' ? 'Bureau' : 'Coach',
              title: u.title,
              mustChangePassword: u.mustChangePassword,
              canDelete: u.id !== session?.user.id && u.username !== 'taga',
              canReset: u.username !== 'taga',
            }))}
            resetAction={resetPassword}
            deleteAction={deleteUser}
          />
        </section>
      </div>
    </div>
  )
}
