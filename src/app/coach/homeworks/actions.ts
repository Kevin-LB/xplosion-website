'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireCoachOrAdmin } from '@/lib/authz'
import { assertCanAccessTeam } from '@/lib/coachAccess'

function revalidateTeamHomeworks(teamId: string) {
  // Revalide les 4 onglets (global / mois / semaine / enregistrer) d'un coup.
  revalidatePath(`/coach/homeworks/${teamId}`, 'layout')
}

export async function createWeek(teamId: string, formData: FormData) {
  const session = await requireCoachOrAdmin()
  await assertCanAccessTeam(teamId, session)

  const weekStartRaw = String(formData.get('weekStart') ?? '')
  if (!weekStartRaw) throw new Error('Date de semaine requise')

  const week = await prisma.homeworkWeek.upsert({
    where: { teamId_weekStart: { teamId, weekStart: new Date(weekStartRaw) } },
    update: {},
    create: { teamId, weekStart: new Date(weekStartRaw), createdById: session.user.id },
  })

  revalidateTeamHomeworks(teamId)
  redirect(`/coach/homeworks/${teamId}/enregistrer?week=${week.id}`)
}

export async function addExercise(weekId: string, teamId: string, formData: FormData) {
  const session = await requireCoachOrAdmin()
  await assertCanAccessTeam(teamId, session)

  const label = String(formData.get('label') ?? '').trim()
  if (!label) throw new Error("Nom de l'exercice requis")

  const count = await prisma.homeworkExercise.count({ where: { weekId } })
  await prisma.homeworkExercise.create({ data: { weekId, label, order: count } })

  revalidateTeamHomeworks(teamId)
}

export async function removeExercise(exerciseId: string, teamId: string) {
  const session = await requireCoachOrAdmin()
  await assertCanAccessTeam(teamId, session)

  await prisma.homeworkExercise.delete({ where: { id: exerciseId } })

  revalidateTeamHomeworks(teamId)
}

export async function toggleCompletion(exerciseId: string, athleteId: string, done: boolean, teamId: string) {
  const session = await requireCoachOrAdmin()
  await assertCanAccessTeam(teamId, session)

  await prisma.homeworkCompletion.upsert({
    where: { exerciseId_athleteId: { exerciseId, athleteId } },
    update: { done, completedAt: done ? new Date() : null },
    create: { exerciseId, athleteId, done, completedAt: done ? new Date() : null },
  })

  revalidateTeamHomeworks(teamId)
}

export async function deleteWeek(weekId: string, teamId: string) {
  const session = await requireCoachOrAdmin()
  await assertCanAccessTeam(teamId, session)

  await prisma.homeworkWeek.delete({ where: { id: weekId } })

  revalidateTeamHomeworks(teamId)
  redirect(`/coach/homeworks/${teamId}/enregistrer`)
}
