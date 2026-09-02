import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { ProfileForms } from './ProfileForms'

export const dynamic = 'force-dynamic'

export default async function ProfilPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) redirect('/login')

  const backHref = session.user.role === 'ADMIN' ? '/admin' : '/coach'

  return (
    <div className="min-h-screen bg-cream px-6 sm:px-12 py-10">
      <div className="max-w-4xl mx-auto">
        <Link href={backHref} className="text-xs text-muted underline underline-offset-2 mb-6 inline-block">
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold text-ink mb-8">Mes informations</h1>
        <ProfileForms name={user.name} username={user.username} title={user.title ?? ''} />
      </div>
    </div>
  )
}
