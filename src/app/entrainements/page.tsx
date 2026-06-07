import type { Metadata } from 'next'
import { SheetCalendar } from '@/components/ui/SheetCalendar'

export const metadata: Metadata = { title: "Lieux & Horaires d'Entraînement" }

const SCHEDULE_2526 = [
  { day: 'Lundi', slots: [{ time: '19h00 – 21h00', label: 'Entraînement mini' }] },
  { day: 'Mardi', slots: [{ time: '20h30 – 22h00', label: 'Entraînement senior' }] },
  { day: 'Mercredi', slots: [{ time: '19h00 – 21h00', label: 'Entraînement junior' }] },
  { day: 'Jeudi', slots: [{ time: '19h00 – 21h00', label: 'Entraînement mini' }, { time: '20h00 – 22h00', label: 'Entraînement senior' }] },
  { day: 'Vendredi', slots: [{ time: '18h00 – 20h00', label: 'Entraînement junior' }] },
  { day: 'Samedi', slots: [{ time: '13h30 – 18h00', label: 'Entraînement Intensity' }], highlight: true },
]

const EQUIPMENT = [
  { icon: '🟩', label: 'Praticable de gymnastique', desc: 'Surface souple aux normes compétition.' },
  { icon: '📏', label: 'Airtrack 15 mètres', desc: 'Piste gonflable avec sortie en fosse pour le tumbling.' },
  { icon: '⬆️', label: 'Trampoline', desc: 'Pour le développement des éléments aériens.' },
  { icon: '🚗', label: 'Grand parking', desc: 'Parking public attenant + parking privé.' },
  { icon: '🏠', label: 'Salles privatives', desc: 'Deux salles à l\'étage pour les réunions et le matériel.' },
]

export default function EntraînementsPage() {
  return (
    <div style={{ paddingTop: '60px' }}>
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: 'var(--py) var(--px) 48px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Gymnase Olympe de Gouges · Orléans</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 0.95, letterSpacing: '-1.5px', marginBottom: '0' }}>
          Lieux & Horaires<br />
          <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>d'Entraînement</em>
        </h1>
      </div>

      <div style={{ padding: 'var(--py) var(--px)' }}>

        {/* 2026/2027 notice */}
        <div style={{ background: 'var(--ink)', padding: 'clamp(24px, 4vw, 40px) clamp(20px, 4vw, 40px)', marginBottom: 'var(--py)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '10px' }}>
              <span style={{ width: '14px', height: '1px', background: 'var(--fire-light)', display: 'block' }} />Saison 2026 / 2027
            </div>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
              Les horaires de la saison <strong style={{ color: 'white', fontWeight: 500 }}>2026/2027</strong> seront communiqués à la rentrée de septembre. Les équipes internationales reçoivent un <strong style={{ color: 'white', fontWeight: 500 }}>rétroplanning complet</strong> dès la fin des sélections.
            </p>
          </div>
          <a href="/inscriptions" style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--fire)', color: 'white', padding: '12px 24px', textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}>
            Inscriptions →
          </a>
        </div>

        {/* Gymnase + Équipements */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', marginBottom: 'var(--py)' }}>
          <div>
            <div className="label-caps" style={{ marginBottom: '20px' }}>Notre gymnase</div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--ink)', lineHeight: 1.15, marginBottom: '16px' }}>
              Gymnase<br /><em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>Olympe de Gouges</em>
            </h2>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, marginBottom: '20px' }}>
              Grâce à l'ASPTT et au soutien de la Ville d'Orléans, le club bénéficie d'infrastructures de grande qualité adaptées au cheerleading de haut niveau.
            </p>
            <div style={{ padding: '20px 24px', background: 'var(--cream)', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Adresse</div>
              <p style={{ fontSize: '15px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.6, marginBottom: '12px' }}>
                1 Pl. Albert Camus<br />45100 Orléans
              </p>
              <a href="https://maps.google.com/?q=1+Place+Albert+Camus+45100+Orléans" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--fire)', textDecoration: 'none' }}>
                Voir sur Google Maps →
              </a>
            </div>
          </div>

          <div>
            <div className="label-caps" style={{ marginBottom: '20px' }}>Équipements</div>
            <div>
              {EQUIPMENT.map(eq => (
                <div key={eq.label} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: '14px', padding: '16px 0', borderBottom: '1px solid var(--border-light)', alignItems: 'start' }}>
                  <div style={{ width: '38px', height: '38px', background: 'var(--cream-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{eq.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '3px' }}>{eq.label}</div>
                    <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.5 }}>{eq.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Planning hebdomadaire */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--py)', marginBottom: 'var(--py)' }}>
          <div className="label-caps" style={{ marginBottom: '16px' }}>Planning hebdomadaire</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 44px)', lineHeight: 1.1 }}>
              Horaires <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>2025/26</em>
            </h2>
            <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)', fontStyle: 'italic' }}>Reconduit chaque semaine</p>
          </div>

          {/* ── SCHEDULE GRID — gap entre les lignes sur mobile ── */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',   /* ← espacement entre chaque ligne */
          }}>
            {SCHEDULE_2526.map((slot) => (
              <div key={slot.day} style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(72px, 20vw, 140px) 1fr',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
              }}>
                {/* Jour */}
                <div style={{
                  padding: 'clamp(14px, 3vw, 24px) clamp(14px, 3vw, 28px)',
                  background: slot.highlight ? 'var(--fire)' : 'var(--cream)',
                  borderRight: '1px solid var(--border-light)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}>
                  <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(15px, 3vw, 18px)', color: slot.highlight ? 'white' : 'var(--ink)', lineHeight: 1 }}>
                    {slot.day}
                  </div>
                </div>

                {/* Créneaux */}
                <div style={{
                  padding: 'clamp(12px, 2.5vw, 16px) clamp(14px, 3vw, 28px)',
                  background: slot.highlight ? 'rgba(200,64,26,0.04)' : 'var(--white)',
                  display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center',
                }}>
                  {slot.slots.map((s, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 700, fontSize: 'clamp(11px, 2.5vw, 13px)', letterSpacing: '0.5px', color: slot.highlight ? 'var(--fire)' : 'var(--ink)' }}>
                        {s.time}
                      </span>
                      <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: 'clamp(9px, 2vw, 11px)', letterSpacing: '2px', textTransform: 'uppercase', padding: '2px 10px', background: slot.highlight ? 'var(--fire)' : 'var(--ink)', color: 'white' }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)', marginTop: '12px', fontStyle: 'italic' }}>
            Les équipes internationales reçoivent un rétroplanning complet incluant camps, choreos et compétitions.
          </p>
        </div>

        {/* Calendrier live */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--py)', marginBottom: 'var(--py)' }}>
          <div className="label-caps" style={{ marginBottom: '16px' }}>Calendrier de saison</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 44px)', lineHeight: 1.1 }}>
              Vue <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>annuelle</em>
            </h2>
            <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)' }}>Mis à jour en temps réel par les coachs</p>
          </div>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <SheetCalendar />
          </div>
        </div>

        {/* Summer Training */}
        <div style={{ background: 'var(--ink)', padding: 'clamp(32px, 5vw, 56px) clamp(20px, 5vw, 56px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--fire-light)', marginBottom: '14px' }}>
            <span style={{ width: '14px', height: '1px', background: 'var(--fire-light)', display: 'block' }} />Hors saison
          </div>
          <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(22px, 4vw, 28px)', color: 'white', lineHeight: 1.2, marginBottom: '14px' }}>
            Open Summer <em style={{ fontStyle: 'italic', color: 'var(--fire-light)' }}>Training</em>
          </h3>
          <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '24px' }}>
            Accès quasi quotidien au gymnase pendant les grandes vacances. Ouvert à tous, encadré par les coachs.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
            {[
              { val: '5 €', label: 'La séance' },
              { val: '30 €', label: 'Tout l\'été' },
              { val: '0 €', label: 'Licenciés' },
              { val: '📲', label: 'WhatsApp' },
            ].map((s, i) => (
              <div key={s.label} style={{ background: i === 2 ? 'var(--fire)' : 'rgba(255,255,255,0.04)', padding: 'clamp(18px, 3vw, 24px) clamp(14px, 2.5vw, 20px)' }}>
                <div style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(22px, 4vw, 32px)', color: 'white', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: i === 2 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)', marginTop: '5px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}