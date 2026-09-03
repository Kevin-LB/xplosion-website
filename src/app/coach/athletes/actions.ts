'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireCoachOrAdmin } from '@/lib/authz'

// Un coach a les mêmes droits qu'un admin sur les athlètes (demande
// explicite) — même logique que src/app/admin/athletes/actions.ts, juste
// accessible sans être admin et redirigeant vers le portail coach.

function athleteDataFromForm(formData: FormData) {
  const firstName = String(formData.get('firstName') ?? '').trim()
  const lastName = String(formData.get('lastName') ?? '').trim()
  const position = String(formData.get('position') ?? '').trim() || null
  const birthDateRaw = String(formData.get('birthDate') ?? '')
  if (!firstName || !lastName) throw new Error('Prénom et nom requis')

  return {
    firstName,
    lastName,
    position,
    birthDate: birthDateRaw ? new Date(birthDateRaw) : null,
  }
}

export async function createAthleteAsCoach(formData: FormData) {
  await requireCoachOrAdmin()

  const data = athleteDataFromForm(formData)
  const teamIds = formData.getAll('teamIds').map(String)

  await prisma.athlete.create({
    data: { ...data, teams: { connect: teamIds.map((id) => ({ id })) } },
  })

  revalidatePath('/coach/athletes')
  redirect('/coach/athletes')
}

export async function updateAthleteAsCoach(athleteId: string, formData: FormData) {
  await requireCoachOrAdmin()

  const data = athleteDataFromForm(formData)
  const teamIds = formData.getAll('teamIds').map(String)

  await prisma.athlete.update({
    where: { id: athleteId },
    data: { ...data, teams: { set: teamIds.map((id) => ({ id })) } },
  })

  revalidatePath('/coach/athletes')
  revalidatePath(`/coach/athletes/${athleteId}`)
  redirect('/coach/athletes')
}

export async function deleteAthleteAsCoach(athleteId: string) {
  await requireCoachOrAdmin()
  await prisma.athlete.delete({ where: { id: athleteId } })
  revalidatePath('/coach/athletes')
  // Sans redirect, supprimer depuis la fiche de l'athlète la refait
  // recharger — or elle n'existe plus, d'où un 404.
  redirect('/coach/athletes')
}
