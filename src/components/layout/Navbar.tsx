'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/data'

function LoginLink() {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href="/login"
      aria-label="Se connecter"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
        background: hovered ? 'var(--fire)' : 'var(--ink)',
        transition: 'background 0.25s',
      }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </Link>
  )
}

function NavCta() {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href="/inscriptions"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-barlow-condensed), sans-serif',
        fontWeight: 600, fontSize: '11px', letterSpacing: '2px',
        textTransform: 'uppercase', textDecoration: 'none',
        background: hovered ? 'var(--fire)' : 'var(--ink)',
        color: 'white', padding: '11px 24px',
        transition: 'background 0.25s', display: 'inline-block', flexShrink: 0,
      }}>
      Rejoindre
    </Link>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    // Mesure la largeur de la scrollbar avant de bloquer
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (menuOpen) {
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
      document.documentElement.style.removeProperty('--scrollbar-width')
    }
    return () => {
      document.body.classList.remove('menu-open')
      document.documentElement.style.removeProperty('--scrollbar-width')
    }
  }, [menuOpen])

  const isLight = scrolled || menuOpen

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 12px 0 20px',
        height: '60px',
        transition: 'background 0.3s, border-color 0.3s',
        background: isLight ? 'rgba(250,250,248,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled && !menuOpen ? '1px solid var(--border-light)' : '1px solid transparent',
      }}>
        {/* Logo */}
        <Link href="/" onClick={() => setMenuOpen(false)}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, minWidth: 0 }}>
          <Image src="/images/logo.png" alt="Xplosion" width={745} height={564} priority
            style={{ height: '34px', width: 'auto', objectFit: 'contain', display: 'block', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, minWidth: 0 }}>
            <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '16px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink)', whiteSpace: 'nowrap' }}>Xplosion</span>
            <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--fire)', marginTop: '2px', whiteSpace: 'nowrap' }}>ASPTT Orléans · All-Star</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '24px' }} className="hide-mobile">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="hover-underline" style={{
              fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '11px',
              letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none',
              color: pathname === link.href ? 'var(--ink)' : 'var(--muted)', transition: 'color 0.2s',
            }}>{link.label}</Link>
          ))}
        </nav>
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LoginLink />
          <NavCta />
        </div>

        {/* Burger / Croix */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="show-mobile"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '44px', height: '44px', flexShrink: 0,
            background: menuOpen ? 'var(--fire)' : 'var(--ink)',
            border: 'none', cursor: 'pointer', borderRadius: '3px',
            transition: 'background 0.2s',
          }}
        >
          {menuOpen ? (
            <span style={{ color: 'white', fontSize: '20px', lineHeight: 1, fontFamily: 'sans-serif', fontWeight: 300 }}>✕</span>
          ) : (
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <rect y="0" width="20" height="1.5" rx="0.75" fill="white"/>
              <rect y="6" width="20" height="1.5" rx="0.75" fill="white"/>
              <rect y="12" width="20" height="1.5" rx="0.75" fill="white"/>
            </svg>
          )}
        </button>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '60px', left: 0, right: 0, bottom: 0,
              zIndex: 99,
              background: 'var(--white)',
              overflowY: 'auto',
              display: 'flex', flexDirection: 'column',
            }}
          >
            <nav style={{ flex: 1 }}>
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href ||
                  (link.href !== '/' && !link.href.includes('#') && pathname.startsWith(link.href))
                return (
                  <motion.div key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.28 }}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '20px 24px',
                        borderBottom: '1px solid var(--border-light)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-playfair), serif',
                        fontWeight: isActive ? 700 : 400,
                        fontSize: '22px',
                        color: isActive ? 'var(--fire)' : 'var(--ink)',
                        background: isActive ? 'var(--cream)' : 'transparent',
                        borderLeft: `3px solid ${isActive ? 'var(--fire)' : 'transparent'}`,
                      }}>
                      {link.label}
                      <span style={{ fontSize: '16px', color: isActive ? 'var(--fire)' : 'var(--muted)' }}>→</span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ padding: '24px', borderTop: '1px solid var(--border-light)' }}>
              <Link href="/inscriptions" onClick={() => setMenuOpen(false)}
                style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--fire)', color: 'white', padding: '16px', textDecoration: 'none', marginBottom: '12px' }}>
                Rejoindre le Club →
              </Link>
              <Link href="/login" onClick={() => setMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ink)', border: '1px solid var(--border)', padding: '14px', textDecoration: 'none', marginBottom: '20px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Se connecter
              </Link>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                {[
                  { label: 'Instagram', href: 'https://www.instagram.com/xplosion_cheer_orleans/' },
                  { label: 'Facebook', href: 'https://www.facebook.com/xplosioncheer45/' },
                  { label: 'TikTok', href: '#' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}