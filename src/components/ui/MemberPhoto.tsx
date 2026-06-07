'use client'

import { useState } from 'react'

export function MemberPhoto({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false)
  const initial = name.charAt(0)

  return (
    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--cream-2)', border: '1px solid var(--border)', marginBottom: '20px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
      {!error ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '22px', color: 'var(--muted)' }}>
          {initial}
        </span>
      )}
    </div>
  )
}