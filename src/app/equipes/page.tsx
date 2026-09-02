import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTeams } from '@/lib/teams'
import type { Team } from '@/lib/data'

export const dynamic = 'force-dynamic'
import { HoverLink, HoverAnchor } from '@/components/ui/Hover'

export const metadata: Metadata = { title: 'Nos Équipes' }

const btnBase = { fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const, background: 'var(--ink)', color: '#fff', padding: '14px 36px', textDecoration: 'none', transition: 'background 0.2s' }
const btnHovered = { background: 'var(--fire)' }
const tryoutBase = { display: 'inline-block', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const, background: 'white', color: 'var(--fire)', padding: '14px 36px', textDecoration: 'none', transition: 'background 0.2s', flexShrink: 0 as const }
const tryoutHovered = { background: 'var(--cream)' }

function TeamCard({ team }: { team: Team }) {
  return (
    <Link href={`/equipes/${team.slug}`} className="card-hover-bar"
      style={{ display: 'block', background: 'var(--white)', position: 'relative', textDecoration: 'none', transition: 'background 0.2s' }}>
      {team.photo && (
        <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
          <Image src={team.photo} alt={team.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--white) 0%, transparent 50%)' }} />
        </div>
      )}
      <div style={{ padding: 'clamp(20px,3vw,28px) clamp(16px,2.5vw,28px) clamp(24px,3.5vw,36px)', position: 'relative' }}>
        {team.badge && (
          <span style={{ position: 'absolute', top: '12px', right: '12px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 10px', background: 'var(--fire)', color: '#fff' }}>
            {team.badge}
          </span>
        )}
        <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '10px' }}>{team.level}</div>
        <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(22px,3vw,28px)', color: 'var(--ink)', lineHeight: 1.1, marginBottom: '10px' }}>{team.name}</h2>
        <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.7, marginBottom: '12px' }}>{team.description}</p>
        <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--fire)' }}>
          En savoir plus →
        </span>
      </div>
    </Link>
  )
}

function GsCard({ team }: { team: Team }) {
  return (
    <Link href={`/equipes/${team.slug}`}
      style={{ display: 'block', background: 'var(--cream)', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
      {team.photo && (
        <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
          <Image src={team.photo} alt={team.name} fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: 'cover' }} />
        </div>
      )}
      <div style={{ padding: 'clamp(20px,2.5vw,28px) clamp(16px,2vw,24px)' }}>
        <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>
          {team.level}
        </div>
        <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(18px,2.5vw,22px)', color: 'var(--ink)', marginBottom: '8px' }}>
          {team.name}
        </h3>
        <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.65 }}>
          {team.description}
        </p>
      </div>
    </Link>
  )
}

export default async function EquipesPage() {
  const TEAMS = await getTeams()
  const mainTeams = TEAMS.filter((t) => t.status === 'active')
  const gsTeams   = TEAMS.filter((t) => t.status === 'gs')
  const loisirs   = TEAMS.filter((t) => t.status === 'loisirs')

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: 'clamp(48px,8vw,80px) var(--px) clamp(32px,5vw,64px)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Saison 2025 / 2026</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px' }}>
          Nos <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>Équipes</em>
        </h1>
      </div>

      <div style={{ padding: 'clamp(40px,8vw,80px) var(--px)' }}>

        {/* Tryouts banner */}
        <div style={{ background: 'var(--ink)', padding: 'clamp(24px,4vw,40px) clamp(20px,4vw,48px)', marginBottom: 'clamp(40px,6vw,64px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '10px' }}>
              <span style={{ width: '14px', height: '1px', background: 'var(--fire-light)', display: 'block' }} />
              Tryouts · Samedi 27 juin 2026
            </div>
            <p style={{ fontSize: 'clamp(13px,2vw,15px)', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
              Rejoins <strong style={{ color: 'white', fontWeight: 500 }}>Intensity</strong> ou <strong style={{ color: 'white', fontWeight: 500 }}>Tenacity</strong> — inscriptions via HelloAsso.
            </p>
          </div>
          <HoverAnchor href="https://www.helloasso.com/associations/asptt-orleans-section-ski/evenements/tryouts-intensity-ioc4-2026-2027"
            target="_blank" rel="noopener noreferrer"
            base={tryoutBase} hovered={tryoutHovered}>
            S'inscrire aux tryouts →
          </HoverAnchor>
        </div>

        {/* Équipes compétition */}
        <p className="label-caps-muted" style={{ marginBottom: '24px' }}>Équipes compétition</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 'clamp(48px,8vw,72px)' }}>
          {mainTeams.map((team) => <TeamCard key={team.slug} team={team} />)}
        </div>

        {/* Group Stunt & Partner Stunt */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'clamp(40px,6vw,64px)', marginBottom: 'clamp(40px,6vw,64px)' }}>
          <div className="label-caps" style={{ marginBottom: '12px' }}>Group Stunt & Partner Stunt</div>
          <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(24px,4vw,44px)', lineHeight: 1.1, marginBottom: '12px' }}>
            La précision <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>en duo & en groupe</em>
          </h2>
          <p style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, maxWidth: '580px', marginBottom: '32px' }}>
            Formats de compétition spécifiques mettant en valeur la technicité des portés, l'acrobatie et la synchronisation. Le Partner Stunt est une discipline de précision portée par deux athlètes.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '1px', background: 'var(--border-light)', border: '1px solid var(--border-light)' }}>
            {gsTeams.map((team) => <GsCard key={team.slug} team={team} />)}
          </div>
        </div>

        {/* Loisirs */}
        {loisirs.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'clamp(40px,6vw,64px)', marginBottom: 'clamp(40px,6vw,64px)' }}>
            <p className="label-caps-muted" style={{ marginBottom: '24px' }}>Section loisirs</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1px', background: 'var(--border-light)', border: '1px solid var(--border-light)' }}>
              {loisirs.map((team) => <GsCard key={team.slug} team={team} />)}
            </div>
          </div>
        )}

        {/* CTA bas */}
        <div style={{ background: 'var(--cream-2)', borderTop: '1px solid var(--border)', padding: 'clamp(32px,5vw,48px) clamp(20px,4vw,64px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 400, fontSize: 'clamp(18px,3vw,22px)', color: 'var(--ink)', fontStyle: 'italic' }}>
            Envie de nous rejoindre ?
          </p>
          <HoverLink href="/inscriptions" base={btnBase} hovered={btnHovered}>Voir les inscriptions →</HoverLink>
        </div>
      </div>
    </div>
  )
}