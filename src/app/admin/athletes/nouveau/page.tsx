import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { AthleteForm } from '../AthleteForm'
import { createAthlete } from '../actions'

export const dynamic = 'force-dynamic'

export default async function NewAthletePage() {
  const teams = await prisma.team.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } })

  return (
    <div>
      <Link href="/admin/athletes" className="text-xs text-muted underline underline-offset-2 mb-4 inline-block">
        ← Retour
      </Link>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-ink mb-8 text-center">Nouvel athlète</h1>
        <AthleteForm
          action={createAthlete}
          teamOptions={teams.map((t) => ({ id: t.id, label: t.name }))}
          initialTeamIds={[]}
          submitLabel="Créer l'athlète"
        />
      </div>
    </div>
  )
}
