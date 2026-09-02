'use client'

import { useActionState } from 'react'
import { updateProfile, changePassword } from './actions'

const inputClass = 'w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink'
const labelClass = 'block text-xs font-medium uppercase tracking-wider text-muted mb-1.5'

export function ProfileForms({ name, username, title }: { name: string; username: string; title: string }) {
  const [infoMessage, infoAction, infoPending] = useActionState(updateProfile, undefined)
  const [passwordMessage, passwordAction, passwordPending] = useActionState(changePassword, undefined)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
      <section>
        <h2 className="text-lg font-semibold text-ink mb-4">Informations du compte</h2>
        <form action={infoAction} className="flex flex-col gap-4">
          <div>
            <label className={labelClass} htmlFor="name">Nom</label>
            <input id="name" name="name" defaultValue={name} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="username">Identifiant</label>
            <input id="username" name="username" defaultValue={username} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="title">Intitulé affiché (optionnel)</label>
            <input id="title" name="title" defaultValue={title} placeholder="Présidente, Trésorière…" className={inputClass} />
          </div>
          {infoMessage && <p className="text-sm text-fire">{infoMessage}</p>}
          <button
            type="submit"
            disabled={infoPending}
            className="self-start bg-ink text-white text-sm font-medium px-5 py-2.5 hover:bg-fire transition-colors disabled:opacity-60"
          >
            {infoPending ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink mb-4">Changer de mot de passe</h2>
        <form action={passwordAction} className="flex flex-col gap-4">
          <div>
            <label className={labelClass} htmlFor="currentPassword">Mot de passe actuel</label>
            <input id="currentPassword" name="currentPassword" type="password" required autoComplete="current-password" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="password">Nouveau mot de passe</label>
            <input id="password" name="password" type="password" required autoComplete="new-password" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="confirm">Confirme le nouveau mot de passe</label>
            <input id="confirm" name="confirm" type="password" required autoComplete="new-password" className={inputClass} />
          </div>
          {passwordMessage && <p className="text-sm text-fire">{passwordMessage}</p>}
          <button
            type="submit"
            disabled={passwordPending}
            className="self-start bg-ink text-white text-sm font-medium px-5 py-2.5 hover:bg-fire transition-colors disabled:opacity-60"
          >
            {passwordPending ? 'Changement…' : 'Changer le mot de passe'}
          </button>
        </form>
      </section>
    </div>
  )
}
