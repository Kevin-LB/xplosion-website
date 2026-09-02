'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/authz'
import { slugify } from '@/lib/slugify'
import { saveUploadedImage, isRealFile } from '@/lib/uploadImage'
import type { TeamStatus } from '@prisma/client'

function parseList(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function baseTeamData(formData: FormData) {
  return {
    name: String(formData.get('name') ?? ''),
    level: String(formData.get('level') ?? ''),
    category: String(formData.get('category') ?? ''),
    description: String(formData.get('description') ?? ''),
    longDescription: String(formData.get('longDescription') ?? '') || null,
    badge: String(formData.get('badge') ?? '') || null,
    status: String(formData.get('status') ?? 'ACTIVE') as TeamStatus,
    trainingDays: parseList(formData.get('trainingDays')),
  }
}

// Photo et galerie sont stockées dans public/images/equipes/<slug>/ —
// on garde l'image existante si aucun nouveau fichier n'a été déposé.
async function resolvePhoto(formData: FormData, slug: string): Promise<string | null> {
  const file = formData.get('photo')
  if (isRealFile(file)) return saveUploadedImage(file, `equipes/${slug}`)
  return String(formData.get('photoCurrent') ?? '') || null
}

async function resolveGallery(formData: FormData, slug: string): Promise<string[]> {
  const kept = formData.getAll('galleryKept').map(String).filter(Boolean)
  const newFiles = formData.getAll('gallery').filter(isRealFile)
  const uploaded = await Promise.all(newFiles.map((file) => saveUploadedImage(file, `equipes/${slug}`)))
  return [...kept, ...uploaded]
}

export async function createTeam(formData: FormData) {
  await requireAdmin()

  const base = baseTeamData(formData)
  const slug = slugify(base.name)
  const photo = await resolvePhoto(formData, slug)
  const gallery = await resolveGallery(formData, slug)

  await prisma.team.create({ data: { ...base, slug, photo, gallery } })

  revalidatePath('/admin/equipes')
  revalidatePath('/equipes')
  revalidatePath('/')
  redirect('/admin/equipes')
}

export async function updateTeam(teamId: string, formData: FormData) {
  await requireAdmin()

  const team = await prisma.team.findUnique({ where: { id: teamId }, select: { slug: true } })
  if (!team) throw new Error('Équipe introuvable')

  const base = baseTeamData(formData)
  const photo = await resolvePhoto(formData, team.slug)
  const gallery = await resolveGallery(formData, team.slug)

  await prisma.team.update({ where: { id: teamId }, data: { ...base, photo, gallery } })

  revalidatePath('/admin/equipes')
  revalidatePath('/equipes')
  revalidatePath('/')
  redirect('/admin/equipes')
}

export async function deleteTeam(teamId: string) {
  await requireAdmin()
  await prisma.team.delete({ where: { id: teamId } })
  revalidatePath('/admin/equipes')
  revalidatePath('/equipes')
  revalidatePath('/')
}

export async function addAthlete(teamId: string, formData: FormData) {
  await requireAdmin()

  const firstName = String(formData.get('firstName') ?? '').trim()
  const lastName = String(formData.get('lastName') ?? '').trim()
  const position = String(formData.get('position') ?? '').trim() || null
  if (!firstName || !lastName) throw new Error('Prénom et nom requis')

  await prisma.athlete.create({
    data: { firstName, lastName, position, teamId },
  })

  revalidatePath(`/admin/equipes/${teamId}`)
}

export async function removeAthlete(athleteId: string, teamId: string) {
  await requireAdmin()
  await prisma.athlete.delete({ where: { id: athleteId } })
  revalidatePath(`/admin/equipes/${teamId}`)
}

export async function setTeamCoaches(teamId: string, coachIds: string[]) {
  await requireAdmin()
  await prisma.team.update({
    where: { id: teamId },
    data: { coaches: { set: coachIds.map((id) => ({ id })) } },
  })
  revalidatePath(`/admin/equipes/${teamId}`)
}
