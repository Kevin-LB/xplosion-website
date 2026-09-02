'use client'

import { useState } from 'react'
import Image from 'next/image'

export function TeamPhoto({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false)
  if (error) return null
  return (
    <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        onError={() => setError(true)}
        style={{ objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--white) 0%, transparent 50%)' }} />
    </div>
  )
}