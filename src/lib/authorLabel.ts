import type { Role } from '@prisma/client'

type AuthorLike = {
  name: string
  title: string | null
  role: Role
  coachedTeams?: { name: string }[]
}

// Intitulé affiché sous une actualité : "Marion — Présidente" si un titre a
// été renseigné, sinon dérivé automatiquement des équipes coachées
// ("Lucie — Coach Fire"), pour rester juste sans ressaisie manuelle.
export function getAuthorLabel(user: AuthorLike): string {
  if (user.title) return `${user.name} — ${user.title}`

  if (user.role === 'COACH') {
    const teams = user.coachedTeams ?? []
    if (teams.length > 0) return `${user.name} — Coach ${teams.map((t) => t.name).join(' et ')}`
    return `${user.name} — Coach`
  }

  return `${user.name} — Bureau`
}
