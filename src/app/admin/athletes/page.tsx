import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { AthletesSearchList } from './AthletesSearchList'

export const dynamic = 'force-dynamic'

export default async function AdminAthletesPage() {
  const athletes = await prisma.athlete.findMany({
    orderBy: { lastName: 'asc' },
    include: { teams: { select: { id: true, name: true } } },
  })

  return (
    <div className="max-w-[1600px]">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-ink">Athlètes</h1>
        <Link
          href="/admin/athletes/nouveau"
          className="bg-ink text-white text-sm font-medium px-4 py-2 hover:bg-fire transition-colors"
        >
          + Nouvel athlète
        </Link>
      </div>

      <AthletesSearchList
        athletes={athletes.map((a) => ({
          id: a.id,
          name: `${a.firstName} ${a.lastName}`,
          position: a.position,
          birthDateLabel: a.birthDate ? a.birthDate.toLocaleDateString('fr-FR') : null,
          teamNames: a.teams.map((t) => t.name),
        }))}
      />
    </div>
  )
}
