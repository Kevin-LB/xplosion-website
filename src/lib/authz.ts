import { auth } from '@/auth'

// Vérifications de rôle côté serveur — à appeler au début de chaque
// server action, même quand la page qui l'appelle est déjà protégée
// par un layout : une server action reste un point d'entrée public.

export async function requireAdmin() {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Non autorisé')
  }
  return session
}

export async function requireCoachOrAdmin() {
  const session = await auth()
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'COACH')) {
    throw new Error('Non autorisé')
  }
  return session
}
