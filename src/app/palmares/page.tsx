'use client'

import { useState } from 'react'
import { RESULTS } from '@/lib/data'

const SEASONS = ['2025/2026', '2024/2025', '2022/2023', '2021/2022', '2018/2019', '2017/2018', '2016/2017', '2015/2016']
const TEAMS_LIST = ['Intensity', 'Audacity', 'Silver Stars', 'Fire', 'Sparks', 'Blackstarz', 'Gravity', 'Power', 'Ferocity', 'Météore', 'Fusion', 'Équipe Seniors Niveau 1', 'Équipe Seniors']

type View = 'saison' | 'equipe'
type SortOrder = 'rank' | 'team'

function ResultRow({ r, showSeason = false }: { r: (typeof RESULTS)[0]; showSeason?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr auto', alignItems: 'center', gap: '20px', padding: '18px 0', borderBottom: '1px solid var(--border-light)' }}>
      <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '26px', color: r.highlight ? 'var(--gold)' : 'var(--fire)', lineHeight: 1 }}>{r.rank ?? '—'}</span>
      <div>
        <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '2px' }}>{r.competition}</div>
        <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 500, color: 'var(--ink-2)' }}>{r.team}</span>
          {r.detail && <span>— {r.detail}</span>}
          {showSeason && <span style={{ fontSize: '11px', color: 'var(--border)', fontStyle: 'italic' }}>· {r.season}</span>}
        </div>
      </div>
      {r.tag && (
        <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 12px', border: `1px solid ${r.highlight ? 'var(--fire)' : 'var(--border)'}`, color: r.highlight ? 'var(--fire)' : 'var(--muted)', whiteSpace: 'nowrap' }}>
          {r.tag}
        </span>
      )}
    </div>
  )
}

export default function PalmaresPage() {
  const [view, setView] = useState<View>('saison')
  const [sortOrder, setSortOrder] = useState<SortOrder>('rank')
  const [activeTeam, setActiveTeam] = useState<string>('Intensity')

  const btnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-barlow-condensed), sans-serif',
    fontWeight: 600,
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '10px 24px',
    border: 'none',
    cursor: 'pointer',
    background: active ? 'var(--ink)' : 'transparent',
    color: active ? 'white' : 'var(--muted)',
    transition: 'all 0.2s',
  })

  const sortBtnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-barlow-condensed), sans-serif',
    fontWeight: 500,
    fontSize: '10px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '7px 16px',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    background: active ? 'var(--cream-2)' : 'transparent',
    color: active ? 'var(--ink)' : 'var(--muted)',
    transition: 'all 0.2s',
  })

  const sortResults = (rows: typeof RESULTS) => {
    if (sortOrder === 'team') {
      return [...rows].sort((a, b) => a.team.localeCompare(b.team, 'fr'))
    }
    // rank order: 1 first, null last
    return [...rows].sort((a, b) => {
      if (a.rank === null) return 1
      if (b.rank === null) return -1
      return a.rank - b.rank
    })
  }

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: '80px 64px 48px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Depuis 2015</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px' }}>
            Palmarès <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>complet</em>
          </h1>
          {/* View toggle */}
          <div style={{ display: 'flex', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <button style={btnStyle(view === 'saison')} onClick={() => setView('saison')}>Par saison</button>
            <button style={{ ...btnStyle(view === 'equipe'), borderLeft: '1px solid var(--border)' }} onClick={() => setView('equipe')}>Par équipe</button>
          </div>
        </div>
      </div>

      {/* BY SEASON */}
      {view === 'saison' && (
        <div style={{ padding: '64px 64px' }}>
          {/* Sort sub-options */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
            <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginRight: '8px' }}>
              Trier par
            </span>
            <button style={sortBtnStyle(sortOrder === 'rank')} onClick={() => setSortOrder('rank')}>
              Classement
            </button>
            <button style={sortBtnStyle(sortOrder === 'team')} onClick={() => setSortOrder('team')}>
              Équipe
            </button>
          </div>

          {SEASONS.map(season => {
            const raw = RESULTS.filter(r => r.season === season)
            if (!raw.length) return null
            const rows = sortResults(raw)
            return (
              <div key={season} style={{ marginBottom: '64px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                  <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '28px', color: 'var(--ink)' }}>{season}</h2>
                  <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    {rows.length} résultat{rows.length > 1 ? 's' : ''}
                  </span>
                </div>
                {rows.map((r, i) => <ResultRow key={i} r={r} />)}
              </div>
            )
          })}

          <div style={{ padding: '24px 28px', background: 'var(--cream)', border: '1px solid var(--border-light)' }}>
            <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>2019 / 2021</span>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)', marginTop: '8px' }}>Compétitions annulées suite à la pandémie COVID-19.</p>
          </div>
        </div>
      )}

      {/* BY TEAM */}
      {view === 'equipe' && (
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '600px' }}>
          {/* Sidebar */}
          <div style={{ background: 'var(--cream)', borderRight: '1px solid var(--border)', padding: '40px 0' }}>
            {TEAMS_LIST.map(team => {
              const count = RESULTS.filter(r => r.team === team).length
              if (!count) return null
              return (
                <button key={team} onClick={() => setActiveTeam(team)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '14px 28px', border: 'none', background: activeTeam === team ? 'var(--white)' : 'transparent', cursor: 'pointer', borderLeft: `3px solid ${activeTeam === team ? 'var(--fire)' : 'transparent'}`, transition: 'all 0.2s' }}>
                  <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: activeTeam === team ? 700 : 400, fontSize: '16px', color: activeTeam === team ? 'var(--ink)' : 'var(--muted)', textAlign: 'left' }}>{team}</span>
                  <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px', flexShrink: 0 }}>{count}</span>
                </button>
              )
            })}
          </div>

          {/* Results */}
          <div style={{ padding: '48px 64px' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '36px', color: 'var(--ink)', marginBottom: '8px' }}>
              <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>{activeTeam}</em>
            </h2>
            <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)', marginBottom: '32px', fontFamily: 'var(--font-barlow-condensed), sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {RESULTS.filter(r => r.team === activeTeam).length} résultat{RESULTS.filter(r => r.team === activeTeam).length > 1 ? 's' : ''}
            </p>
            {RESULTS.filter(r => r.team === activeTeam).map((r, i) => (
              <ResultRow key={i} r={r} showSeason={true} />
            ))}
            {RESULTS.filter(r => r.team === activeTeam).length === 0 && (
              <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--muted)' }}>Aucun résultat enregistré pour cette équipe.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}