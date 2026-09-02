import { prisma } from '@/lib/prisma'
import { computeAthletePercent, monthKey, monthLabel } from '@/lib/homeworkStats'

export const dynamic = 'force-dynamic'

export default async function MoisHomeworksPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params

  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      athletes: { orderBy: { lastName: 'asc' } },
      homeworkWeeks: { orderBy: { weekStart: 'desc' }, include: { exercises: { include: { completions: true } } } },
    },
  })
  if (!team) return null

  // Semaines déjà triées de la plus récente à la plus ancienne : les mois
  // se remplissent donc naturellement dans le même ordre, sans tri en plus.
  const months = new Map<string, { label: string; weeks: typeof team.homeworkWeeks }>()
  for (const week of team.homeworkWeeks) {
    const key = monthKey(week.weekStart)
    if (!months.has(key)) months.set(key, { label: monthLabel(week.weekStart), weeks: [] })
    months.get(key)!.weeks.push(week)
  }
  const monthEntries = [...months.entries()]

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold text-ink">Vue par mois</h2>
      {monthEntries.map(([key, month]) => (
        <div key={key}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fire mb-3">{month.label}</h3>
          <div className="border border-border bg-white divide-y divide-border max-w-2xl">
            {team.athletes.map((athlete) => {
              const pct = computeAthletePercent(month.weeks, athlete.id)
              return (
                <div key={athlete.id} className="flex items-center justify-between px-4 py-3 text-sm">
                  <span>
                    {athlete.firstName} {athlete.lastName}
                    {athlete.position && <span className="text-muted"> — {athlete.position}</span>}
                  </span>
                  <div className="flex items-center gap-3 w-40">
                    <div className="flex-1 h-1.5 bg-cream-2 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-fire" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-medium text-ink w-10 text-right">{pct}%</span>
                  </div>
                </div>
              )
            })}
            {team.athletes.length === 0 && <p className="px-4 py-6 text-sm text-muted">Aucun athlète dans cette équipe.</p>}
          </div>
        </div>
      ))}
      {monthEntries.length === 0 && <p className="text-sm text-muted">Aucune semaine enregistrée pour l&apos;instant.</p>}
    </div>
  )
}
