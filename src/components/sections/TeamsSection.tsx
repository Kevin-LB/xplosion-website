'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Team } from '@/lib/data'
import { useIsMobile } from '@/hooks/useMediaQuery'

export function TeamsSection({ teams }: { teams: Team[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  // Page d'accueil : uniquement les équipes "active" (pas les GS, pas les loisirs)
  const featured = teams.filter((t) => t.status === 'active')

  return (
    <section style={{ background: 'var(--cream)', padding: `var(--py) var(--px)` }}>
      <div ref={ref} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', marginBottom: isMobile ? '24px' : '48px' }}>
        <div>
          <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="label-caps" style={{ marginBottom: '8px' }}>
            Saison 2025 / 2026
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 56px)', lineHeight: 1.05 }}>
            Nos <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>Équipes</em>
          </motion.h2>
        </div>
        {!isMobile && (
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
            style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', maxWidth: '320px', lineHeight: 1.7, textAlign: 'right' }}>
            Du niveau loisirs aux qualifications internationales.
          </motion.p>
        )}
      </div>

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {featured.map((team, i) => (
            <motion.div key={team.slug}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}>
              <Link href={`/equipes#${team.slug}`}
                style={{ display: 'block', background: 'var(--white)', textDecoration: 'none', position: 'relative', overflow: 'hidden', borderLeft: '3px solid var(--fire)' }}>
                {team.photo && (
                  <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
                    <Image src={team.photo} alt={team.name} fill sizes="100vw" style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--white) 0%, transparent 60%)' }} />
                  </div>
                )}
                <div style={{ padding: '16px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '4px' }}>{team.level}</div>
                    <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '20px', color: 'var(--ink)', lineHeight: 1.1, marginBottom: '6px' }}>{team.name}</div>
                    <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.5 }}>{team.description}</p>
                  </div>
                  {team.badge && (
                    <span style={{ marginLeft: '12px', flexShrink: 0, fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 8px', background: 'var(--fire)', color: '#fff' }}>
                      {team.badge}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {featured.map((team, i) => (
            <motion.div key={team.slug}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 + (i % 3) * 0.07 }}>
              <Link href={`/equipes#${team.slug}`} className="card-hover-bar"
                style={{ display: 'block', background: 'var(--cream)', textDecoration: 'none', position: 'relative', overflow: 'hidden', height: '100%' }}>
                {team.photo && (
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <Image src={team.photo} alt={team.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--cream) 0%, transparent 50%)' }} />
                  </div>
                )}
                <div style={{ padding: '24px 28px 36px', position: 'relative' }}>
                  {team.badge && (
                    <span style={{ position: 'absolute', top: '12px', right: '12px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 8px', background: 'var(--fire)', color: '#fff' }}>
                      {team.badge}
                    </span>
                  )}
                  <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '6px' }}>{team.level}</div>
                  <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '26px', color: 'var(--ink)', lineHeight: 1.1, marginBottom: '8px' }}>{team.name}</div>
                  <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.6 }}>{team.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        style={{ marginTop: '16px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>
        + Group Stunt : Sparks · Blackstarz · Fire Queens · Dark Fire · Starlight · Lemon
        <Link href="/equipes" className="hover-underline" style={{ marginLeft: '12px', color: 'var(--fire)', textDecoration: 'none' }}>Tout voir →</Link>
      </motion.p>
    </section>
  )
}