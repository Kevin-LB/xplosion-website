'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TICKER_ITEMS } from '@/lib/data'
import { useIsMobile } from '@/hooks/useMediaQuery'

const HERO_STATS = [
  { num: '6', sup: '', label: 'Équipes actives' },
  { num: '3', sup: '', label: 'Équipes Summit EU 2027' },
  { num: '1', sup: '', label: 'Équipe Summit Orlando 2027' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity   = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const [imgError, setImgError] = useState(false)
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Full-screen photo on mobile */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {!imgError ? (
            <Image src="/images/xplosion.jpg" alt="Xplosion Cheerleaders" fill priority sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              onError={() => setImgError(true)} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'var(--cream)' }} />
          )}
          {/* Strong dark overlay for mobile readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,13,0.5) 0%, rgba(8,8,13,0.3) 30%, rgba(8,8,13,0.7) 70%, rgba(8,8,13,0.92) 100%)' }} />
        </div>

        {/* Mobile content — bottom aligned */}
        <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto', padding: '0 20px 48px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '16px' }}
          >
            <span style={{ width: '16px', height: '1px', background: 'var(--fire)', display: 'block' }} />
            Club All-Star · Orléans · 2015
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 900, fontSize: 'clamp(52px, 16vw, 72px)', lineHeight: 0.92, letterSpacing: '-1.5px', marginBottom: '16px' }}
          >
            <span style={{ color: 'white' }}>Training</span>
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>the</em>
            <br />
            <span style={{ fontWeight: 900, color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.35)' }}>Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '28px' }}
          >
            3 équipes au Summit Européen · 1 équipe au Summit Orlando
          </motion.p>

          {/* Stats row on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ display: 'flex', gap: '0', marginBottom: '28px', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            {HERO_STATS.map((stat, i) => (
              <div key={stat.label} style={{ flex: 1, padding: '14px 12px', borderRight: i < HERO_STATS.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '26px', color: 'white', lineHeight: 1 }}>
                  {stat.num}<sup style={{ fontSize: '11px', color: 'var(--fire-light)' }}>{stat.sup}</sup>
                </div>
                <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ display: 'flex', gap: '12px' }}
          >
            <Link href="/inscriptions"
              style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--fire)', color: 'white', padding: '15px 16px', textDecoration: 'none' }}>
              Rejoindre
            </Link>
            <Link href="/equipes"
              style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.1)', color: 'white', padding: '15px 16px', border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none' }}>
              Nos équipes
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }

  // ── DESKTOP VERSION (unchanged) ──
  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--cream)' }} />

      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '62%', overflow: 'hidden' }}>
        {!imgError ? (
          <Image src="/images/xplosion.jpg" alt="Xplosion Cheerleaders" fill priority sizes="62vw"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            onError={() => setImgError(true)} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--cream-2) 0%, var(--cream-3) 100%)' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--cream) 0%, rgba(8,8,13,0.45) 35%, rgba(8,8,13,0.62) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(to top, rgba(8,8,13,0.82) 0%, transparent 100%)' }} />
      </div>

      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{ position: 'absolute', top: 0, bottom: 0, left: '38%', width: '2px', background: 'var(--fire)', transformOrigin: 'top', zIndex: 5 }}
      />

      <motion.div style={{ y: contentY, opacity, position: 'relative', zIndex: 10, padding: '0 64px 80px', maxWidth: '580px' }}>
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} className="label-caps" style={{ marginBottom: '20px' }}>
          Club All-Star · Orléans · Fondé 2015
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 900, fontSize: 'clamp(56px, 9vw, 108px)', lineHeight: 0.92, letterSpacing: '-2px', marginBottom: '20px' }}>
          <span style={{ color: 'var(--ink)' }}>Training</span><br />
          <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>the</em><br />
          <span style={{ fontWeight: 900, color: 'transparent', WebkitTextStroke: '2px rgba(26,26,26,0.2)' }}>Future</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
          style={{ fontSize: '15px', fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '380px', marginBottom: '40px' }}>
          Le cheerleading de haut niveau en région Centre-Val de Loire.{' '}
          <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>3 équipes au Summit Européen</strong>{' '}et{' '}
          <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>une équipe qualifiée au Summit Orlando</strong>.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/inscriptions"
            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--ink)', color: 'white', padding: '15px 36px', textDecoration: 'none', transition: 'background 0.25s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--fire)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}>
            Rejoindre le Club
          </Link>
          <Link href="/equipes"
            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', padding: '14px 36px', border: '1px solid rgba(26,26,26,0.3)', textDecoration: 'none', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(26,26,26,0.3)')}>
            Nos Équipes →
          </Link>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
        style={{ position: 'absolute', right: '56px', bottom: '72px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '28px' }}>
        {HERO_STATS.map((stat, i) => (
          <div key={stat.label} style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '42px', lineHeight: 1, color: 'white', textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
              {stat.num}<sup style={{ fontFamily: 'var(--font-barlow), sans-serif', fontWeight: 300, fontSize: '16px', color: 'var(--fire-light)', marginLeft: '2px' }}>{stat.sup}</sup>
            </div>
            <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{stat.label}</div>
            {i < HERO_STATS.length - 1 && <div style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.2)', marginLeft: 'auto', marginTop: '10px' }} />}
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
        style={{ position: 'absolute', top: '80px', right: '56px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '14px 20px', background: 'rgba(200,64,26,0.92)', backdropFilter: 'blur(8px)' }}>
        <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Club</span>
        <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 900, fontSize: '18px', color: 'white' }}>All-Star</span>
        <div style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.4)', margin: '2px 0' }} />
        <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>ASPTT Orléans</span>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
        style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <div style={{ position: 'relative', width: '1px', height: '44px' }}>
          <motion.div animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
            style={{ position: 'absolute', inset: 0, background: 'var(--fire)', boxShadow: '0 0 8px 2px rgba(200,64,26,0.6)', transformOrigin: 'top' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(8,8,13,0.55)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '2px' }}>
          <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} style={{ color: 'var(--fire)', fontSize: '10px' }}>↓</motion.span>
          <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>Scroll</span>
          <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }} style={{ color: 'var(--fire)', fontSize: '10px' }}>↓</motion.span>
        </div>
      </motion.div>
    </section>
  )
}

export function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '11px 0', overflow: 'hidden', background: 'var(--white)' }}>
      <div className="ticker-track" style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
        {doubled.map((item, i) => (
          <span key={i}>{item}<span style={{ color: 'var(--fire)', margin: '0 20px', fontSize: '7px' }}>◆</span></span>
        ))}
      </div>
    </div>
  )
}