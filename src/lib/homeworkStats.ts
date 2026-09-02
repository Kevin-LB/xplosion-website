type WeekWithData = {
  weekStart: Date
  exercises: { completions: { athleteId: string; done: boolean }[] }[]
}

// % de complétion d'un athlète sur un ensemble de semaines (toutes
// confondues) — utilisé pour les vues globale / par mois / par semaine.
export function computeAthletePercent(weeks: WeekWithData[], athleteId: string): number {
  let total = 0
  let done = 0
  for (const week of weeks) {
    for (const exercise of week.exercises) {
      total++
      if (exercise.completions.find((c) => c.athleteId === athleteId)?.done) done++
    }
  }
  return total > 0 ? Math.round((done / total) * 100) : 0
}

export function formatWeekRange(weekStart: Date): string {
  const end = new Date(weekStart)
  end.setDate(end.getDate() + 6)
  const fmt = (d: Date) => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  return `${fmt(weekStart)} – ${fmt(end)}`
}

export function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`
}

export function monthLabel(date: Date): string {
  const label = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  return label.charAt(0).toUpperCase() + label.slice(1)
}
