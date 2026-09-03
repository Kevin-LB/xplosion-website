import Link from 'next/link'
import { Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { TeamForm } from '../TeamForm'
import { createTeam } from '../actions'

export const dynamic = 'force-dynamic'

export default async function NewTeamPage() {
  const coaches = await prisma.user.findMany({ where: { role: Role.COACH }, orderBy: { name: 'asc' } })

  return (
    <div>
      <Link href="/admin/equipes" className="text-xs text-muted underline underline-offset-2 mb-4 inline-block">
        ← Retour
      </Link>
      <h1 className="text-2xl font-bold text-ink mb-8">Nouvelle équipe</h1>
      <TeamForm
        action={createTeam}
        coachOptions={coaches.map((c) => ({ id: c.id, label: c.name }))}
        initialCoachIds={[]}
        submitLabel="Créer l'équipe"
      />
    </div>
  )
}
