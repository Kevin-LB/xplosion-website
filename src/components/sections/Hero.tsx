'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HERO_STATS, TICKER_ITEMS } from '@/lib/data'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity   = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const [imgError, setImgError] = useState(false)

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', inset: 0, background: 'var(--cream)' }} />

      {/* Hero photo */}
      <div style={{ position: 'absolute', top: '64px', right: 0, bottom: 0, width: '58%', overflow: 'hidden' }}>
        {!imgError ? (
          <img src="/images/hero.png" alt="Xplosion Cheerleaders"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            onError={() => setImgError(true)} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--cream-2) 0%, var(--cream-3) 100%)' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--cream) 0%, transparent 30%)' }} />
      </div>

      {/* Vertical accent bar */}
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{ position: 'absolute', top: 0, bottom: 0, left: '42%', width: '2px', background: 'var(--fire)', transformOrigin: 'top', opacity: 0.7 }}
      />
      <div style={{ position: 'absolute', top: '33%', left: 0, right: 0, height: '1px', background: 'var(--ink)', opacity: 0.05, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '50%', background: 'radial-gradient(ellipse at top right, rgba(200,64,26,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Content */}
      <motion.div style={{ y: contentY, opacity, position: 'relative', zIndex: 10, padding: '0 64px 80px', maxWidth: '600px' }}>
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="label-caps" style={{ marginBottom: '20px' }}
        >
          Club All-Star · Orléans · Fondé 2015
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 900, fontSize: 'clamp(56px, 9vw, 104px)', lineHeight: 0.92, letterSpacing: '-2px', marginBottom: '20px' }}
        >
          {/* Training — noir */}
          <span style={{ color: 'var(--ink)' }}>Training</span>
          <br />
          {/* the — rouge italique */}
          <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>the</em>
          <br />
          {/* Future — blanc (outline) */}
          <span style={{ fontWeight: 900, color: 'transparent', WebkitTextStroke: '2px var(--ink)', opacity: 0.18 }}>Future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          style={{ fontSize: '15px', fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '380px', marginBottom: '40px' }}
        >
          Le cheerleading de haut niveau en région Centre-Val de Loire.{' '}
          <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>3 équipes au Summit Européen</strong> et{' '}
          <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>une équipe qualifiée au Summit Orlando</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <Link href="/inscriptions"
            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--ink)', color: 'white', padding: '15px 36px', textDecoration: 'none', transition: 'background 0.25s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--fire)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
          >Rejoindre le Club</Link>

          <Link href="/equipes"
            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', padding: '14px 36px', border: '1px solid var(--border)', textDecoration: 'none', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >Nos Équipes →</Link>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        style={{ position: 'absolute', right: '64px', bottom: '80px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '24px' }}
      >
        {HERO_STATS.map((stat, i) => (
          <div key={stat.label} style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '40px', lineHeight: 1, color: 'var(--ink)' }}>
              {stat.num}<sup style={{ fontFamily: 'var(--font-barlow), sans-serif', fontWeight: 300, fontSize: '16px', color: 'var(--fire)', marginLeft: '2px' }}>{stat.sup}</sup>
            </div>
            <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '4px' }}>{stat.label}</div>
            {i < HERO_STATS.length - 1 && <div style={{ width: '24px', height: '1px', background: 'var(--border)', marginLeft: 'auto', marginTop: '8px' }} />}
          </div>
        ))}
      </motion.div>

      {/* Scroll */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--fire), transparent)' }} />
        <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)' }}>scroll</span>
      </motion.div>
    </section>
  )
}

export function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '13px 0', overflow: 'hidden', background: 'var(--white)' }}>
      <div className="ticker-track" style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
        {doubled.map((item, i) => (
          <span key={i}>{item}<span style={{ color: 'var(--fire)', margin: '0 24px', fontSize: '7px' }}>◆</span></span>
        ))}
      </div>
    </div>
  )
}