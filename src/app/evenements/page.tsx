import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Événements' }
export default function EvenementsPage() {
  return (
    <div style={{ paddingTop: '64px' }}>
      <div style={{ background: 'var(--cream)', padding: '80px 64px 64px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Animations & événements</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px' }}>
          Nos <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>événements</em>
        </h1>
      </div>
      <div style={{ padding: '80px 64px', textAlign: 'center' }}>
        <p style={{ fontSize: '16px', fontWeight: 300, color: 'var(--muted)' }}>Contenu à venir — Open Cheer Centre, animations, stages d'été…</p>
      </div>
    </div>
  )
}