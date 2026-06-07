'use client'

import { useState } from 'react'

export function TeamPhoto({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false)
  if (error) return null
  return (
    <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--white) 0%, transparent 50%)' }} />
    </div>
  )
}