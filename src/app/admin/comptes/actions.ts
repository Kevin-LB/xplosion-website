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

  if (!name || !username || !temporaryPassword) {
    throw new Error('Nom, identifiant et mot de passe provisoire sont requis')
  }

  const passwordHash = await hashPassword(temporaryPassword)

  await prisma.user.create({
    data: { name, username, title, role, passwordHash, mustChangePassword: true },
  })

  revalidatePath('/admin/comptes')
}

export async function resetPassword(userId: string, formData: FormData) {
  await requireAdmin()

  const temporaryPassword = String(formData.get('temporaryPassword') ?? '')
  if (!temporaryPassword) throw new Error('Mot de passe provisoire requis')

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

  await prisma.user.delete({ where: { id: userId } })
  revalidatePath('/admin/comptes')
}
