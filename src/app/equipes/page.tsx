import type { Metadata } from 'next'
import { TEAMS } from '@/lib/data'
import { HoverLink, HoverDiv, HoverAnchor } from '@/components/ui/Hover'
import { TeamPhoto } from '@/components/ui/TeamPhoto'

export const metadata: Metadata = { title: 'Nos Équipes' }

const btnBase = { fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const, background: 'var(--ink)', color: '#fff', padding: '14px 36px', textDecoration: 'none', transition: 'background 0.2s' }
const btnHovered = { background: 'var(--fire)' }
const tryoutBase = { display: 'inline-block', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const, background: 'white', color: 'var(--fire)', padding: '14px 36px', textDecoration: 'none', transition: 'background 0.2s', flexShrink: 0 as const }
const tryoutHovered = { background: 'var(--cream)' }

export default function EquipesPage() {
  const competitive = TEAMS.filter((t) => t.status === 'active')
  const loisirs = TEAMS.filter((t) => t.status === 'loisirs')

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: '80px 64px 64px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Saison 2025 / 2026</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px' }}>
          Nos <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>Équipes</em>
        </h1>
      </div>

      <div style={{ padding: '80px 64px' }}>

        {/* Tryouts banner */}
        <div style={{ background: 'var(--ink)', padding: '40px 48px', marginBottom: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '10px' }}>
              <span style={{ width: '14px', height: '1px', background: 'var(--fire-light)', display: 'block' }} />
              Tryouts · Samedi 27 juin 2026
            </div>
            <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
              Rejoins <strong style={{ color: 'white', fontWeight: 500 }}>Intensity</strong> ou <strong style={{ color: 'white', fontWeight: 500 }}>Ténacity</strong> — inscriptions via HelloAsso.
            </p>
          </div>
          <HoverAnchor
            href="https://www.helloasso.com/associations/asptt-orleans-section-ski/evenements/tryouts-intensity-ioc4-2026-2027"
            target="_blank" rel="noopener noreferrer"
            base={tryoutBase} hovered={tryoutHovered}
          >
            S'inscrire aux tryouts →
          </HoverAnchor>
        </div>

        {/* Équipes compétition */}
        <p className="label-caps-muted" style={{ marginBottom: '28px' }}>Équipes compétition</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '72px' }}>
          {competitive.map((team) => (
            <HoverDiv key={team.slug} id={team.slug} className="card-hover-bar"
              base={{ background: 'var(--white)', position: 'relative', transition: 'background 0.2s' }}
              hovered={{ background: 'var(--cream)' }}
            >
              {team.photo && <TeamPhoto src={team.photo} alt={team.name} />}
              <div style={{ padding: '28px 28px 36px', position: 'relative' }}>
                {team.badge && (
                  <span style={{ position: 'absolute', top: '12px', right: '12px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 10px', background: 'var(--fire)', color: '#fff' }}>
                    {team.badge}
                  </span>
                )}
                <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '10px' }}>{team.level}</div>
                <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '28px', color: 'var(--ink)', lineHeight: 1.1, marginBottom: '10px' }}>{team.name}</h2>
                <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.7 }}>{team.description}</p>
              </div>
            </HoverDiv>
          ))}
        </div>

        {/* Loisirs */}
        {loisirs.length > 0 && (
          <>
            <p className="label-caps-muted" style={{ marginBottom: '28px' }}>Section loisirs</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'var(--border-light)', border: '1px solid var(--border-light)', marginBottom: '72px' }}>
              {loisirs.map((team) => (
                <div key={team.slug} id={team.slug} style={{ background: 'var(--cream)', padding: '32px' }}>
                  <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>{team.level}</div>
                  <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '26px', color: 'var(--ink)', marginBottom: '10px' }}>{team.name}</h2>
                  <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.7 }}>{team.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CTA bas */}
      <div style={{ background: 'var(--cream-2)', borderTop: '1px solid var(--border)', padding: '48px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
        <p style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 400, fontSize: '22px', color: 'var(--ink)', fontStyle: 'italic' }}>Envie de nous rejoindre ?</p>
        <HoverLink href="/inscriptions" base={btnBase} hovered={btnHovered}>Voir les inscriptions →</HoverLink>
      </div>
    </div>
  )
}