import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatWeekRange } from '@/lib/homeworkStats'
import { createWeek, addExercise, removeExercise, toggleCompletion, deleteWeek } from '../../actions'
import { ConfirmButton } from '@/components/portal/ConfirmButton'

export const dynamic = 'force-dynamic'

export default async function EnregistrerPage({
  params,
  searchParams,
}: {
  params: Promise<{ teamId: string }>
  searchParams: Promise<{ week?: string }>
}) {
  const { teamId } = await params
  const { week: weekIdParam } = await searchParams

  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      athletes: { orderBy: { lastName: 'asc' } },
      homeworkWeeks: { orderBy: { weekStart: 'desc' }, select: { id: true, weekStart: true } },
    },
  })
  if (!team) return null

  const selectedWeekId = weekIdParam ?? team.homeworkWeeks[0]?.id ?? null

  const week = selectedWeekId
    ? await prisma.homeworkWeek.findUnique({
        where: { id: selectedWeekId },
        include: { exercises: { orderBy: { order: 'asc' }, include: { completions: true } } },
      })
    : null

  // completions[exerciseId][athleteId] = done
  const completions: Record<string, Record<string, boolean>> = {}
  if (week) {
    for (const exercise of week.exercises) {
      completions[exercise.id] = {}
      for (const completion of exercise.completions) {
        completions[exercise.id][completion.athleteId] = completion.done
      }
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {team.homeworkWeeks.map((w) => (
          <Link
            key={w.id}
            href={`/coach/homeworks/${team.id}/enregistrer?week=${w.id}`}
            className={`text-xs font-medium uppercase tracking-wider px-3 py-2 border ${
              w.id === selectedWeekId ? 'bg-ink text-white border-ink' : 'border-border text-muted hover:border-ink'
            }`}
          >
            {formatWeekRange(w.weekStart)}
          </Link>
        ))}
        <details className="relative">
          <summary className="text-xs font-medium uppercase tracking-wider px-3 py-2 border border-dashed border-border text-muted cursor-pointer list-none hover:border-ink">
            + Nouvelle semaine
          </summary>
          <form
            action={async (formData: FormData) => {
              'use server'
              await createWeek(team.id, formData)
            }}
            className="absolute left-0 z-10 mt-2 w-56 border border-border bg-white p-4 flex flex-col gap-2 shadow-sm"
          >
            <label className="text-xs font-medium uppercase tracking-wider text-muted">Semaine du (lundi)</label>
            <input name="weekStart" type="date" required className="border border-border px-3 py-2 text-sm" />
            <button type="submit" className="bg-ink text-white text-sm font-medium px-4 py-2 hover:bg-fire transition-colors">
              Créer
            </button>
          </form>
        </details>
      </div>

      {!week && (
        <p className="text-sm text-muted">Aucune semaine pour l&apos;instant — crée-en une pour commencer à suivre les homeworks.</p>
      )}

      {week && (
        <>
          <div className="overflow-x-auto border border-border bg-white mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted whitespace-nowrap">Athlète</th>
                  <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted whitespace-nowrap">Rôle</th>
                  {week.exercises.map((exercise) => (
                    <th key={exercise.id} className="px-3 py-3 font-medium text-xs uppercase tracking-wider text-muted whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {exercise.label}
                        <form
                          action={async () => {
                            'use server'
                            await removeExercise(exercise.id, team.id)
                          }}
                        >
                          <ConfirmButton confirmMessage={`Supprimer l'exercice "${exercise.label}" ?`} className="text-fire">
                            ✕
                          </ConfirmButton>
                        </form>
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 font-medium text-xs uppercase tracking-wider text-muted whitespace-nowrap">%</th>
                </tr>
              </thead>
              <tbody>
                {team.athletes.map((athlete) => {
                  const doneCount = week.exercises.filter((e) => completions[e.id]?.[athlete.id]).length
                  const pct = week.exercises.length > 0 ? Math.round((doneCount / week.exercises.length) * 100) : 0
                  return (
                    <tr key={athlete.id} className="border-b border-border-light">
                      <td className="px-4 py-2.5 text-ink whitespace-nowrap">
                        {athlete.firstName} {athlete.lastName}
                      </td>
                      <td className="px-4 py-2.5 text-muted whitespace-nowrap">{athlete.position ?? '—'}</td>
                      {week.exercises.map((exercise) => {
                        const done = completions[exercise.id]?.[athlete.id] ?? false
                        return (
                          <td key={exercise.id} className="px-3 py-2.5 text-center">
                            <form
                              action={async () => {
                                'use server'
                                await toggleCompletion(exercise.id, athlete.id, !done, team.id)
                              }}
                            >
                              <button
                                type="submit"
                                className={`w-5 h-5 border flex items-center justify-center text-xs mx-auto ${
                                  done ? 'bg-fire border-fire text-white' : 'border-border'
                                }`}
                              >
                                {done ? '✓' : ''}
                              </button>
                            </form>
                          </td>
                        )
                      })}
                      <td className="px-4 py-2.5 text-center font-medium text-ink whitespace-nowrap">{pct}%</td>
                    </tr>
                  )
                })}
                {team.athletes.length === 0 && (
                  <tr>
                    <td colSpan={week.exercises.length + 3} className="px-4 py-6 text-sm text-muted">
                      Aucun athlète dans cette équipe.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <form
              action={async (formData: FormData) => {
                'use server'
                await addExercise(week.id, team.id, formData)
              }}
              className="flex items-end gap-3"
            >
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-1.5">Nouvel exercice</label>
                <input name="label" required placeholder="Étirements, cardio…" className="border border-border px-3 py-2 text-sm" />
              </div>
              <button type="submit" className="border border-ink text-ink text-sm font-medium px-4 py-2 hover:bg-ink hover:text-white transition-colors">
                Ajouter
              </button>
            </form>

            <form
              action={async () => {
                'use server'
                await deleteWeek(week.id, team.id)
              }}
            >
              <ConfirmButton confirmMessage="Supprimer cette semaine et tous ses exercices ?" className="text-xs text-fire">
                Supprimer cette semaine
              </ConfirmButton>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
