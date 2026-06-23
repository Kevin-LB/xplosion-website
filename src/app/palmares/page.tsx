'use client'

import { useState } from 'react'
import { RESULTS } from '@/lib/data'
import { useIsMobile } from '@/hooks/useMediaQuery'

const SEASONS = ['2025/2026', '2024/2025', '2022/2023', '2021/2022', '2018/2019', '2017/2018', '2016/2017', '2015/2016']
const TEAMS_LIST = ['Intensity', 'Audacity', 'Silver Stars', 'Fire', 'Sparks', 'Blackstarz', 'Gravity', 'Power', 'Ferocity', 'Météore', 'Fusion', 'Équipe Seniors Niveau 1', 'Équipe Seniors', 'Tenacity']

type View = 'saison' | 'equipe'
type SortOrder = 'rank' | 'team'

function ResultRow({ r, showSeason = false, compact = false }: { r: typeof RESULTS[0]; showSeason?: boolean; compact?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: compact ? '32px 1fr' : '44px 1fr auto', alignItems: 'center', gap: compact ? '10px' : '16px', padding: compact ? '14px 0' : '18px 0', borderBottom: '1px solid var(--border-light)' }}>
      <span style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: compact ? '20px' : '26px', color: r.highlight ? 'var(--gold)' : 'var(--fire)', lineHeight: 1 }}>{r.rank ?? '—'}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: compact ? '11px' : '14px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '4px' }}>{r.competition}</div>
        {r.date && (
          <div style={{ fontSize: '11px', fontWeight: 300, color: 'var(--fire)', fontFamily: 'var(--font-barlow-condensed), sans-serif', letterSpacing: '0.5px', marginBottom: '3px' }}>
            📅 {r.date}
          </div>
        )}
        <div style={{ fontSize: compact ? '11px' : '12px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.4 }}>
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

export default function PalmaresPage() {
  const [view, setView] = useState<View>('saison')
  const [selectedSeason, setSelectedSeason] = useState<string>('2025/2026')
  const [selectedTeam, setSelectedTeam] = useState<string>('Intensity')
  const [sortOrder, setSortOrder] = useState<SortOrder>('rank')
  const isMobile = useIsMobile()
  const compact = isMobile

  const seasonResults = RESULTS.filter((r) => r.season === selectedSeason)
  const teamResults = RESULTS.filter((r) => r.team === selectedTeam)

  const sortedResults = (() => {
    const data = view === 'saison' ? seasonResults : teamResults
    if (sortOrder === 'rank') return data.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
    return data.sort((a, b) => a.team.localeCompare(b.team))
  })()

  return (
    <div style={{ paddingTop: '64px' }}>

      {/* ── Header ── */}
      <div style={{ background: 'var(--cream)', padding: 'clamp(48px,8vw,80px) var(--px) clamp(32px,5vw,64px)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Nos résultats</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px', marginBottom: '12px' }}>
          <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>Palmarès</em>
        </h1>
        <p style={{ fontSize: 'clamp(13px,2vw,15px)', fontWeight: 300, color: 'var(--muted)', maxWidth: '520px', lineHeight: 1.7 }}>
          Retrouvez tous les résultats de nos équipes aux compétitions nationales et internationales.
        </p>
      </div>

      <div style={{ padding: 'clamp(40px,8vw,80px) var(--px)' }}>

        {/* ── View toggles ── */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {(['saison', 'equipe'] as const).map((v) => (
            <button key={v}
              onClick={() => setView(v)}
              style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', padding: '10px 20px', background: view === v ? 'var(--fire)' : 'var(--cream)', color: view === v ? 'white' : 'var(--ink)', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
              Par {v === 'saison' ? 'saison' : 'équipe'}
            </button>
          ))}
        </div>

        {/* ── Dropdown selectors ── */}
        {view === 'saison' ? (
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
              Saison
            </label>
            <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}
              style={{ fontFamily: 'inherit', fontWeight: 500, fontSize: '14px', padding: '10px 16px', background: 'var(--cream)', border: '1px solid var(--border-light)', color: 'var(--ink)', cursor: 'pointer', width: '100%', maxWidth: '220px' }}>
              {SEASONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        ) : (
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
              Équipe
            </label>
            <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}
              style={{ fontFamily: 'inherit', fontWeight: 500, fontSize: '14px', padding: '10px 16px', background: 'var(--cream)', border: '1px solid var(--border-light)', color: 'var(--ink)', cursor: 'pointer', width: '100%', maxWidth: '220px' }}>
              {TEAMS_LIST.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        )}

        {/* ── Sort order (saison view only) ── */}
        {view === 'saison' && !compact && (
          <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
            {(['rank', 'team'] as const).map((order) => (
              <button key={order}
                onClick={() => setSortOrder(order)}
                style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '6px 12px', background: sortOrder === order ? 'var(--ink)' : 'transparent', color: sortOrder === order ? 'white' : 'var(--muted)', border: `1px solid ${sortOrder === order ? 'var(--ink)' : 'var(--border)'}`, cursor: 'pointer', transition: 'all 0.2s' }}>
                {order === 'rank' ? 'Classement' : 'Équipe'}
              </button>
            ))}
          </div>
        )}

        {/* ── Results list ── */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          {sortedResults.length > 0 ? (
            sortedResults.map((r, i) => (
              <ResultRow key={i} r={r} showSeason={view === 'equipe'} compact={compact} />
            ))
          ) : (
            <p style={{ padding: '20px 0', color: 'var(--muted)', fontSize: '14px' }}>
              Aucun résultat pour cette sélection.
            </p>
          )}
        </div>

      </div>
    </div>
  )
}