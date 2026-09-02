'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'

export async function authenticate(_prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirectTo: '/portail',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Identifiant ou mot de passe incorrect.'
    }
    throw error
  }
}
