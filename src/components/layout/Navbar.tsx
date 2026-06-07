'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/data'

function NavCta() {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href="/inscriptions"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-barlow-condensed), sans-serif',
        fontWeight: 600, fontSize: '11px', letterSpacing: '2px',
        textTransform: 'uppercase', textDecoration: 'none',
        background: hovered ? 'var(--fire)' : 'var(--ink)',
        color: 'white', padding: '11px 28px',
        transition: 'background 0.25s',
      }}
    >
      Rejoindre
    </Link>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 64px', height: '64px',
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'rgba(250,250,248,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
      }}
    >
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '19px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ink)' }}>Xplosion</span>
        <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire)', marginTop: '2px' }}>ASPTT Orléans · All-Star</span>
      </Link>

      <nav style={{ display: 'flex', gap: '36px' }}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="hover-underline" style={{
            fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500,
            fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase',
            textDecoration: 'none',
            color: pathname === link.href ? 'var(--ink)' : 'var(--muted)',
            transition: 'color 0.2s',
          }}>{link.label}</Link>
        ))}
      </nav>

      <NavCta />
    </motion.header>
  )
}