import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { RESULTS } from '@/lib/data'
import { getTeams, getTeamBySlug } from '@/lib/teams'
import { HoverLink, HoverAnchor } from '@/components/ui/Hover'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const team = await getTeamBySlug(slug)
  return { title: team ? team.name : 'Équipe' }
}

const ctaBase = { fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const, background: 'var(--ink)', color: '#fff', padding: '14px 32px', textDecoration: 'none', transition: 'background 0.2s' }
const ctaHovered = { background: 'var(--fire)' }

export default async function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const team = await getTeamBySlug(slug)
  if (!team) notFound()

  const allTeams = await getTeams()
  const results = RESULTS.filter((r) => r.team === team.name)
  const otherTeams = allTeams.filter((t) => t.slug !== team.slug && t.status === team.status).slice(0, 3)

  const sectionLabel =
    team.status === 'active' ? 'Équipe compétition' :
    team.status === 'gs' ? 'Group Stunt & Partner Stunt' : 'Section loisirs'

  return (
    <div style={{ paddingTop: '64px' }}>

      {/* ── Hero équipe ── */}
      <div style={{ position: 'relative', background: 'var(--cream)', borderBottom: '1px solid var(--border-light)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: team.photo ? 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' : '1fr', gap: 0 }}>
          {/* Texte */}
          <div style={{ padding: 'clamp(32px,6vw,80px) var(--px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Link href="/equipes" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', marginBottom: '24px', width: 'fit-content' }}>
              ← Toutes les équipes
            </Link>
            <div className="label-caps" style={{ marginBottom: '16px' }}>{sectionLabel}</div>
            <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(32px, 7vw, 72px)', lineHeight: 0.98, letterSpacing: '-1.5px', marginBottom: '16px', color: 'var(--ink)' }}>
              {team.name}
            </h1>
            <p style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: 'clamp(10px, 2vw, 12px)', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '20px' }}>
              {team.level}
            </p>
            {team.badge && (
              <span style={{ display: 'inline-block', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', padding: '6px 16px', background: 'var(--fire)', color: 'white', width: 'fit-content' }}>
                {team.badge}
              </span>
            )}
          </div>

          {/* Photo */}
          {team.photo && (
            <div style={{ position: 'relative', minHeight: '280px' }}>
              <Image src={team.photo} alt={team.name} fill priority sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--cream) 0%, transparent 30%)' }} />
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: 'clamp(32px,6vw,80px) var(--px)' }}>

        {/* ── Description longue ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(24px,5vw,64px)', marginBottom: 'clamp(40px,8vw,80px)' }}>
          <div>
            <div className="label-caps" style={{ marginBottom: '20px' }}>Présentation</div>
            <p style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.85 }}>
              {team.longDescription || team.description}
            </p>
          </div>

          {/* Stats rapides */}
          <div>
            <div className="label-caps" style={{ marginBottom: '20px' }}>En bref</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'clamp(100px, 20vw, 140px) 1fr', gap: 'clamp(12px, 2vw, 16px)', padding: '14px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: 'clamp(9px, 1.5vw, 10px)', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>Catégorie</span>
                <span style={{ fontSize: '14px', color: 'var(--ink)' }}>{team.category}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'clamp(100px, 20vw, 140px) 1fr', gap: 'clamp(12px, 2vw, 16px)', padding: '14px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: 'clamp(9px, 1.5vw, 10px)', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>Résultats</span>
                <span style={{ fontSize: '14px', color: 'var(--ink)' }}>{results.length} compétition{results.length !== 1 ? 's' : ''} enregistrée{results.length !== 1 ? 's' : ''}</span>
              </div>
              {team.badge && (
                <div style={{ display: 'grid', gridTemplateColumns: 'clamp(100px, 20vw, 140px) 1fr', gap: 'clamp(12px, 2vw, 16px)', padding: '14px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: 'clamp(9px, 1.5vw, 10px)', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>Objectif 26/27</span>
                  <span style={{ fontSize: '14px', color: 'var(--fire)', fontWeight: 500 }}>{team.badge}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Galerie ── */}
        {team.gallery && team.gallery.length > 0 && (
          <div style={{ marginBottom: 'clamp(40px,8vw,80px)' }}>
            <div className="label-caps" style={{ marginBottom: '20px' }}>Galerie</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 'clamp(10px, 2vw, 12px)' }}>
              {team.gallery.map((img, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--cream-2)' }}>
                  <Image src={img} alt={`${team.name} ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 20vw" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Résultats de l'équipe ── */}
        {results.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'clamp(32px,6vw,64px)', marginBottom: 'clamp(40px,6vw,64px)' }}>
            <div className="label-caps" style={{ marginBottom: '20px' }}>Palmarès de l'équipe</div>
            <div>
              {results.map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: 'clamp(36px, 8vw, 50px) 1fr auto', alignItems: 'flex-start', gap: 'clamp(12px, 2vw, 16px)', padding: 'clamp(12px, 2vw, 16px) 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(18px, 4vw, 22px)', color: r.highlight ? 'var(--gold)' : 'var(--fire)' }}>{r.rank ?? '—'}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: 'clamp(11px, 2vw, 13px)', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink)' }}>{r.competition}</span>
                      {r.date && <span style={{ fontSize: 'clamp(9px, 1.5vw, 10px)', color: 'var(--fire)', fontFamily: 'var(--font-barlow-condensed), sans-serif', letterSpacing: '0.5px' }}>📅 {r.date}</span>}
                    </div>
                    {r.detail && <div style={{ fontSize: 'clamp(11px, 1.8vw, 12px)', fontWeight: 300, color: 'var(--muted)', marginBottom: '4px' }}>{r.detail}</div>}
                  </div>
                  {r.tag && (
                    <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: 'clamp(8px, 1.3vw, 9px)', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 8px', border: `1px solid ${r.highlight ? 'var(--fire)' : 'var(--border)'}`, color: r.highlight ? 'var(--fire)' : 'var(--muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {r.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <Link href="/palmares" className="hover-underline" style={{ display: 'inline-block', marginTop: '20px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--fire)', textDecoration: 'none' }}>
              Voir le palmarès complet →
            </Link>
          </div>
        )}

        {/* ── Autres équipes ── */}
        {otherTeams.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'clamp(32px,6vw,64px)', marginBottom: 'clamp(40px,6vw,64px)' }}>
            <div className="label-caps" style={{ marginBottom: '20px' }}>À découvrir aussi</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
              {otherTeams.map((t) => (
                <Link key={t.slug} href={`/equipes/${t.slug}`} className="card-hover-bar"
                  style={{ display: 'block', background: 'var(--white)', padding: 'clamp(18px, 3vw, 28px)', textDecoration: 'none', transition: 'background 0.2s' }}>
                  <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: 'clamp(9px, 1.5vw, 10px)', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '6px' }}>{t.level}</div>
                  <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(18px, 3vw, 20px)', color: 'var(--ink)' }}>{t.name}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ background: 'var(--ink)', padding: 'clamp(24px, 4vw, 48px) var(--px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'clamp(16px, 3vw, 24px)' }}>
          <p style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 400, fontSize: 'clamp(16px, 3vw, 22px)', color: 'white', fontStyle: 'italic' }}>
            Envie de rejoindre {team.name} ?
          </p>
          <HoverAnchor href="/inscriptions" base={ctaBase} hovered={ctaHovered}>
            Voir les inscriptions →
          </HoverAnchor>
        </div>

      </div>
    </div>
  )
}