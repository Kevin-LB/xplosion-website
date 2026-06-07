import type { Metadata } from 'next'
import { PARTNERS, CLUB_INFO } from '@/lib/data'
import { HoverDiv, HoverAnchor } from '@/components/ui/Hover'
export const metadata: Metadata = { title: 'Partenaires' }
export default function PartenairesPage() {
  return (
    <div style={{ paddingTop: '64px' }}>
      <div style={{ background: 'var(--cream)', padding: '80px 64px 64px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Ils nous font confiance</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px' }}>
          Nos <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>partenaires</em>
        </h1>
      </div>
      <div style={{ padding: '80px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {PARTNERS.map(p => (
            <HoverDiv key={p.name} className="card-hover-bar" base={{ background: 'var(--white)', padding: '48px 32px', cursor: 'pointer', transition: 'background 0.2s' }} hovered={{ background: 'var(--cream)' }}>
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '10px' }}>{p.category}</div>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '22px', color: 'var(--ink)' }}>{p.name}</div>
            </HoverDiv>
          ))}
        </div>
        <div style={{ marginTop: '56px', background: 'var(--cream-2)', border: '1px solid var(--border)', padding: '48px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '24px', color: 'var(--ink)', marginBottom: '8px' }}>Devenir partenaire</h2>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)' }}>Intéressé par un partenariat avec Xplosion ? Contactez-nous.</p>
          </div>
          <HoverAnchor href={`mailto:${CLUB_INFO.email}`} base={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--ink)', color: '#fff', padding: '14px 36px', textDecoration: 'none', transition: 'background 0.2s', flexShrink: 0 }} hovered={{ background: 'var(--fire)' }}>
            Nous contacter →
          </HoverAnchor>
        </div>
      </div>
    </div>
  )
}