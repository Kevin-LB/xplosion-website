import type { Metadata } from 'next'
import { MemberPhoto } from '@/components/ui/MemberPhoto'
import { BUREAU } from '@/lib/data'

export const metadata: Metadata = { title: 'Organisation de la Section' }

const COMITES = [
  { name: 'Partenariats', icon: '🤝', desc: 'Développement et gestion des relations avec les sponsors et partenaires locaux.' },
  { name: 'Communication', icon: '📣', desc: 'Réseaux sociaux, création de contenus, relations presse et communication interne.' },
  { name: 'Événementiel', icon: '🎪', desc: 'Organisation des événements du club : Open Cheer Centre, animations, stages.' },
  { name: 'Logistique', icon: '🚌', desc: 'Gestion des déplacements en compétition : transport, hébergement, restauration.' },
  { name: 'Projets', icon: '💡', desc: 'Développement de nouveaux projets : innovations pédagogiques, nouvelles équipes.' },
]

export default function OrganisationPage() {
  return (
    <div style={{ paddingTop: '60px' }}>
      <div style={{ background: 'var(--cream)', padding: 'var(--py) var(--px) 48px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Association ASPTT Orléans</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(32px, 7vw, 72px)', lineHeight: 0.95, letterSpacing: '-1.5px', marginBottom: '16px' }}>
          Organisation<br /><em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>de la Section</em>
        </h1>
        <p style={{ fontSize: '15px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, maxWidth: '560px' }}>
          La section fonctionne comme une association sportive. Un bureau élu, appuyé par des bénévoles en comités de pilotage.
        </p>
      </div>

      <div style={{ padding: 'var(--py) var(--px)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Le Bureau</div>
        <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 44px)', lineHeight: 1.1, marginBottom: '36px' }}>
          Équipe <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>dirigeante</em>
        </h2>

        {/* auto-fill — works for any count, no orphan */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '64px' }}>
          {BUREAU.map(m => (
            <div key={m.name} style={{ background: 'var(--white)', padding: '28px 20px' }}>
              <MemberPhoto src={m.photo} name={m.name} />
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '6px' }}>{m.role}</div>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '16px', color: 'var(--ink)', marginBottom: '4px' }}>{m.name}</div>
              <div style={{ fontSize: '11px', fontWeight: 300, color: 'var(--muted)' }}>Depuis {m.since}</div>
              {m.note && <div style={{ fontSize: '11px', color: 'var(--fire)', fontStyle: 'italic', marginTop: '3px' }}>{m.note}</div>}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '48px' }}>
          <div className="label-caps" style={{ marginBottom: '20px' }}>Bénévoles</div>
          <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 44px)', lineHeight: 1.1, marginBottom: '36px' }}>
            Les Comités de <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>Pilotage</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {COMITES.map((c, i) => (
              <div key={c.name} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)', padding: '32px 24px' }}>
                <div style={{ width: '40px', height: '40px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '16px' }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '18px', color: 'var(--ink)', marginBottom: '10px' }}>{c.name}</h3>
                <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '48px', background: 'var(--fire)', padding: 'clamp(32px, 4vw, 56px) clamp(20px, 4vw, 64px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 28px)', color: 'white', marginBottom: '6px' }}>Rejoindre l'équipe bénévole</h2>
            <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.75)' }}>Débutant, parent ou passionné — rejoignez un comité.</p>
          </div>
          <a href="mailto:xplosioncheerleaders.xco@gmail.com"
            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', background: 'white', color: 'var(--fire)', padding: '13px 28px', textDecoration: 'none', flexShrink: 0 }}>
            Nous contacter →
          </a>
        </div>
      </div>
    </div>
  )
}