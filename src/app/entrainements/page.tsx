import type { Metadata } from 'next'
import { SheetCalendar } from '@/components/ui/SheetCalendar'

export const metadata: Metadata = { title: "Lieux & Horaires d'Entraînement" }

// Planning 2025/2026 issu du calendrier des coachs
const SCHEDULE_2526 = [
  {
    day: 'Lundi',
    slots: [{ time: '19h00 – 21h00', label: 'Entraînement mini' }],
  },
  {
    day: 'Mardi',
    slots: [{ time: '20h30 – 22h00', label: 'Entraînement senior' }],
  },
  {
    day: 'Mercredi',
    slots: [
      { time: '19h00 – 21h00', label: 'Entraînement junior' },
    ],
  },
  {
    day: 'Jeudi',
    slots: [
      { time: '19h00 – 21h00', label: 'Entraînement mini' },
      { time: '20h00 – 22h00', label: 'Entraînement senior' },
    ],
  },
  {
    day: 'Vendredi',
    slots: [
      { time: '18h00 – 20h00', label: 'Entraînement junior' },
    ],
  },
  {
    day: 'Samedi',
    slots: [{ time: '13h30 – 18h00', label: 'Entraînement Intensity' }],
    highlight: true,
  },
]

const EQUIPMENT = [
  { icon: '🟩', label: 'Praticable de gymnastique', desc: "Surface souple aux normes compétition, indispensable pour la sécurité lors des portés (stunts) et acrobaties." },
  { icon: '📏', label: 'Airtrack 15 mètres', desc: "Piste gonflable avec sortie en fosse pour le travail de tumbling en totale sécurité." },
  { icon: '⬆️', label: 'Trampoline', desc: "Pour le développement des éléments aériens et le perfectionnement des sauts." },
  { icon: '🚗', label: 'Grand parking', desc: "Parking public attenant au gymnase + parking privé. Accès facile en voiture." },
  { icon: '🏠', label: 'Salles privatives', desc: "Deux salles à l'étage pour le stockage du matériel et les réunions de club." },
]

export default function EntraînementsPage() {
  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: '80px 64px 64px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Gymnase Olympe de Gouges · Orléans</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.95, letterSpacing: '-1.5px', marginBottom: '20px' }}>
          Lieux & Horaires<br />
          <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>d'Entraînement</em>
        </h1>
      </div>

      <div style={{ padding: '80px 64px' }}>

        {/* ── 2026/2027 notice ── */}
        <div style={{ background: 'var(--ink)', padding: '32px 40px', marginBottom: '80px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '10px' }}>
              <span style={{ width: '14px', height: '1px', background: 'var(--fire-light)', display: 'block' }} />
              Saison 2026 / 2027
            </div>
            <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: '560px' }}>
              Les horaires de la saison <strong style={{ color: 'white', fontWeight: 500 }}>2026/2027</strong> seront communiqués à la rentrée de septembre. Les équipes à vocation internationale reçoivent un <strong style={{ color: 'white', fontWeight: 500 }}>rétroplanning complet de l'année</strong> dès la fin des sélections.
            </p>
          </div>
          <a href="/inscriptions"
            style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--fire)', color: 'white', padding: '12px 28px', textDecoration: 'none', flexShrink: 0 }}>
            Voir les inscriptions →
          </a>
        </div>

        {/* ── Gymnase ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '80px', alignItems: 'start' }}>
          <div>
            <div className="label-caps" style={{ marginBottom: '20px' }}>Notre gymnase</div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '32px', color: 'var(--ink)', lineHeight: 1.15, marginBottom: '20px' }}>
              Gymnase<br /><em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>Olympe de Gouges</em>
            </h2>
            <p style={{ fontSize: '15px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, marginBottom: '28px' }}>
              Grâce à son affiliation à l'ASPTT et au soutien de la Ville d'Orléans, le club bénéficie d'infrastructures de grande qualité, parfaitement adaptées aux exigences du cheerleading de haut niveau.
            </p>
            <div style={{ padding: '24px 28px', background: 'var(--cream)', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>Adresse</div>
              <p style={{ fontSize: '15px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.6 }}>
                45 ter rue des Montées<br />45100 Orléans
              </p>
              <a href="https://maps.google.com/?q=45+ter+rue+des+Montées+45100+Orléans" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', marginTop: '14px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--fire)', textDecoration: 'none' }}>
                Voir sur Google Maps →
              </a>
            </div>
          </div>

          {/* Équipements */}
          <div>
            <div className="label-caps" style={{ marginBottom: '20px' }}>Équipements disponibles</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {EQUIPMENT.map((eq) => (
                <div key={eq.label} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: '16px', padding: '18px 0', borderBottom: '1px solid var(--border-light)', alignItems: 'start' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--cream-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                    {eq.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '4px' }}>{eq.label}</div>
                    <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.6 }}>{eq.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Planning 2025/2026 ── */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '64px', marginBottom: '80px' }}>
          <div className="label-caps" style={{ marginBottom: '20px' }}>Planning hebdomadaire</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1 }}>
              Horaires <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>2025/26</em>
            </h2>
            <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)', fontStyle: 'italic' }}>
              Planning reconduit chaque semaine · Horaires 2026/27 à la rentrée
            </p>
          </div>

          <div style={{ border: '1px solid var(--border)', overflow: 'hidden' }}>
            {SCHEDULE_2526.map((slot, i) => (
              <div key={slot.day} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', borderBottom: i < SCHEDULE_2526.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                {/* Day */}
                <div style={{ padding: '24px 28px', background: slot.highlight ? 'var(--fire)' : (i % 2 === 0 ? 'var(--cream)' : 'var(--white)'), borderRight: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '18px', color: slot.highlight ? 'white' : 'var(--ink)', lineHeight: 1 }}>
                    {slot.day}
                  </div>
                </div>
                {/* Slots */}
                <div style={{ padding: '16px 28px', background: slot.highlight ? 'rgba(200,64,26,0.04)' : (i % 2 === 0 ? 'var(--cream)' : 'var(--white)'), display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                  {slot.slots.map((s, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', color: slot.highlight ? 'var(--fire)' : 'var(--ink)', minWidth: '120px' }}>
                        {s.time}
                      </span>
                      <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', padding: '3px 12px', background: slot.highlight ? 'var(--fire)' : 'var(--ink)', color: 'white' }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)', marginTop: '12px', fontStyle: 'italic' }}>
            Les équipes à vocation internationale (Intensity, Audacity, Silver Stars, Sparks…) reçoivent un rétroplanning complet de la saison dès la fin des sélections, incluant camps, choreos et déplacements en compétition.
          </p>
        </div>

        {/* ── Calendrier live Google Sheet ── */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '64px', marginBottom: '80px' }}>
          <div className="label-caps" style={{ marginBottom: '20px' }}>Calendrier de saison</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1 }}>
              Vue <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>annuelle</em>
            </h2>
            <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)' }}>
              Mis à jour en temps réel par les coachs
            </p>
          </div>

          {/* Légende */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            {[
              { label: 'Entraînements', color: '#1a5a8a' },
              { label: 'Compétitions', color: 'var(--fire)' },
              { label: 'Summit', color: 'var(--fire)' },
              { label: 'Choreo / Camp', color: '#1a5a8a' },
              { label: 'Vacances', color: 'var(--muted)' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color, display: 'block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)' }}>{l.label}</span>
              </div>
            ))}
          </div>

          <SheetCalendar />
        </div>

        {/* ── Open Summer Training ── */}
        <div style={{ background: 'var(--ink)', padding: '56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '16px' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--fire-light)', display: 'block' }} />
              Hors saison
            </div>
            <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '26px', color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>
              Open Summer <em style={{ fontStyle: 'italic', color: 'var(--fire-light)' }}>Training</em>
            </h3>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              Accès quasi quotidien au gymnase pendant les grandes vacances. Ouvert à tous les niveaux, encadré par les coachs et athlètes du club. Toutes les infos sur le WhatsApp du club.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.08)', alignSelf: 'start' }}>
            {[
              { val: '5 €', label: 'La séance' },
              { val: '30 €', label: "Tout l'été" },
              { val: '0 €', label: 'Licenciés' },
              { val: '📲', label: 'WhatsApp club' },
            ].map((s, i) => (
              <div key={s.label} style={{ background: i === 2 ? 'var(--fire)' : 'rgba(255,255,255,0.04)', padding: '24px 20px' }}>
                <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '32px', color: 'white', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: i === 2 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)', marginTop: '6px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}