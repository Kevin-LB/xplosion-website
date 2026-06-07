'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

/* ─── HoverLink ─────────────────────────────────────────────────────────────
   Un <Link> qui change de style au hover, utilisable depuis des Server Components.
──────────────────────────────────────────────────────────────────────────── */
type HoverLinkProps = {
  href: string
  base: CSSProperties
  hovered: CSSProperties
  children: ReactNode
  target?: string
  rel?: string
  className?: string
}

export function HoverLink({ href, base, hovered: hoveredStyle, children, target, rel, className }: HoverLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...base, ...(isHovered ? hoveredStyle : {}) }}
    >
      {children}
    </Link>
  )
}

/* ─── HoverAnchor ────────────────────────────────────────────────────────── */
type HoverAnchorProps = {
  href: string
  base: CSSProperties
  hovered: CSSProperties
  children: ReactNode
  target?: string
  rel?: string
  className?: string
}

export function HoverAnchor({ href, base, hovered: hoveredStyle, children, target, rel, className }: HoverAnchorProps) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...base, ...(isHovered ? hoveredStyle : {}) }}
    >
      {children}
    </a>
  )
}

/* ─── HoverDiv ───────────────────────────────────────────────────────────── */
type HoverDivProps = {
  base: CSSProperties
  hovered: CSSProperties
  children: ReactNode
  className?: string
  id?: string
}

export function HoverDiv({ base, hovered: hoveredStyle, children, className, id }: HoverDivProps) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      id={id}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...base, ...(isHovered ? hoveredStyle : {}) }}
    >
      {children}
    </div>
  )
}

/* ─── HoverSpan ──────────────────────────────────────────────────────────── */
type HoverSpanProps = {
  base: CSSProperties
  hovered: CSSProperties
  children: ReactNode
  className?: string
}

export function HoverSpan({ base, hovered: hoveredStyle, children, className }: HoverSpanProps) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...base, ...(isHovered ? hoveredStyle : {}) }}
    >
      {children}
    </span>
  )
}