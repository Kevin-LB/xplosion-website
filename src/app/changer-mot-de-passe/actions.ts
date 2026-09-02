'use server'

import { auth, signIn } from '@/auth'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'

export async function setInitialPassword(_prevState: string | undefined, formData: FormData) {
  const session = await auth()
  if (!session) return 'Session expirée, reconnecte-toi.'

  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirm') ?? '')

  if (!password || !confirm) return 'Renseigne le mot de passe dans les deux champs.'
  if (password !== confirm) return 'Les deux mots de passe ne correspondent pas.'

  const passwordHash = await hashPassword(password)

  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash, mustChangePassword: false },
  })

  // On reconnecte immédiatement avec le nouveau mot de passe pour obtenir
  // une session à jour (mustChangePassword: false) sans repasser par /login.
  await signIn('credentials', {
    username: session.user.username,
    password,
    redirectTo: '/portail',
  })
}
