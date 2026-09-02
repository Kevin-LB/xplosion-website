'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { authenticate } from './actions'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid var(--border)',
  fontSize: '14px',
  fontFamily: 'var(--font-barlow), sans-serif',
  background: 'var(--white)',
  color: 'var(--ink)',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-barlow-condensed), sans-serif',
  fontWeight: 500,
  fontSize: '10px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: '6px',
}

export default function LoginPage() {
  const [error, formAction, isPending] = useActionState(authenticate, undefined)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '380px', background: 'var(--white)', border: '1px solid var(--border)', padding: 'clamp(32px,5vw,48px)' }}>
        <div className="label-caps" style={{ marginBottom: '16px' }}>Espace privé</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '32px', color: 'var(--ink)', marginBottom: '32px' }}>
          Connexion
        </h1>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="username" style={labelStyle}>Identifiant</label>
            <input id="username" name="username" type="text" required autoComplete="username" style={inputStyle} />
          </div>
          <div>
            <label htmlFor="password" style={labelStyle}>Mot de passe</label>
            <input id="password" name="password" type="password" required autoComplete="current-password" style={inputStyle} />
          </div>

          {error && <p style={{ fontSize: '13px', color: 'var(--fire)', margin: 0 }}>{error}</p>}

          <button type="submit" disabled={isPending}
            style={{
              marginTop: '8px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600,
              fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
              background: 'var(--ink)', color: 'white', padding: '14px', border: 'none',
              cursor: isPending ? 'default' : 'pointer', opacity: isPending ? 0.6 : 1,
            }}>
            {isPending ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <Link href="/" className="hover-underline" style={{ display: 'inline-block', marginTop: '24px', fontSize: '12px', color: 'var(--muted)', textDecoration: 'none' }}>
          ← Retour au site
        </Link>
      </div>
    </div>
  )
}
