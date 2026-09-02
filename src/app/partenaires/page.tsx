import type { Metadata } from 'next'
import Image from 'next/image'
import { CLUB_INFO } from '@/lib/data'
import { HoverDiv, HoverAnchor } from '@/components/ui/Hover'

export const metadata: Metadata = { title: 'Partenaires' }

const PRIVATE_PARTNERS = [
  { name: 'Orléans Loiret Basket', category: 'Sport' },
  { name: 'Groupama', category: 'Assurance' },
  { name: 'Les Panthères', category: 'Sport' },
  { name: 'Rugby Club Orléans', category: 'Sport' },
  { name: 'SwissLife', category: 'Finance' },
  { name: 'Gilbert Autret Architecture', category: 'Architecture' },
  { name: 'MG BR', category: 'Partenaire' },
]

const INSTITUTIONAL = [
  { name: 'ASPTT Orléans', category: 'Association', logo: '/images/asptt.png', desc: 'Structure omnisports qui nous accueille depuis 2018 et nous permet de bénéficier d\'infrastructures de qualité.' },
  { name: 'Mairie d\'Orléans', category: 'Subvention annuelle', logo: null, desc: 'La Ville d\'Orléans nous soutient chaque année par une subvention au titre des associations sportives.' },
  { name: 'Département du Loiret', category: 'Subvention exceptionnelle', logo: null, desc: 'Le Conseil Départemental du Loiret nous a accordé une belle subvention exceptionnelle, témoignant de sa confiance dans notre projet.' },
]

export default function PartenairesPage() {
  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: 'clamp(48px,8vw,80px) var(--px) clamp(32px,5vw,64px)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Ils nous font confiance</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(36px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px', marginBottom: '16px' }}>
          Nos <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>partenaires</em>
        </h1>
        <p style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, maxWidth: '560px' }}>
          Le développement du club repose sur la confiance de partenaires engagés, qui partagent nos valeurs de performance et d'ambition.
        </p>
      </div>

      <div style={{ padding: 'clamp(40px,8vw,80px) var(--px)' }}>

        {/* ── Institutionnels & subventionneurs ── */}
        <div className="label-caps" style={{ marginBottom: '20px' }}>Soutiens institutionnels</div>
        <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(24px,4vw,40px)', lineHeight: 1.1, marginBottom: '32px' }}>
          Ceux qui nous <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>soutiennent</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '64px' }}>
          {INSTITUTIONAL.map((p) => (
            <div key={p.name} style={{ background: 'var(--white)', padding: 'clamp(24px,3vw,40px) clamp(20px,3vw,32px)' }}>
              {p.logo && (
                <Image src={p.logo} alt={p.name} width={2571} height={1793}
                  style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block', marginBottom: '16px', filter: 'none' }} />
              )}
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '8px' }}>
                {p.category}
              </div>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(18px,2.5vw,22px)', color: 'var(--ink)', marginBottom: '10px' }}>
                {p.name}
              </div>
              <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.7 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Partenaires privés ── */}
        <div className="label-caps" style={{ marginBottom: '20px' }}>Partenaires & sponsors</div>
        <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(24px,4vw,40px)', lineHeight: 1.1, marginBottom: '32px' }}>
          Nos <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>partenaires</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '64px' }}>
          {PRIVATE_PARTNERS.map((p) => (
            <HoverDiv key={p.name} className="card-hover-bar"
              base={{ background: 'var(--white)', padding: 'clamp(24px,3vw,36px) clamp(16px,2.5vw,28px)', cursor: 'pointer', transition: 'background 0.2s' }}
              hovered={{ background: 'var(--cream)' }}>
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '8px' }}>
                {p.category}
              </div>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(16px,2vw,20px)', color: 'var(--ink)' }}>
                {p.name}
              </div>
            </HoverDiv>
          ))}
        </div>

        {/* ── Remerciements bénévoles & parents ── */}
        <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', padding: 'clamp(28px,4vw,48px) clamp(20px,4vw,40px)', marginBottom: '48px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <span style={{ fontSize: '28px', flexShrink: 0, marginTop: '2px' }}>❤️</span>
          <div>
            <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(18px,2.5vw,24px)', color: 'var(--ink)', marginBottom: '10px' }}>
              Merci aux bénévoles, parents & proches
            </h3>
            <p style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8 }}>
              Xplosion, c'est avant tout des hommes et des femmes engagés bénévolement. Un immense merci à tous les <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>parents</strong>, les <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>proches</strong> et les <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>bénévoles</strong> qui font vivre le club au quotidien — sans vous, rien de tout cela ne serait possible.
            </p>
          </div>
        </div>

        {/* ── CTA devenir partenaire ── */}
        <div style={{ background: 'var(--ink)', padding: 'clamp(28px,4vw,48px) clamp(20px,4vw,40px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(18px,3vw,24px)', color: 'white', marginBottom: '6px' }}>
              Devenir partenaire
            </h2>
            <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.55)' }}>
              Intéressé par un partenariat ? Contactez-nous.
            </p>
          </div>
          <HoverAnchor href="mailto:partenariats.aspttcheerleaders@gmail.com"
            base={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--fire)', color: '#fff', padding: '13px 28px', textDecoration: 'none', flexShrink: 0, display: 'inline-block', transition: 'background 0.2s' }}
            hovered={{ background: 'var(--fire-light)' }}>
            Nous contacter →
          </HoverAnchor>
        </div>

      </div>
    </div>
  )
}