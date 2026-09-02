'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

// Ces routes ont leur propre en-tête (portails privés, écrans d'auth) —
// pas la nav/footer du site public par-dessus.
const PRIVATE_PREFIXES = ['/admin', '/coach', '/login', '/changer-mot-de-passe', '/profil', '/portail']

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPrivate = PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))

  if (isPrivate) return <>{children}</>

  return (
    <>
      <Navbar />
      <main style={{ overflowX: 'hidden' }}>{children}</main>
      <Footer />
    </>
  )
}
