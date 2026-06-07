import type { Metadata } from 'next'
import { CLUB_INFO } from '@/lib/data'
import { HoverAnchor } from '@/components/ui/Hover'

export const metadata: Metadata = { title: 'Inscriptions 2025/26' }

const aBase = { display: 'inline-block', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const, background: 'var(--ink)', color: '#fff', padding: '14px 36px', textDecoration: 'none', transition: 'background 0.2s' }
const aHovered = { background: 'var(--fire)' }
const aOutBase = { display: 'inline-block', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' as const, background: 'transparent', color: 'var(--ink)', padding: '10px 20px', textDecoration: 'none', border: '1px solid var(--border)', transition: 'border-color 0.2s' }
const aOutHovered = { borderColor: 'var(--ink)' }
const aFireBase = { display: 'inline-block', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const, background: 'white', color: 'var(--fire)', padding: '15px 40px', textDecoration: 'none', transition: 'background 0.2s' }
const aFireHovered = { background: 'var(--cream)' }

export default function InscriptionsPage() {
  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: '80px 64px 64px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Saison 2026 / 2027</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px', marginBottom: '24px' }}>
          Nous <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>rejoindre</em>
        </h1>
        <p style={{ fontSize: '16px', fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.8, maxWidth: '620px' }}>
          Les inscriptions pour la saison 2026/2027 ouvriront à la rentrée de septembre. En attendant, les <strong style={{ fontWeight: 500 }}>tryouts se déroulent dès maintenant</strong> — c'est votre première étape pour intégrer une équipe compétition.
        </p>
      </div>

      <div style={{ padding: '80px 64px' }}>

        {/* TRYOUTS — block prioritaire */}
        <div style={{ background: 'var(--ink)', padding: '56px 64px', marginBottom: '80px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '16px' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--fire-light)', display: 'block' }} />
              Tryouts & Sélections · Prochaine date
            </div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>
              Samedi <em style={{ fontStyle: 'italic', color: 'var(--fire-light)' }}>27 juin 2026</em>
            </h2>
            <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: '500px', marginBottom: '28px' }}>
              Tryouts ouverts pour <strong style={{ color: 'white', fontWeight: 500 }}>Intensity</strong> (Seniors Coed Niveau 4) et <strong style={{ color: 'white', fontWeight: 500 }}>Tenacity</strong> (Seniors Niveau 3 — réouverture de l'équipe). Inscrivez-vous via HelloAsso :
            </p>
            <HoverAnchor
              href="https://www.helloasso.com/associations/asptt-orleans-section-ski/evenements/tryouts-intensity-ioc4-2026-2027"
              target="_blank" rel="noopener noreferrer"
              base={aFireBase} hovered={aFireHovered}
            >
              S'inscrire aux tryouts →
            </HoverAnchor>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 900, fontSize: '80px', color: 'var(--fire)', lineHeight: 1 }}>27</div>
            <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>Juin 2026</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '80px' }}>

          {/* Comment s'inscrire */}
          <div>
            <div className="label-caps" style={{ marginBottom: '20px' }}>Comment s'inscrire ?</div>
            <p style={{ fontSize: '15px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.85, marginBottom: '28px' }}>
              L'inscription se fait directement en ligne sur HelloAsso. <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Toutes nos équipes compétition fonctionnent sur sélections</strong> — les coachs évaluent chaque athlète avant de valider l'intégration dans une équipe.
            </p>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.75, marginBottom: '28px' }}>
              Pour les équipes <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Fire</strong> et <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Silver Stars</strong>, inscrivez d'abord vos enfants aux sélections spécifiques via les liens ci-dessous, avant de procéder à l'adhésion générale.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <HoverAnchor
                href="https://www.helloasso.com/associations/asptt-orleans-section-ski/adhesions/adhesion-section-cheerleading-2025-2026"
                target="_blank" rel="noopener noreferrer"
                base={aBase} hovered={aHovered}
              >
                Inscription en ligne →
              </HoverAnchor>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <HoverAnchor href="https://www.helloasso.com/associations/asptt-orleans-section-ski/evenements/selections-silverstar-2025-2026" target="_blank" rel="noopener noreferrer" base={aOutBase} hovered={aOutHovered}>
                  Sélections Silver Stars
                </HoverAnchor>
                <HoverAnchor href="https://www.helloasso.com/associations/asptt-orleans-section-ski/evenements/selections-fire-2025-2026" target="_blank" rel="noopener noreferrer" base={aOutBase} hovered={aOutHovered}>
                  Sélections Fire
                </HoverAnchor>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="label-caps" style={{ marginBottom: '20px' }}>Contact & infos</div>
            {[
              { label: 'Email', value: CLUB_INFO.email, href: `mailto:${CLUB_INFO.email}` },
              { label: 'Téléphone', value: CLUB_INFO.phone, href: `tel:${CLUB_INFO.phone.replace(/\s/g, '')}` },
              { label: 'Adresse', value: CLUB_INFO.address, href: '#' },
              { label: 'Instagram', value: '@xplosion_cheer_orleans', href: CLUB_INFO.instagram },
            ].map(item => (
              <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '16px', padding: '18px 0', borderBottom: '1px solid var(--border-light)', textDecoration: 'none' }}>
                <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 300, color: 'var(--ink)' }}>{item.value}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Open Summer Training */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '64px' }}>
          <div className="label-caps" style={{ marginBottom: '20px' }}>Open Summer Training</div>
          <p style={{ fontSize: '15px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '40px' }}>
            Durant les grandes vacances, le gymnase reste ouvert. Un programme d'entraînement accessible à tous, encadré par les coachs et athlètes du club.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { price: '5 €', label: 'Séance journalière', desc: "Accès à une séance d'entraînement estival. Assurance HelloAsso obligatoire.", hl: false },
              { price: '30 €', label: 'Été complet', desc: 'Accès illimité sur toute la période estivale. Assurance HelloAsso obligatoire.', hl: false },
              { price: 'Gratuit', label: 'Pour les licenciés', desc: "L'accès au gymnase durant tout l'été est inclus dans la licence annuelle.", hl: true },
            ].map(f => (
              <div key={f.label} style={{ background: f.hl ? 'var(--ink)' : 'var(--white)', padding: '36px 28px', position: 'relative' }}>
                {f.hl && <span style={{ position: 'absolute', top: '16px', right: '16px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 10px', background: 'var(--fire)', color: '#fff' }}>Licenciés</span>}
                <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '36px', color: f.hl ? 'var(--white)' : 'var(--fire)', lineHeight: 1, marginBottom: '10px' }}>{f.price}</div>
                <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', color: f.hl ? 'rgba(255,255,255,0.9)' : 'var(--ink)', marginBottom: '10px' }}>{f.label}</div>
                <p style={{ fontSize: '13px', fontWeight: 300, color: f.hl ? 'rgba(255,255,255,0.55)' : 'var(--muted)', lineHeight: 1.6 }}>{f.desc}</p>
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