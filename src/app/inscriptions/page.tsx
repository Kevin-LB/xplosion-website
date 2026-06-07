import type { Metadata } from 'next'
import { CLUB_INFO } from '@/lib/data'
import { HoverAnchor } from '@/components/ui/Hover'

export const metadata: Metadata = { title: 'Inscriptions 2026/27' }

const aFireBase = { display: 'block', textAlign: 'center' as const, fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const, background: 'white', color: 'var(--fire)', padding: '15px 40px', textDecoration: 'none', transition: 'background 0.2s' }
const aFireHovered = { background: 'var(--cream)' }

const CONTACT_ITEMS = [
  { label: 'Email',      value: CLUB_INFO.email, href: `mailto:${CLUB_INFO.email}` },
  { label: 'Téléphone',  value: CLUB_INFO.phone,  href: `tel:${CLUB_INFO.phone.replace(/\s/g,'')}` },
  { label: 'Adresse',    value: 'Gymnase Olympe de Gouges\n1 Pl. Albert Camus, 45100 Orléans', href: '#' },
  { label: 'Instagram',  value: '@xplosion_cheer_orleans', href: CLUB_INFO.instagram },
]

const SUMMER = [
  { price: '5 €',     label: 'Séance journalière', desc: "Accès à une séance. Assurance HelloAsso obligatoire.", hl: false },
  { price: '30 €',    label: 'Été complet',         desc: 'Accès illimité sur toute la période estivale.',        hl: false },
  { price: 'Gratuit', label: 'Licenciés',            desc: "Inclus dans la licence annuelle.",                     hl: true  },
]

export default function InscriptionsPage() {
  return (
    <div style={{ paddingTop: '64px' }}>

      {/* ── HEADER ── */}
      <div style={{ background: 'var(--cream)', padding: 'clamp(48px,8vw,80px) var(--px) clamp(32px,5vw,64px)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Saison 2026 / 2027</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px', marginBottom: '20px' }}>
          Nous <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>rejoindre</em>
        </h1>
        <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.8, maxWidth: '620px' }}>
          Les inscriptions pour la saison 2026/2027 ouvriront à la rentrée. En attendant, les{' '}
          <strong style={{ fontWeight: 500 }}>tryouts se déroulent dès maintenant</strong> — c'est votre première étape pour intégrer une équipe compétition.
        </p>
      </div>

      <div style={{ padding: 'clamp(40px,8vw,80px) var(--px)' }}>

        {/* ── TRYOUTS ── */}
        <div style={{
          background: 'var(--ink)',
          padding: 'clamp(28px,5vw,56px) clamp(20px,5vw,64px)',
          marginBottom: 'clamp(40px,8vw,80px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'clamp(20px,4vw,48px)',
          justifyContent: 'space-between',
        }}>
          <div style={{ flex: '1 1 260px', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '14px' }}>
              <span style={{ width: '14px', height: '1px', background: 'var(--fire-light)', display: 'block', flexShrink: 0 }} />
              Tryouts & Sélections · Prochaine date
            </div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(22px, 3.5vw, 36px)', color: 'white', lineHeight: 1.2, marginBottom: '14px' }}>
              Samedi <em style={{ fontStyle: 'italic', color: 'var(--fire-light)' }}>27 juin 2026</em>
            </h2>
            <p style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '24px' }}>
              Tryouts pour <strong style={{ color: 'white', fontWeight: 500 }}>Intensity</strong> (Seniors Coed Niv. 4) et <strong style={{ color: 'white', fontWeight: 500 }}>Ténacity</strong> (Seniors Niv. 3 — réouverture). Inscriptions via HelloAsso.
            </p>
            <HoverAnchor href="https://www.helloasso.com/associations/asptt-orleans-section-ski/evenements/tryouts-intensity-ioc4-2026-2027"
              target="_blank" rel="noopener noreferrer"
              base={aFireBase} hovered={aFireHovered}>
              S'inscrire aux tryouts →
            </HoverAnchor>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 900, fontSize: 'clamp(52px,10vw,80px)', color: 'var(--fire)', lineHeight: 1 }}>27</div>
            <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>Juin 2026</div>
          </div>
        </div>

        {/* ── GRILLE 2 COL desktop / 1 col mobile ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(32px,6vw,80px)',
          marginBottom: 'clamp(40px,8vw,80px)',
        }}>

          {/* Comment s'inscrire */}
          <div>
            <div className="label-caps" style={{ marginBottom: '20px' }}>Comment s'inscrire ?</div>
            <p style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.85, marginBottom: '16px' }}>
              L'inscription se fait directement en ligne sur HelloAsso.{' '}
              <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Toutes nos équipes compétition fonctionnent sur sélections</strong>{' '}
              — les coachs évaluent chaque athlète avant de valider l'intégration dans une équipe.
            </p>
            <p style={{ fontSize: 'clamp(13px,1.8vw,14px)', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.75, marginBottom: '24px' }}>
              Pour <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Fire</strong> et <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Silver Stars</strong>, inscrivez d'abord vos enfants aux sélections spécifiques, puis procédez à l'adhésion générale.
            </p>

            {/* Boutons — stack vertical, pleine largeur */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <HoverAnchor href="https://www.helloasso.com/associations/asptt-orleans-section-ski/adhesions/adhesion-section-cheerleading-2025-2026"
                target="_blank" rel="noopener noreferrer"
                base={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--ink)', color: '#fff', padding: '15px 24px', textDecoration: 'none', transition: 'background 0.2s' }}
                hovered={{ background: 'var(--fire)' }}>
                Inscription en ligne →
              </HoverAnchor>
              <HoverAnchor href="https://www.helloasso.com/associations/asptt-orleans-section-ski/evenements/selections-silverstar-2025-2026"
                target="_blank" rel="noopener noreferrer"
                base={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', padding: '13px 24px', textDecoration: 'none', border: '1px solid var(--border)', transition: 'border-color 0.2s' }}
                hovered={{ borderColor: 'var(--ink)' }}>
                Sélections Silver Stars
              </HoverAnchor>
              <HoverAnchor href="https://www.helloasso.com/associations/asptt-orleans-section-ski/evenements/selections-fire-2025-2026"
                target="_blank" rel="noopener noreferrer"
                base={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', padding: '13px 24px', textDecoration: 'none', border: '1px solid var(--border)', transition: 'border-color 0.2s' }}
                hovered={{ borderColor: 'var(--ink)' }}>
                Sélections Fire
              </HoverAnchor>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="label-caps" style={{ marginBottom: '20px' }}>Contact & infos</div>
            {CONTACT_ITEMS.map(item => (
              <a key={item.label} href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{ display: 'grid', gridTemplateColumns: 'clamp(80px,14vw,100px) 1fr', gap: '12px', padding: '16px 0', borderBottom: '1px solid var(--border-light)', textDecoration: 'none', alignItems: 'start' }}>
                <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', paddingTop: '2px' }}>
                  {item.label}
                </span>
                <span style={{ fontSize: 'clamp(12px,1.8vw,14px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.5, whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                  {item.value}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ── SUMMER TRAINING ── */}
        <div>
          <div className="label-caps" style={{ marginBottom: '16px' }}>Open Summer Training</div>
          <p style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '32px' }}>
            Durant les grandes vacances, le gymnase reste ouvert. Encadré par les coachs et athlètes du club.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {SUMMER.map(f => (
              <div key={f.label} style={{ background: f.hl ? 'var(--ink)' : 'var(--white)', padding: 'clamp(20px,3vw,36px) clamp(14px,2.5vw,28px)', position: 'relative' }}>
                {f.hl && (
                  <span style={{ position: 'absolute', top: '12px', right: '12px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 8px', background: 'var(--fire)', color: '#fff' }}>
                    Licenciés
                  </span>
                )}
                <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(24px,4vw,36px)', color: f.hl ? 'var(--white)' : 'var(--fire)', lineHeight: 1, marginBottom: '8px' }}>
                  {f.price}
                </div>
                <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: 'clamp(10px,1.5vw,13px)', letterSpacing: '1px', textTransform: 'uppercase', color: f.hl ? 'rgba(255,255,255,0.9)' : 'var(--ink)', marginBottom: '8px' }}>
                  {f.label}
                </div>
                <p style={{ fontSize: 'clamp(11px,1.5vw,13px)', fontWeight: 300, color: f.hl ? 'rgba(255,255,255,0.55)' : 'var(--muted)', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)', marginTop: '12px', fontStyle: 'italic' }}>
            Infos Summer Training diffusées sur la communauté WhatsApp du club.
          </p>
        </div>

      </div>
    </div>
  )
}