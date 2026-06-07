'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TEAMS } from '@/lib/data'

export function TeamsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const featured = TEAMS.filter((t) => t.status === 'active').slice(0, 6)

  return (
    <section style={{ background: 'var(--cream)', padding: '96px 64px' }}>
      <div ref={ref} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '56px' }}>
        <div>
          <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="label-caps" style={{ marginBottom: '8px' }}>
            Saison 2025 / 2026
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05 }}>
            Nos <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>Équipes</em>
          </motion.h2>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', maxWidth: '360px', lineHeight: 1.7, textAlign: 'right' }}>
          Du niveau loisirs aux qualifications internationales, un parcours sportif complet pour chaque athlète.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
        {featured.map((team, i) => (
          <motion.div key={team.slug}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + (i % 3) * 0.07 }}>
            <TeamCard team={team} />
          </motion.div>
        ))}
      </div>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        style={{ marginTop: '20px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>
        + Blackstarz · Fire Queens · Dark Fire · Starlight · Cosmo (loisirs)
        <Link href="/equipes" className="hover-underline" style={{ marginLeft: '20px', color: 'var(--fire)', textDecoration: 'none' }}>
          Voir toutes les équipes →
        </Link>
      </motion.p>
    </section>
  )
}

function TeamCard({ team }: { team: (typeof TEAMS)[0] }) {
  return (
    <Link href={`/equipes#${team.slug}`} className="card-hover-bar"
      style={{ display: 'block', background: 'var(--cream)', textDecoration: 'none', position: 'relative', overflow: 'hidden', height: '100%', transition: 'background 0.3s' }}
    >
      {team.photo && (
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <Image src={team.photo} alt={team.name} fill style={{ objectFit: 'cover' }}
            onError={(e) => { if (e.currentTarget.parentElement) e.currentTarget.parentElement.style.display = 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--cream) 0%, transparent 50%)' }} />
        </div>
      )}
      <div style={{ padding: '28px 28px 40px', position: 'relative' }}>
        {team.badge && (
          <span style={{ position: 'absolute', top: '12px', right: '12px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 10px', background: 'var(--fire)', color: '#fff' }}>
            {team.badge}
          </span>
        )}
        <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '10px' }}>{team.level}</div>
        <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '26px', color: 'var(--ink)', lineHeight: 1.1, marginBottom: '10px' }}>{team.name}</div>
        <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.65 }}>{team.description}</p>
        <div style={{ position: 'absolute', bottom: '16px', right: '20px', fontSize: '16px', color: 'var(--border)' }}>↗</div>
      </div>
    </Link>
  )
}