'use server'

import { revalidatePath } from 'next/cache'
import type { Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/authz'
import { hashPassword } from '@/lib/password'

export async function createUser(formData: FormData) {
  await requireAdmin()

  const name = String(formData.get('name') ?? '').trim()
  const username = String(formData.get('username') ?? '').trim()
  const title = String(formData.get('title') ?? '').trim() || null
  const role = String(formData.get('role') ?? 'COACH') as Role
  const temporaryPassword = String(formData.get('temporaryPassword') ?? '')
  const teamIds = formData.getAll('teamIds').map(String)

  if (!name || !username || !temporaryPassword) {
    throw new Error('Nom, identifiant et mot de passe provisoire sont requis')
  }

  const passwordHash = await hashPassword(temporaryPassword)

  await prisma.user.create({
    data: {
      name,
      username,
      title,
      role,
      passwordHash,
      mustChangePassword: true,
      coachedTeams: teamIds.length > 0 ? { connect: teamIds.map((id) => ({ id })) } : undefined,
    },
  })

  revalidatePath('/admin/comptes')
}

export async function resetPassword(userId: string, formData: FormData) {
  await requireAdmin()

  const temporaryPassword = String(formData.get('temporaryPassword') ?? '')
  if (!temporaryPassword) throw new Error('Mot de passe provisoire requis')

  const target = await prisma.user.findUnique({ where: { id: userId }, select: { username: true } })
  if (target?.username === 'taga') {
    throw new Error('Le mot de passe du compte administrateur principal ne peut pas être réinitialisé ici')
  }

  const passwordHash = await hashPassword(temporaryPassword)
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash, mustChangePassword: true },
  })

  revalidatePath('/admin/comptes')
}

export async function deleteUser(userId: string) {
  const session = await requireAdmin()
  if (session.user.id === userId) {
    throw new Error('Impossible de supprimer son propre compte')
  }

  const target = await prisma.user.findUnique({ where: { id: userId }, select: { username: true } })
  if (target?.username === 'taga') {
    throw new Error('Le compte administrateur principal ne peut pas être supprimé')
  }

  await prisma.user.delete({ where: { id: userId } })
  revalidatePath('/admin/comptes')
}
