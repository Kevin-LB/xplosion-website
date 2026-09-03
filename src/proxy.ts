
import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const role = req.auth?.user?.role
  const mustChangePassword = req.auth?.user?.mustChangePassword

  if (pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (pathname.startsWith('/coach') && role !== 'ADMIN' && role !== 'COACH') {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Compte créé par un admin avec un mot de passe provisoire : on bloque
  // tout le reste tant que l'utilisateur n'a pas choisi le sien.
  if (req.auth && mustChangePassword && pathname !== '/changer-mot-de-passe') {
    return NextResponse.redirect(new URL('/changer-mot-de-passe', req.nextUrl))
  }
})

export const config = {
  matcher: ['/admin/:path*', '/coach/:path*', '/portail', '/profil'],
}
