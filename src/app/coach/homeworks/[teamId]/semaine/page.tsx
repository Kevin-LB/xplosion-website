import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { computeAthletePercent, formatWeekRange } from '@/lib/homeworkStats'

export const dynamic = 'force-dynamic'

export default async function SemaineHomeworksPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params

  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      athletes: { orderBy: { lastName: 'asc' } },
      homeworkWeeks: { orderBy: { weekStart: 'desc' }, include: { exercises: { include: { completions: true } } } },
    },
  })
  if (!team) return null

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-lg font-semibold text-ink">Vue par semaine</h2>
      {team.homeworkWeeks.map((week) => (
        <div key={week.id}>
          <div className="flex items-center justify-between mb-3 max-w-2xl">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-fire">{formatWeekRange(week.weekStart)}</h3>
            <Link
              href={`/coach/homeworks/${teamId}/enregistrer?week=${week.id}`}
              className="text-xs text-ink underline underline-offset-2"
            >
              Modifier →
            </Link>
          </div>
          <div className="border border-border bg-white divide-y divide-border max-w-2xl">
            {team.athletes.map((athlete) => {
              const pct = computeAthletePercent([week], athlete.id)
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
      {team.homeworkWeeks.length === 0 && <p className="text-sm text-muted">Aucune semaine enregistrée pour l&apos;instant.</p>}
    </div>
  )
}
