'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireCoachOrAdmin } from '@/lib/authz'
import { assertCanAccessTeam } from '@/lib/coachAccess'
import { saveUploadedImage, isRealFile } from '@/lib/uploadImage'

export async function addAthlete(teamId: string, formData: FormData) {
  const session = await requireCoachOrAdmin()
  await assertCanAccessTeam(teamId, session)

  const firstName = String(formData.get('firstName') ?? '').trim()
  const lastName = String(formData.get('lastName') ?? '').trim()
  const position = String(formData.get('position') ?? '').trim() || null
  if (!firstName || !lastName) throw new Error('Prénom et nom requis')

  await prisma.athlete.create({ data: { firstName, lastName, position, teamId } })

  revalidatePath(`/coach/equipes/${teamId}`)
}

export async function removeAthlete(athleteId: string, teamId: string) {
  const session = await requireCoachOrAdmin()
  await assertCanAccessTeam(teamId, session)

  await prisma.athlete.delete({ where: { id: athleteId } })

  revalidatePath(`/coach/equipes/${teamId}`)
}

export async function addTeamPhotos(teamId: string, formData: FormData) {
  const session = await requireCoachOrAdmin()
  await assertCanAccessTeam(teamId, session)

  const team = await prisma.team.findUnique({ where: { id: teamId }, select: { slug: true, gallery: true } })
  if (!team) throw new Error('Équipe introuvable')

  const files = formData.getAll('photos').filter(isRealFile)
  if (files.length === 0) return

  const uploaded = await Promise.all(files.map((file) => saveUploadedImage(file, `equipes/${team.slug}`)))

  await prisma.team.update({
    where: { id: teamId },
    data: { gallery: [...team.gallery, ...uploaded] },
  })

  revalidatePath(`/coach/equipes/${teamId}`)
  revalidatePath('/equipes')
}
