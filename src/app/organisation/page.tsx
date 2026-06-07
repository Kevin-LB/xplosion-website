import type { Metadata } from 'next'
import { MemberPhoto } from '@/components/ui/MemberPhoto'

export const metadata: Metadata = { title: 'Organisation de la Section' }

const BUREAU = [
  { name: 'Marion Guiougou', role: 'Présidente', since: 'décembre 2014', note: 'Co-fondatrice de la section', photo: '/images/marion.png' },
  { name: 'Nathalie Robert', role: 'Trésorière', since: 'février 2021', photo: '/images/nathalie.png' },
  { name: 'Anaïs Santos', role: 'Secrétaire', since: 'mars 2023', photo: '/images/anais.png' },
  { name: 'Johanne Guiougou', role: 'Secrétaire', since: 'décembre 2014', note: 'Co-fondatrice de la section', photo: '/images/johanne.png' },
  { name: 'Mélanie Pavy', role: 'Vice-trésorière', since: 'février 2026', photo: '/images/melanie.png' },
]

const COMITES = [
  { name: 'Partenariats', icon: '🤝', desc: 'Développement et gestion des relations avec les sponsors et partenaires locaux. Recherche de nouveaux partenariats pour soutenir le financement des compétitions.' },
  { name: 'Communication', icon: '📣', desc: 'Gestion des réseaux sociaux, création de contenus, relations presse et médias locaux. Mise à jour du site web et communication interne.' },
  { name: 'Événementiel', icon: '🎪', desc: "Organisation des événements du club : Open Cheer Centre, animations, stages. Coordination logistique des compétitions organisées à Orléans." },
  { name: 'Logistique', icon: '🚌', desc: 'Gestion des déplacements en compétition : transport, hébergement, restauration. Coordination avec les familles et encadrement pendant les déplacements.' },
  { name: 'Projets', icon: '💡', desc: 'Développement de nouveaux projets pour la section : innovations pédagogiques, nouvelles équipes, partenariats sportifs et initiatives associatives.' },
]

export default function OrganisationPage() {
  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: '80px 64px 64px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Association ASPTT Orléans</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.95, letterSpacing: '-1.5px', marginBottom: '20px' }}>
          Organisation<br /><em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>de la Section</em>
        </h1>
        <p style={{ fontSize: '16px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, maxWidth: '600px' }}>
          La section ASPTT Orléans Cheerleading fonctionne comme une association sportive. Un bureau élu, appuyé par des bénévoles engagés organisés en comités de pilotage.
        </p>
      </div>

      <div style={{ padding: '80px 64px' }}>

        {/* Bureau */}
        <div className="label-caps" style={{ marginBottom: '20px' }}>Le Bureau</div>
        <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, marginBottom: '48px' }}>
          Équipe <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>dirigeante</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '80px' }}>
          {BUREAU.map((member) => (
            <div key={member.name} style={{ background: 'var(--white)', padding: '36px 28px' }}>
              <MemberPhoto src={member.photo} name={member.name} />
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '8px' }}>
                {member.role}
              </div>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '18px', color: 'var(--ink)', lineHeight: 1.2, marginBottom: '6px' }}>
                {member.name}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)' }}>Depuis {member.since}</div>
              {member.note && (
                <div style={{ fontSize: '11px', fontWeight: 300, color: 'var(--fire)', fontStyle: 'italic', marginTop: '4px' }}>{member.note}</div>
              )}
            </div>
          ))}
        </div>

        {/* Comités */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '64px' }}>
          <div className="label-caps" style={{ marginBottom: '20px' }}>Bénévoles & Organisation</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1 }}>
              Les Comités de <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>Pilotage</em>
            </h2>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', maxWidth: '380px', lineHeight: 1.7, textAlign: 'right' }}>
              Derrière chaque comité se trouvent des bénévoles engagés — athlètes, entraîneurs ou parents. La section recherche continuellement de nouvelles personnes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {COMITES.map((c, i) => (
              <div key={c.name} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)', padding: '40px 32px' }}>
                <div style={{ width: '44px', height: '44px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '20px' }}>{c.icon}</div>
                <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '10px' }}>Comité</div>
                <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '22px', color: 'var(--ink)', lineHeight: 1.2, marginBottom: '14px' }}>{c.name}</h3>
                <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.75 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA bénévole */}
        <div style={{ marginTop: '64px', background: 'var(--fire)', padding: '56px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '28px', color: 'white', lineHeight: 1.25, marginBottom: '8px' }}>
              Rejoindre <em style={{ fontStyle: 'italic', opacity: 0.8 }}>l'équipe bénévole</em>
            </h2>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
              Que vous soyez débutant, parent ou passionné, vous pouvez rejoindre un comité à tout moment.
            </p>
          </div>
          <a href="mailto:secretaire.aspttcheerleading@gmail.com"
            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'white', color: 'var(--fire)', padding: '16px 40px', textDecoration: 'none', flexShrink: 0 }}>
            Nous contacter →
          </a>
        </div>
      </div>
    </div>
  )
}