import type { Metadata } from 'next'
import { CLUB_INFO } from '@/lib/data'
import { HoverAnchor } from '@/components/ui/Hover'

export const metadata: Metadata = { title: 'Inscriptions 2026/27' }

const aBase = { display: 'block', textAlign: 'center' as const, fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const, background: 'var(--ink)', color: '#fff', padding: '16px', textDecoration: 'none', transition: 'background 0.2s', width: '100%', boxSizing: 'border-box' as const }
const aHovered = { background: 'var(--fire)' }
const aOutBase = { display: 'block', textAlign: 'center' as const, fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' as const, background: 'transparent', color: 'var(--ink)', padding: '13px', textDecoration: 'none', border: '1px solid var(--border)', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box' as const }
const aOutHovered = { borderColor: 'var(--ink)' }

export default function InscriptionsPage() {
  const CONTACT_ITEMS = [
    { label: 'Email', value: CLUB_INFO.email, href: `mailto:${CLUB_INFO.email}` },
    { label: 'Téléphone', value: CLUB_INFO.phone, href: `tel:${CLUB_INFO.phone.replace(/\s/g, '')}` },
    { label: 'Adresse', value: 'Gymnase Olympe de Gouges\n1 Pl. Albert Camus, 45100 Orléans', href: '#' },
    { label: 'Instagram', value: '@xplosion_cheer_orleans', href: CLUB_INFO.instagram },
  ]

  return (
    <div style={{ paddingTop: '60px' }}>
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: 'var(--py) var(--px) 40px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '16px' }}>Saison 2026 / 2027</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(36px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px', marginBottom: '16px' }}>
          Nous <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>rejoindre</em>
        </h1>
        <p style={{ fontSize: '15px', fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.8, maxWidth: '580px' }}>
          Les inscriptions pour la saison 2026/2027 ouvriront à la rentrée. En attendant, les{' '}
          <strong style={{ fontWeight: 500 }}>tryouts se déroulent dès maintenant</strong> — c'est votre première étape pour intégrer une équipe compétition.
        </p>
      </div>

      <div style={{ padding: 'var(--py) var(--px)' }}>

        {/* TRYOUTS — bloc prioritaire */}
        <div style={{ background: 'var(--ink)', padding: 'clamp(28px, 5vw, 56px) clamp(20px, 5vw, 56px)', marginBottom: 'var(--py)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '14px' }}>
            <span style={{ width: '14px', height: '1px', background: 'var(--fire-light)', display: 'block' }} />
            Tryouts · Prochaine date
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(22px, 4vw, 36px)', color: 'white', lineHeight: 1.2, marginBottom: '12px' }}>
                Samedi <em style={{ fontStyle: 'italic', color: 'var(--fire-light)' }}>27 juin 2026</em>
              </h2>
              <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>
                Tryouts pour <strong style={{ color: 'white', fontWeight: 500 }}>Intensity</strong> (Seniors Coed Niv. 4) et <strong style={{ color: 'white', fontWeight: 500 }}>Ténacity</strong> (Seniors Niv. 3 — réouverture). Inscriptions via HelloAsso.
              </p>
            </div>
            {/* Date badge */}
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 900, fontSize: 'clamp(48px, 10vw, 72px)', color: 'var(--fire)', lineHeight: 1 }}>27</div>
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>Juin 2026</div>
            </div>
          </div>
          <HoverAnchor href="https://www.helloasso.com/associations/asptt-orleans-section-ski/evenements/tryouts-intensity-ioc4-2026-2027"
            target="_blank" rel="noopener noreferrer"
            base={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'white', color: 'var(--fire)', padding: '16px', textDecoration: 'none', transition: 'background 0.2s' }}
            hovered={{ background: 'var(--cream)' }}>
            S'inscrire aux tryouts →
          </HoverAnchor>
        </div>

        {/* Comment s'inscrire */}
        <div style={{ marginBottom: 'var(--py)' }}>
          <div className="label-caps" style={{ marginBottom: '16px' }}>Comment s'inscrire ?</div>
          <p style={{ fontSize: '15px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.85, marginBottom: '20px' }}>
            L'inscription se fait directement en ligne sur HelloAsso. <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Toutes nos équipes compétition fonctionnent sur sélections</strong> — les coachs évaluent chaque athlète avant de valider l'intégration.
          </p>
          <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.75, marginBottom: '24px' }}>
            Pour <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Fire</strong> et <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Silver Stars</strong>, inscrivez d'abord vos enfants aux sélections spécifiques, puis procédez à l'adhésion générale.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <HoverAnchor href="https://www.helloasso.com/associations/asptt-orleans-section-ski/adhesions/adhesion-section-cheerleading-2025-2026"
              target="_blank" rel="noopener noreferrer" base={aBase} hovered={aHovered}>
              Inscription en ligne →
            </HoverAnchor>
            <HoverAnchor href="https://www.helloasso.com/associations/asptt-orleans-section-ski/evenements/selections-silverstar-2025-2026"
              target="_blank" rel="noopener noreferrer" base={aOutBase} hovered={aOutHovered}>
              Sélections Silver Stars
            </HoverAnchor>
            <HoverAnchor href="https://www.helloasso.com/associations/asptt-orleans-section-ski/evenements/selections-fire-2025-2026"
              target="_blank" rel="noopener noreferrer" base={aOutBase} hovered={aOutHovered}>
              Sélections Fire
            </HoverAnchor>
          </div>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: 'var(--py)' }}>
          <div className="label-caps" style={{ marginBottom: '16px' }}>Contact & infos</div>
          <div>
            {CONTACT_ITEMS.map(item => (
              <a key={item.label} href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '12px', padding: '16px 0', borderBottom: '1px solid var(--border-light)', textDecoration: 'none' }}>
                <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', paddingTop: '2px' }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{item.value}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Summer Training */}
        <div>
          <div className="label-caps" style={{ marginBottom: '16px' }}>Open Summer Training</div>
          <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, marginBottom: '24px' }}>
            Durant les grandes vacances, le gymnase reste ouvert. Encadré par les coachs et athlètes du club.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { price: '5 €', label: 'La séance', hl: false },
              { price: '30 €', label: 'Tout l\'été', hl: false },
              { price: 'Gratuit', label: 'Licenciés', hl: true },
            ].map(f => (
              <div key={f.label} style={{ background: f.hl ? 'var(--ink)' : 'var(--white)', padding: 'clamp(20px, 3vw, 32px) clamp(14px, 2.5vw, 24px)' }}>
                <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(22px, 4vw, 32px)', color: f.hl ? 'var(--white)' : 'var(--fire)', lineHeight: 1, marginBottom: '6px' }}>{f.price}</div>
                <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: f.hl ? 'rgba(255,255,255,0.8)' : 'var(--ink)' }}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}