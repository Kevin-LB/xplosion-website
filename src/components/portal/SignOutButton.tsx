import { signOut } from '@/auth'

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/' })
      }}
    >
      <button
        type="submit"
        style={{
          fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '11px',
          letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
          background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', padding: '9px 18px',
          cursor: 'pointer',
        }}
      >
        Déconnexion
      </button>
    </form>
  )
}
