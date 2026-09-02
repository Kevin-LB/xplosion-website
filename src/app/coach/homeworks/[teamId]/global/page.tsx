import { prisma } from '@/lib/prisma'
import { computeAthletePercent } from '@/lib/homeworkStats'

export const dynamic = 'force-dynamic'

export default async function GlobalHomeworksPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params

  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      athletes: { orderBy: { lastName: 'asc' } },
      homeworkWeeks: { include: { exercises: { include: { completions: true } } } },
    },
  })
  if (!team) return null

  return (
    <div>
      <h2 className="text-lg font-semibold text-ink mb-1">Vue globale — saison complète</h2>
      <p className="text-sm text-muted mb-6">
        {team.homeworkWeeks.length} semaine{team.homeworkWeeks.length !== 1 ? 's' : ''} enregistrée
        {team.homeworkWeeks.length !== 1 ? 's' : ''}.
      </p>

      <div className="border border-border bg-white divide-y divide-border max-w-2xl">
        {team.athletes.map((athlete) => {
          const pct = computeAthletePercent(team.homeworkWeeks, athlete.id)
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
  )
}
