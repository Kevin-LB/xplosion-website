import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { SignOutButton } from '@/components/portal/SignOutButton'

const NAV = [
  { label: 'Tableau de bord', href: '/coach' },
  { label: 'Équipes', href: '/coach/equipes' },
  { label: 'Actualités', href: '/coach/actualites' },
  { label: 'Homeworks', href: '/coach/homeworks' },
]

export default async function CoachLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || (session.user.role !== 'COACH' && session.user.role !== 'ADMIN')) redirect('/login')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px clamp(20px,4vw,48px)', background: 'var(--ink)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '4px' }}>
            Espace Coach
          </div>
          <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '18px', color: 'white' }}>
            {session.user.name}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/profil" style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
            Mes informations
          </Link>
          <SignOutButton />
        </div>
      </header>
      <nav className="flex gap-6 px-6 sm:px-12 border-b border-border bg-white">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-ink py-4 border-b-2 border-transparent hover:border-fire transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <main style={{ padding: 'clamp(24px,4vw,48px)' }}>{children}</main>
    </div>
  )
}
