import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { PortalChrome } from '@/components/portal/PortalChrome'

export default async function CoachLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || (session.user.role !== 'COACH' && session.user.role !== 'ADMIN')) redirect('/login')

  return (
    <PortalChrome role="COACH" userName={session.user.name ?? ''}>
      {children}
    </PortalChrome>
  )
}
