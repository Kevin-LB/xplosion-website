import { redirect } from 'next/navigation'
import { auth } from '@/auth'

// Point d'entrée unique après connexion — redirige vers le bon
// espace selon le rôle, pour que /login n'ait pas à le connaître.
export default async function PortailPage() {
  const session = await auth()
  if (!session) redirect('/login')
  redirect(session.user.role === 'ADMIN' ? '/admin' : '/coach')
}
