import { HoverLink, HoverAnchor } from '@/components/ui/Hover'
import { CLUB_INFO } from '@/lib/data'

const COLS = [
  {
    title: 'Le Club',
    links: [
      { label: 'À propos', href: '/#club' },
      { label: 'Nos équipes', href: '/equipes' },
      { label: 'Palmarès', href: '/palmares' },
      { label: 'Organisation', href: '/organisation' },
    ],
  },
  {
    title: 'Pratique',
    links: [
      { label: 'Inscriptions 2026/27', href: '/inscriptions' },
      { label: 'Entraînements', href: '/entrainements' },
      { label: 'Événements', href: '/evenements' },
      { label: 'Partenaires', href: '/partenaires' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: CLUB_INFO.email, href: `mailto:${CLUB_INFO.email}` },
      { label: CLUB_INFO.phone, href: `tel:${CLUB_INFO.phone.replace(/\s/g, '')}` },
      { label: 'Partenariats', href: 'mailto:partenariats.aspttcheerleaders@gmail.com' },
      { label: 'Devenir bénévole', href: `mailto:${CLUB_INFO.email}` },
    ],
  },
]

const linkBase = {
  fontSize: '13px',
  fontWeight: 300,
  color: 'rgba(255,255,255,0.55)',
  textDecoration: 'none',
  transition: 'color 0.2s',
} as const

const linkHovered = { color: 'rgba(255,255,255,1)' }

const socialBase = {
  fontFamily: 'var(--font-barlow-condensed), sans-serif',
  fontWeight: 500,
  fontSize: '10px',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.3)',
  textDecoration: 'none',
  transition: 'color 0.2s',
}
const socialHovered = { color: 'var(--fire-light)' }

export function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'white' }}>
      <div style={{ padding: '64px 64px 32px' }}>
        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '20px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
              Xplosion
            </div>
            <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '16px' }}>
              ASPTT Orléans · Training the Future
            </div>
            <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: '240px' }}>
              Club de cheerleading All-Star basé à Orléans. Fondé en 2015.
            </p>
            {/* Address */}
            <p style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, marginTop: '16px' }}>
              Gymnase Olympe de Gouges<br />
              45 ter rue des Montées<br />
              45100 Orléans
            </p>
          </div>

          {/* Nav columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map((l) => (
                  <HoverLink key={l.label} href={l.href} base={linkBase} hovered={linkHovered}>
                    {l.label}
                  </HoverLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px' }}>
            © 2026 Xplosion Cheerleaders Orléans — ASPTT Orléans
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { label: 'Instagram', href: CLUB_INFO.instagram },
              { label: 'TikTok', href: CLUB_INFO.tiktok },
              { label: 'Facebook', href: CLUB_INFO.facebook },
            ].map((s) => (
              <HoverAnchor key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" base={socialBase} hovered={socialHovered}>
                {s.label}
              </HoverAnchor>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}