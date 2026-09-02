'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword } from '@/lib/password'

export async function updateProfile(_prevState: string | undefined, formData: FormData) {
  const session = await auth()
  if (!session) return 'Session expirée, reconnecte-toi.'

  const name = String(formData.get('name') ?? '').trim()
  const username = String(formData.get('username') ?? '').trim()
  const title = String(formData.get('title') ?? '').trim() || null
  if (!name || !username) return 'Nom et identifiant requis.'

  const existing = await prisma.user.findUnique({ where: { username } })
  if (existing && existing.id !== session.user.id) return 'Cet identifiant est déjà pris.'

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, username, title },
  })

  revalidatePath('/profil')
  return 'Informations mises à jour.'
}

export async function changePassword(_prevState: string | undefined, formData: FormData) {
  const session = await auth()
  if (!session) return 'Session expirée, reconnecte-toi.'

  const currentPassword = String(formData.get('currentPassword') ?? '')
  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirm') ?? '')

  if (!currentPassword || !password || !confirm) return 'Tous les champs sont requis.'
  if (password !== confirm) return 'Les deux nouveaux mots de passe ne correspondent pas.'

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return 'Utilisateur introuvable.'

  const valid = await verifyPassword(currentPassword, user.passwordHash)
  if (!valid) return 'Mot de passe actuel incorrect.'

  const passwordHash = await hashPassword(password)
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } })

  return 'Mot de passe changé.'
}
