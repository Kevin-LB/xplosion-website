import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Événements',
  description: "Les animations et événements d'Xplosion Cheerleaders Orléans.",
}

const EVENTS = [
  // ── Sport & Spectacles ──
  {
    category: 'sport',
    title: "Défilé de Jeanne d'Arc",
    location: 'Orléans',
    date: 'Mai — chaque année',
    description: "Chaque année en mai, Xplosion participe aux festivités de la Fête de Jeanne d'Arc en animant le défilé dans les rues d'Orléans avec portés et acrobaties. Un moment de fierté locale pour tout le club.",
    photo: '/images/IMG_0971.JPG',
    recurrent: true,
  },
  {
    category: 'sport',
    title: 'Trophées du Sport — Ville d\'Orléans',
    location: 'Orléans',
    date: 'Décembre — chaque année',
    description: "Xplosion participe à la cérémonie annuelle des Trophées du Sport organisée par la Ville d'Orléans, qui met à l'honneur les clubs et athlètes du territoire. Une belle reconnaissance pour le travail de toute une saison.",
    photo: '/images/IMG_1052.JPG',
    recurrent: true,
  },
  {
    category: 'sport',
    title: 'Les Foulées Roses',
    location: 'Olivet',
    date: 'Octobre — chaque année',
    description: "Présence et animation lors de la course solidaire contre le cancer du sein à Olivet. Xplosion met l'énergie du cheerleading au service d'une belle cause.",
    photo: '/images/IMG_0978.JPG',
    recurrent: true,
  },
  {
    category: 'sport',
    title: 'Animation Match AJ Auxerre',
    location: 'Auxerre — Stade Abbé-Deschamps',
    date: 'Décembre 2025',
    description: "Animation lors du match anniversaire de l'AJA en décembre 2025. Xplosion a animé les tribunes avec une performance devant plusieurs milliers de spectateurs pour célébrer cet événement exceptionnel.",
    photo: '/images/IMG_0980.JPG',
    recurrent: false,
  },
  {
    category: 'sport',
    title: 'Partenariat OLB — Orléans Loiret Basket',
    location: 'Orléans — Palais des Sports',
    date: 'Saisons régulières — matchs à domicile',
    description: "Xplosion anime les matchs à domicile de l'Orléans Loiret Basket (OLB) en tant que squad officielle. Performances à la mi-temps, ambiance de salle et visibilité nationale en Pro B.",
    photo: '/images/IMG_1054.JPG',
    recurrent: true,
  },
  {
    category: 'sport',
    title: 'Vital Sport — Back to Sport',
    location: 'Orléans',
    date: 'Septembre — chaque année',
    description: "Participation au grand événement sportif Vital Sport pour présenter le cheerleading, recruter de nouveaux athlètes et faire découvrir le club aux Orléanais à la rentrée.",
    photo: '/images/0fb221a9-83a5-4e8f-9d90-88204c897bc9.JPG',
    recurrent: true,
  },
  // ── Initiations & Découverte ──
  {
    category: 'initiation',
    title: 'Initiation au Centre de Loisirs de Darvoy',
    location: 'Darvoy',
    date: 'Courant 2024',
    description: "Intervention auprès des enfants du centre de loisirs pour une initiation au cheerleading : tumbling, portés adaptés, sauts et danse. Une façon ludique de faire découvrir le sport à de futurs champions.",
    photo: '/images/B5BD3619-F698-4BF4-8F2F-6F155175E7F3.JPG',
    recurrent: false,
  },
  {
    category: 'initiation',
    title: "Initiation UNSS — Collège Étienne Dolet",
    location: 'Orléans — Collège Étienne Dolet',
    date: 'Courant saison scolaire',
    description: "Atelier d'initiation au cheerleading dans le cadre de l'Union Nationale du Sport Scolaire. Xplosion intervient pour transmettre sa passion auprès des jeunes scolaires.",
    photo: '/images/eb81d6d9-abc4-4e52-8f46-9c7d03e6d2ab.JPG',
    recurrent: false,
  },
  {
    category: 'initiation',
    title: "Portes ouvertes & Rentrée en Fête",
    location: 'Orléans — Rue Royale',
    date: '7 septembre — chaque année',
    description: "Chaque année à la rentrée, Xplosion est présent rue Royale à Orléans de 11h à 18h30. L'occasion de rencontrer le club, de voir des démonstrations et de s'inscrire pour la saison.",
    photo: '/images/IMG_4618.jpg',
    recurrent: true,
  },
  // ── Actions solidaires & Médias ──
  {
    category: 'solidaire',
    title: "Opération Pièces Jaunes",
    location: 'CHR Orléans',
    date: 'Janvier 2020',
    description: "Animation lors du lancement de l'opération Pièces Jaunes au CHR d'Orléans en janvier 2020. Xplosion a mis son énergie au service des enfants hospitalisés pour égayer cette belle initiative solidaire.",
    photo: '/images/IMG_6047.jpg',
    recurrent: false,
  },
  {
    category: 'solidaire',
    title: 'Reportage France 3 Centre-Val de Loire',
    location: 'Orléans',
    date: 'Novembre 2021',
    description: "Xplosion a été mis à l'honneur dans un reportage diffusé sur France 3 Centre-Val de Loire en novembre 2021, permettant de faire rayonner le club et le cheerleading dans toute la région.",
    photo: '/images/xplosion.jpg',
    recurrent: false,
  },
]

const CATEGORIES = [
  { key: 'sport',      label: 'Sport & Spectacles',          color: 'var(--fire)' },
  { key: 'initiation', label: 'Initiations & Découverte',    color: '#1a5a8a' },
  { key: 'solidaire',  label: 'Actions solidaires & Médias', color: 'var(--gold)' },
]

function Dot({ color }: { color: string }) {
  return <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
}

export default function EvenementsPage() {
  return (
    <div style={{ paddingTop: '64px' }}>

      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: 'clamp(48px,8vw,80px) var(--px) clamp(32px,5vw,64px)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Animations & Événements</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px', marginBottom: '24px' }}>
          Xplosion<br /><em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>en action</em>
        </h1>
        <p style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.8, maxWidth: '640px' }}>
          Les animations permettent d'aider les athlètes à financer les compétitions nationales et internationales auxquelles la section participe.{' '}
          <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>Merci à tous ceux qui ont déjà pu y contribuer !</strong>
        </p>
      </div>

      <div style={{ padding: 'clamp(40px,8vw,80px) var(--px)' }}>

        {/* Légende */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: 'clamp(32px,5vw,56px)', padding: '16px 20px', background: 'var(--cream)', border: '1px solid var(--border-light)' }}>
          {CATEGORIES.map(cat => (
            <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Dot color={cat.color} />
              <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {cat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Events by category */}
        {CATEGORIES.map(cat => {
          const items = EVENTS.filter(e => e.category === cat.key)
          return (
            <div key={cat.key} style={{ marginBottom: 'clamp(48px,8vw,80px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: `2px solid ${cat.color}` }}>
                <Dot color={cat.color} />
                <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(20px,3vw,28px)', color: 'var(--ink)', lineHeight: 1 }}>
                  {cat.label}
                </h2>
                <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginLeft: 'auto' }}>
                  {items.length} événement{items.length > 1 ? 's' : ''}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1px', background: 'var(--border-light)', border: '1px solid var(--border-light)' }}>
                {items.map((event) => (
                  <div key={event.title} style={{ background: 'var(--white)', borderLeft: `3px solid ${cat.color}`, overflow: 'hidden' }}>
                    {/* Photo */}
                    <div style={{ position: 'relative', height: '160px', overflow: 'hidden', background: 'var(--cream-2)' }}>
                      <Image src={event.photo} alt={event.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                      {event.recurrent && (
                        <span style={{ position: 'absolute', top: '10px', right: '10px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 9px', background: cat.color, color: 'white' }}>
                          Récurrent
                        </span>
                      )}
                    </div>

                    <div style={{ padding: 'clamp(20px,2.5vw,28px) clamp(18px,2.2vw,24px)' }}>
                      <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: cat.color, marginBottom: '6px' }}>
                        {event.date}
                      </div>
                      <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
                        {event.location}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(17px,2.5vw,21px)', color: 'var(--ink)', lineHeight: 1.2, marginBottom: '12px' }}>
                        {event.title}
                      </h3>
                      <p style={{ fontSize: 'clamp(12px,1.6vw,14px)', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.75 }}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* CTA */}
        <div style={{ background: 'var(--ink)', padding: 'clamp(32px,5vw,56px) clamp(20px,4vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '14px' }}>
              <span style={{ width: '14px', height: '1px', background: 'var(--fire-light)', display: 'block' }} />
              Nous solliciter
            </div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(20px,3vw,30px)', color: 'white', lineHeight: 1.2, marginBottom: '10px' }}>
              Vous souhaitez une <em style={{ fontStyle: 'italic', color: 'var(--fire-light)' }}>animation Xplosion</em> ?
            </h2>
            <p style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '460px' }}>
              Matchs, événements associatifs, fêtes de ville, soirées, courses solidaires… Contactez-nous pour discuter de votre projet !
            </p>
          </div>
          <a href="mailto:xplosioncheerleaders.xco@gmail.com"
            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--fire)', color: 'white', padding: '16px 36px', textDecoration: 'none', flexShrink: 0, display: 'inline-block' }}>
            Nous contacter →
          </a>
        </div>

      </div>
    </div>
  )
}