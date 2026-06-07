import { HoverLink, HoverAnchor } from '@/components/ui/Hover'
import { CLUB_INFO } from '@/lib/data'

const COLS = [
  {
    title: 'Le Club',
    links: [
      { label: 'Nos équipes', href: '/equipes' },
      { label: 'Palmarès', href: '/palmares' },
      { label: 'Organisation', href: '/organisation' },
      { label: 'Partenaires', href: '/partenaires' },
    ],
  },
  {
    title: 'Pratique',
    links: [
      { label: 'Inscriptions', href: '/inscriptions' },
      { label: 'Entraînements', href: '/entrainements' },
      { label: 'Événements', href: '/evenements' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Email club', href: `mailto:${CLUB_INFO.email}` },
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
  wordBreak: 'break-word' as const,
  overflowWrap: 'break-word' as const,
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
      <div style={{ padding: 'var(--py) var(--px) 32px' }}>

        {/* Brand */}
        <div style={{ marginBottom: '36px', paddingBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '20px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
            Xplosion
          </div>
          <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '12px' }}>
            ASPTT Orléans · Training the Future
          </div>
          <p style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
            Gymnase Olympe de Gouges<br />
            1 Pl. Albert Camus, 45100 Orléans
          </p>
        </div>

        {/* Nav columns — wrap nicely on mobile */}
        <div style={{
          display: 'grid',
          /* On mobile: 2 colonnes. On desktop: 3 colonnes */
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '28px',
          paddingBottom: '36px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {COLS.map((col) => (
            <div key={col.title} style={{ minWidth: 0 /* prevents overflow */ }}>
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '14px' }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((l) => (
                  <HoverLink
                    key={l.label}
                    href={l.href}
                    base={linkBase}
                    hovered={linkHovered}
                  >
                    {l.label}
                  </HoverLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', gap: '16px' }}>
          <span style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.2)', wordBreak: 'break-word' }}>
            © 2026 Xplosion Cheerleaders Orléans
          </span>
          <div style={{ display: 'flex', gap: '16px', flexShrink: 0 }}>
            {[
              { label: 'Instagram', href: CLUB_INFO.instagram },
              { label: 'TikTok', href: CLUB_INFO.tiktok },
              { label: 'Facebook', href: CLUB_INFO.facebook },
            ].map((s) => (
              <HoverAnchor
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                base={socialBase}
                hovered={socialHovered}
              >
                {s.label}
              </HoverAnchor>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}