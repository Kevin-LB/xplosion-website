'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/authz'

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

export async function createAthlete(formData: FormData) {
  await requireAdmin()

  const data = athleteDataFromForm(formData)
  const teamIds = formData.getAll('teamIds').map(String)

  await prisma.athlete.create({
    data: { ...data, teams: { connect: teamIds.map((id) => ({ id })) } },
  })

  revalidatePath('/admin/athletes')
  redirect('/admin/athletes')
}

export async function updateAthlete(athleteId: string, formData: FormData) {
  await requireAdmin()

  const data = athleteDataFromForm(formData)
  const teamIds = formData.getAll('teamIds').map(String)

  await prisma.athlete.update({
    where: { id: athleteId },
    data: { ...data, teams: { set: teamIds.map((id) => ({ id })) } },
  })

  revalidatePath('/admin/athletes')
  revalidatePath(`/admin/athletes/${athleteId}`)
  redirect('/admin/athletes')
}

export async function deleteAthlete(athleteId: string) {
  await requireAdmin()
  await prisma.athlete.delete({ where: { id: athleteId } })
  revalidatePath('/admin/athletes')
}
