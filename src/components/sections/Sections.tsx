'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RESULTS, VALUES, PARTNERS } from '@/lib/data'

/* ══════════════════════════════════════════
   PALMARÈS
══════════════════════════════════════════ */
export function PalmaresSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const recent = RESULTS.filter((r) => r.season === '2025/2026')

  return (
    <section ref={ref} style={{ padding: '96px 64px', background: 'var(--white)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px' }}>
        <div>
          <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="label-caps" style={{ marginBottom: '16px' }}>
            Résultats récents
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05, marginBottom: '8px' }}>
            Palmarès <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>2025/26</em>
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 0.04 } : {}} transition={{ delay: 0.4 }}
            style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 900, fontSize: '110px', color: 'var(--ink)', lineHeight: 1, letterSpacing: '-6px', userSelect: 'none', marginTop: '-8px' }}>
            26
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
            <Link href="/palmares" className="hover-underline"
              style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--fire)', textDecoration: 'none' }}>
              Voir tout le palmarès →
            </Link>
          </motion.div>
        </div>

        <div>
          {recent.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.06 }}
              style={{ display: 'grid', gridTemplateColumns: '44px 1fr auto', alignItems: 'center', gap: '20px', padding: '20px 0', borderBottom: '1px solid var(--border-light)' }}
            >
              <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '26px', color: r.highlight ? 'var(--gold)' : 'var(--fire)', lineHeight: 1 }}>{r.rank}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '3px' }}>{r.competition}</div>
                <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)' }}>{r.team}{r.detail && ` — ${r.detail}`}</div>
              </div>
              {r.tag && (
                <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 12px', border: `1px solid ${r.highlight ? 'var(--fire)' : 'var(--border)'}`, color: r.highlight ? 'var(--fire)' : 'var(--muted)', whiteSpace: 'nowrap' }}>
                  {r.tag}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   DISCIPLINE
══════════════════════════════════════════ */
export function DisciplineSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const stats = [
    { num: '2', sup: 'min 30', label: 'Durée de routine' },
    { num: '4', sup: '', label: 'Éléments tech.' },
    { num: '10', sup: '+', label: 'Heures / semaine' },
    { num: '🌍', sup: '', label: "Compétitions int'l" },
  ]
  return (
    <section ref={ref} style={{ background: 'var(--ink)', color: 'white', padding: '96px 64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        <div>
          <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '20px' }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--fire-light)', display: 'block' }} />
            La discipline
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.1, color: 'var(--white)', marginBottom: '24px' }}>
            Un sport <em style={{ fontStyle: 'italic', color: 'var(--fire-light)' }}>périlleux,</em><br />une passion totale.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(250,250,248,0.6)', lineHeight: 1.8, maxWidth: '420px' }}>
            Né au début des années 1900 dans les universités américaines, le cheerleading All-Star est aujourd'hui l'un des sports les plus exigeants au monde. Portés, tumbling, sauts et danse — tout en 2 minutes 30.
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ background: i === 0 ? 'var(--fire)' : 'rgba(255,255,255,0.04)', padding: '32px 24px' }}>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '44px', lineHeight: 1, color: 'white' }}>
                {s.num}
                {s.sup && <sup style={{ fontFamily: 'var(--font-barlow), sans-serif', fontWeight: 300, fontSize: '15px', color: i === 0 ? 'rgba(255,255,255,0.8)' : 'var(--fire-light)', marginLeft: '3px' }}>{s.sup}</sup>}
              </div>
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: i === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)', marginTop: '6px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   VALEURS
══════════════════════════════════════════ */
export function ValuesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} style={{ background: 'var(--cream)', padding: '96px 64px' }}>
      <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="label-caps" style={{ marginBottom: '14px' }}>
        Notre identité
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
        style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05, marginBottom: '56px' }}>
        Les valeurs<br /><em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>du club</em>
      </motion.h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
        {VALUES.map((v, i) => (
          <motion.div key={v.num}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.1 }}
            style={{ paddingTop: '28px', borderTop: '1px solid var(--border)', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-24px', right: 0, fontFamily: 'var(--font-playfair), serif', fontWeight: 900, fontSize: '72px', color: 'var(--ink)', opacity: 0.04, lineHeight: 1, userSelect: 'none' }}>{v.num}</span>
            <div style={{ width: '40px', height: '40px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginBottom: '16px' }}>{v.icon}</div>
            <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '20px', color: 'var(--ink)', lineHeight: 1.2, marginBottom: '12px' }}>{v.title}</h3>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.75 }}>{v.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   CTA BAND
══════════════════════════════════════════ */
export function CtaBand() {
  return (
    <div style={{ background: 'var(--fire)', padding: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
      <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 36px)', color: '#fff', lineHeight: 1.25 }}>
        Prêt à <em style={{ fontStyle: 'italic', opacity: 0.75 }}>rejoindre</em><br />l'aventure Xplosion ?
      </h2>
      <Link href="/inscriptions"
        style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: '#fff', color: 'var(--fire)', padding: '16px 44px', textDecoration: 'none', flexShrink: 0 }}>
        Voir les inscriptions 2025/26
      </Link>
    </div>
  )
}

/* ══════════════════════════════════════════
   PARTENAIRES
══════════════════════════════════════════ */
export function PartnersSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} style={{ background: 'var(--white)', padding: '64px', borderTop: '1px solid var(--border-light)' }}>
      <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
        className="label-caps-muted" style={{ textAlign: 'center', marginBottom: '36px' }}>Partenaires & sponsors</motion.p>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '32px 48px', justifyContent: 'center' }}>
        {PARTNERS.map((p, i) => (
          <motion.span key={p.name} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 + i * 0.05 }}
            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>
            {p.name}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}