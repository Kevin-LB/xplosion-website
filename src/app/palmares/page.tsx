'use client'

import { useState } from 'react'
import { RESULTS } from '@/lib/data'
import { useIsMobile } from '@/hooks/useMediaQuery'

const SEASONS = ['2025/2026', '2024/2025', '2022/2023', '2021/2022', '2018/2019', '2017/2018', '2016/2017', '2015/2016']
const TEAMS_LIST = ['Intensity', 'Audacity', 'Silver Stars', 'Fire', 'Sparks', 'Blackstarz', 'Gravity', 'Power', 'Ferocity', 'Météore', 'Fusion', 'Équipe Seniors Niveau 1', 'Équipe Seniors']

type View = 'saison' | 'equipe'
type SortOrder = 'rank' | 'team'

function ResultRow({ r, showSeason = false, compact = false }: { r: typeof RESULTS[0]; showSeason?: boolean; compact?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: compact ? '32px 1fr' : '44px 1fr auto', alignItems: 'center', gap: compact ? '10px' : '16px', padding: compact ? '14px 0' : '18px 0', borderBottom: '1px solid var(--border-light)' }}>
      <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: compact ? '20px' : '26px', color: r.highlight ? 'var(--gold)' : 'var(--fire)', lineHeight: 1 }}>{r.rank ?? '—'}</span>
      <div>
        <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: compact ? '11px' : '14px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '3px' }}>{r.competition}</div>
        <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.4 }}>
          {r.team}{r.detail && ` — ${r.detail}`}
          {showSeason && <span style={{ display: 'inline-block', marginLeft: '6px', fontSize: '10px', color: 'var(--border)', fontStyle: 'italic' }}>{r.season}</span>}
        </div>
        {/* Tags inline on mobile */}
        {r.tag && compact && (
          <span style={{ display: 'inline-block', marginTop: '5px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '2px 8px', background: r.highlight ? 'var(--fire)' : 'transparent', border: `1px solid ${r.highlight ? 'var(--fire)' : 'var(--border)'}`, color: r.highlight ? 'white' : 'var(--muted)' }}>
            {r.tag}
          </span>
        )}
      </div>
      {/* Tag on desktop */}
      {r.tag && !compact && (
        <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 12px', border: `1px solid ${r.highlight ? 'var(--fire)' : 'var(--border)'}`, color: r.highlight ? 'var(--fire)' : 'var(--muted)', whiteSpace: 'nowrap' }}>
          {r.tag}
        </span>
      )}
    </div>
  )
}

/* Mobile: accordion team selector */
function TeamAccordion() {
  const [openTeam, setOpenTeam] = useState<string | null>('Intensity')

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {TEAMS_LIST.map(team => {
        const rows = RESULTS.filter(r => r.team === team)
        if (!rows.length) return null
        const isOpen = openTeam === team

        return (
          <div key={team} style={{ borderBottom: '1px solid var(--border-light)' }}>
            {/* Team header — tap to expand */}
            <button
              onClick={() => setOpenTeam(isOpen ? null : team)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 20px', background: isOpen ? 'var(--cream)' : 'var(--white)',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                borderLeft: `3px solid ${isOpen ? 'var(--fire)' : 'transparent'}`,
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: isOpen ? 700 : 400, fontSize: '18px', color: isOpen ? 'var(--fire)' : 'var(--ink)' }}>{team}</span>
                <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '10px', letterSpacing: '1px', color: 'var(--muted)' }}>{rows.length} rés.</span>
              </div>
              <motion.span style={{ display: 'block', color: isOpen ? 'var(--fire)' : 'var(--muted)', fontSize: '16px', transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>→</motion.span>
            </button>

            {/* Results */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 20px 8px' }}>
                    {rows.map((r, i) => <ResultRow key={i} r={r} showSeason compact />)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* Desktop: sidebar + results panel */
function TeamDesktop() {
  const [activeTeam, setActiveTeam] = useState('Intensity')

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '500px' }}>
      <div style={{ background: 'var(--cream)', borderRight: '1px solid var(--border)', padding: '32px 0' }}>
        {TEAMS_LIST.map(team => {
          const count = RESULTS.filter(r => r.team === team).length
          if (!count) return null
          return (
            <button key={team} onClick={() => setActiveTeam(team)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '14px 28px', border: 'none', background: activeTeam === team ? 'var(--white)' : 'transparent', cursor: 'pointer', borderLeft: `3px solid ${activeTeam === team ? 'var(--fire)' : 'transparent'}`, transition: 'all 0.2s' }}>
              <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: activeTeam === team ? 700 : 400, fontSize: '16px', color: activeTeam === team ? 'var(--ink)' : 'var(--muted)', textAlign: 'left' }}>{team}</span>
              <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '10px', color: 'var(--muted)' }}>{count}</span>
            </button>
          )
        })}
      </div>
      <div style={{ padding: '48px 64px' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: '36px', color: 'var(--ink)', marginBottom: '6px' }}>
          <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>{activeTeam}</em>
        </h2>
        <p style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '28px' }}>
          {RESULTS.filter(r => r.team === activeTeam).length} résultat{RESULTS.filter(r => r.team === activeTeam).length > 1 ? 's' : ''}
        </p>
        {RESULTS.filter(r => r.team === activeTeam).map((r, i) => <ResultRow key={i} r={r} showSeason />)}
      </div>
    </div>
  )
}

import { motion, AnimatePresence } from 'framer-motion'

export default function PalmaresPage() {
  const [view, setView] = useState<View>('saison')
  const [sortOrder, setSortOrder] = useState<SortOrder>('rank')
  const isMobile = useIsMobile()

  const btnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px',
    letterSpacing: '2px', textTransform: 'uppercase', padding: '10px 20px',
    border: 'none', cursor: 'pointer',
    background: active ? 'var(--ink)' : 'transparent',
    color: active ? 'white' : 'var(--muted)',
    transition: 'all 0.2s',
  })

  const sortBtnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px',
    letterSpacing: '2px', textTransform: 'uppercase', padding: '7px 14px',
    border: '1px solid var(--border)', cursor: 'pointer',
    background: active ? 'var(--cream-2)' : 'transparent',
    color: active ? 'var(--ink)' : 'var(--muted)',
    transition: 'all 0.2s',
  })

  const sortResults = (rows: typeof RESULTS) => {
    if (sortOrder === 'team') return [...rows].sort((a, b) => a.team.localeCompare(b.team, 'fr'))
    return [...rows].sort((a, b) => { if (a.rank === null) return 1; if (b.rank === null) return -1; return a.rank - b.rank })
  }

  return (
    <div style={{ paddingTop: '60px' }}>
      {/* Header */}
      <div style={{ background: 'var(--cream)', padding: 'var(--py) var(--px) 40px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '16px' }}>Depuis 2015</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
          <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px' }}>
            Palmarès <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>complet</em>
          </h1>
          <div style={{ display: 'flex', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <button style={btnStyle(view === 'saison')} onClick={() => setView('saison')}>Par saison</button>
            <button style={{ ...btnStyle(view === 'equipe'), borderLeft: '1px solid var(--border)' }} onClick={() => setView('equipe')}>Par équipe</button>
          </div>
        </div>
      </div>

      {/* BY SEASON */}
      {view === 'saison' && (
        <div style={{ padding: 'var(--py) var(--px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginRight: '4px' }}>Trier par</span>
            <button style={sortBtnStyle(sortOrder === 'rank')} onClick={() => setSortOrder('rank')}>Classement</button>
            <button style={sortBtnStyle(sortOrder === 'team')} onClick={() => setSortOrder('team')}>Équipe</button>
          </div>

          {SEASONS.map(season => {
            const raw = RESULTS.filter(r => r.season === season)
            if (!raw.length) return null
            const rows = sortResults(raw)
            return (
              <div key={season} style={{ marginBottom: '56px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--border)' }}>
                  <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(22px, 4vw, 28px)', color: 'var(--ink)' }}>{season}</h2>
                  <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>{rows.length} rés.</span>
                </div>
                {rows.map((r, i) => <ResultRow key={i} r={r} compact={isMobile} />)}
              </div>
            )
          })}

          <div style={{ padding: '20px 24px', background: 'var(--cream)', border: '1px solid var(--border-light)' }}>
            <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>2019 / 2021</span>
            <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)', marginTop: '6px' }}>Compétitions annulées — pandémie COVID-19.</p>
          </div>
        </div>
      )}

      {/* BY TEAM */}
      {view === 'equipe' && (
        isMobile ? (
          <div style={{ paddingTop: '8px' }}>
            <TeamAccordion />
          </div>
        ) : (
          <TeamDesktop />
        )
      )}
    </div>
  )
}