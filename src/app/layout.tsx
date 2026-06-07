import type { Metadata } from 'next'
import { Playfair_Display, Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Xplosion Cheerleaders Orléans',
    default: 'Xplosion Cheerleaders Orléans — Club All-Star ASPTT',
  },
  description:
    "Club de cheerleading All-Star basé à Orléans. Champions de France, qualifiés aux All Star Worlds. Rejoignez l'aventure Xplosion.",
  // Viewport via Next.js metadata — pas besoin de balise manuelle
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${barlow.variable} ${barlowCondensed.variable}`}
      style={{
        overflowX: 'hidden',
        maxWidth: '100vw',
      }}
    >
      <body
        style={{
          fontFamily: 'var(--font-barlow), system-ui, sans-serif',
          fontWeight: 300,
          overflowX: 'hidden',
          maxWidth: '100vw',
          margin: 0,
          padding: 0,
        }}
      >
        <Navbar />
        <main style={{ overflowX: 'hidden' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}