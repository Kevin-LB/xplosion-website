import type { Metadata } from 'next'
import { PARTNERS, CLUB_INFO } from '@/lib/data'
import { HoverDiv, HoverAnchor } from '@/components/ui/Hover'

export const metadata: Metadata = { title: 'Partenaires' }

export default function PartenairesPage() {
  return (
    <div style={{ paddingTop: '60px' }}>
      <div style={{ background: 'var(--cream)', padding: 'var(--py) var(--px) 48px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Ils nous font confiance</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(36px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px' }}>
          Nos <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>partenaires</em>
        </h1>
      </div>
      <div style={{ padding: 'var(--py) var(--px)' }}>
        {/* auto-fill — no orphan cell on any screen size */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {PARTNERS.map(p => (
            <HoverDiv key={p.name} className="card-hover-bar"
              base={{ background: 'var(--white)', padding: '32px 24px', cursor: 'pointer', transition: 'background 0.2s' }}
              hovered={{ background: 'var(--cream)' }}>
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '8px' }}>{p.category}</div>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '20px', color: 'var(--ink)' }}>{p.name}</div>
            </HoverDiv>
          ))}
        </div>

        <div style={{ marginTop: '48px', background: 'var(--cream-2)', border: '1px solid var(--border)', padding: 'clamp(28px, 4vw, 48px) clamp(20px, 4vw, 40px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(18px, 3vw, 24px)', color: 'var(--ink)', marginBottom: '6px' }}>Devenir partenaire</h2>
            <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)' }}>Intéressé par un partenariat ? Contactez-nous.</p>
          </div>
          <HoverAnchor href="mailto:partenariats.aspttcheerleaders@gmail.com"
            base={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--ink)', color: '#fff', padding: '13px 28px', textDecoration: 'none', transition: 'background 0.2s', flexShrink: 0, display: 'inline-block' }}
            hovered={{ background: 'var(--fire)' }}>
            Nous contacter →
          </HoverAnchor>
        </div>
      </div>
    </div>
  )
}