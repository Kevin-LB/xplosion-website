import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { PortalChrome } from '@/components/portal/PortalChrome'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') redirect('/login')

  return (
    <PortalChrome role="ADMIN" userName={session.user.name ?? ''}>
      {children}
    </PortalChrome>
  )
}
