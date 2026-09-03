import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminAthletesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''

  const athletes = await prisma.athlete.findMany({
    where: query
      ? {
          OR: [
            { firstName: { contains: query, mode: 'insensitive' } },
            { lastName: { contains: query, mode: 'insensitive' } },
          ],
        }
      : undefined,
    orderBy: { lastName: 'asc' },
    include: { teams: { select: { id: true, name: true } } },
  })

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-ink">Athlètes</h1>
        <Link
          href="/admin/athletes/nouveau"
          className="bg-ink text-white text-sm font-medium px-4 py-2 hover:bg-fire transition-colors"
        >
          + Nouvel athlète
        </Link>
      </div>

      <form action="/admin/athletes" method="get" className="mb-6">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Rechercher un athlète…"
          className="w-full max-w-sm border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink bg-white"
        />
      </form>

      <div className="border border-border bg-white divide-y divide-border">
        {athletes.map((athlete) => (
          <Link
            key={athlete.id}
            href={`/admin/athletes/${athlete.id}`}
            className="flex items-center justify-between px-5 py-4 hover:bg-cream transition-colors gap-4"
          >
            <div className="min-w-0">
              <div className="font-semibold text-ink truncate">
                {athlete.firstName} {athlete.lastName}
                {athlete.position && <span className="text-muted font-normal"> — {athlete.position}</span>}
              </div>
              <div className="text-xs text-muted truncate">
                {athlete.birthDate
                  ? `Né(e) le ${athlete.birthDate.toLocaleDateString('fr-FR')}`
                  : 'Date de naissance non renseignée'}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-end shrink-0 max-w-xs">
              {athlete.teams.length > 0 ? (
                athlete.teams.map((t) => (
                  <span key={t.id} className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-cream-2 text-muted">
                    {t.name}
                  </span>
                ))
              ) : (
                <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-cream-2 text-fire">
                  Aucune équipe
                </span>
              )}
            </div>
          </Link>
        ))}
        {athletes.length === 0 && (
          <p className="px-5 py-8 text-sm text-muted">
            {query ? 'Aucun athlète ne correspond à ta recherche.' : 'Aucun athlète pour l’instant.'}
          </p>
        )}
      </div>
    </div>
  )
}
