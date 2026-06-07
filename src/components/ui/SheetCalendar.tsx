'use client'

import { useEffect, useState } from 'react'

// ID du Google Sheet (partagé en lecture publique)
const SHEET_ID = '15Of70YnHna3fBSbteOnUAvu_sKBvXPur707aPghr7v0'
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`

// Couleurs par catégorie (correspondant aux couleurs du sheet)
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Weekend d\'intégration': { bg: 'rgba(253, 211, 181, 0.3)', text: '#8B4513', border: '#FDD3B5' },
  'Choreo':                { bg: 'rgba(173, 216, 255, 0.3)', text: '#1a5a8a', border: '#ADD8FF' },
  'Entrainements':         { bg: 'rgba(173, 216, 255, 0.2)', text: '#1a5a8a', border: '#ADD8FF' },
  'Camp perfectionnement': { bg: 'rgba(173, 216, 255, 0.25)', text: '#1a5a8a', border: '#ADD8FF' },
  'Vacances':              { bg: 'rgba(220, 220, 220, 0.2)', text: 'var(--muted)', border: '#DDD9D2' },
  'Compétitions':          { bg: 'rgba(200, 64, 26, 0.08)', text: 'var(--fire)', border: 'rgba(200,64,26,0.25)' },
  'Summit européen':       { bg: 'rgba(200, 64, 26, 0.15)', text: 'var(--fire)', border: 'rgba(200,64,26,0.4)' },
}

type SheetRow = { category: string; months: Record<string, string> }

function parseCSV(text: string): { headers: string[]; rows: SheetRow[] } {
  const lines = text.trim().split('\n').map(l => l.split(',').map(c => c.replace(/^"|"$/g, '').trim()))
  if (lines.length < 2) return { headers: [], rows: [] }

  const headers = lines[0].slice(1) // skip "Catégorie" column
  const rows: SheetRow[] = []

  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i]
    const category = cells[0]
    if (!category) continue
    const months: Record<string, string> = {}
    headers.forEach((h, idx) => {
      months[h] = cells[idx + 1] || ''
    })
    rows.push({ category, months })
  }

  return { headers, rows }
}

function DayBadge({ value }: { value: string }) {
  if (!value) return null
  // Parse comma-separated day numbers like "4, 12, 21"
  const days = value.split(/[,;\s]+/).map(d => d.trim()).filter(Boolean)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '4px 0' }}>
      {days.map((day, i) => (
        <span key={i} style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '26px', height: '26px', borderRadius: '50%',
          background: 'var(--fire)', color: 'white',
          fontFamily: 'var(--font-barlow-condensed), sans-serif',
          fontWeight: 600, fontSize: '11px',
        }}>
          {day}
        </span>
      ))}
    </div>
  )
}

export function SheetCalendar() {
  const [data, setData] = useState<{ headers: string[]; rows: SheetRow[] } | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(CSV_URL)
      .then(r => {
        if (!r.ok) throw new Error('Sheet non accessible')
        return r.text()
      })
      .then(text => {
        setData(parseCSV(text))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '48px', textAlign: 'center', background: 'var(--cream)', border: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)', animation: 'pulse 1.5s ease-in-out infinite' }}>
          Chargement du planning…
        </div>
      </div>
    )
  }

  if (error || !data || data.rows.length === 0) {
    return (
      <div style={{ padding: '32px', background: 'var(--cream)', border: '1px solid var(--border)', borderLeft: '3px solid var(--fire)' }}>
        <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '8px' }}>
          Planning en cours de mise à jour
        </div>
        <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.6 }}>
          Le calendrier détaillé de la saison 2026/2027 sera mis en ligne par les coachs à la rentrée de septembre.{' '}
          <a href={`https://docs.google.com/spreadsheets/d/${SHEET_ID}/view`} target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--fire)', textDecoration: 'none', fontWeight: 500 }}>
            Voir le Google Sheet →
          </a>
        </p>
      </div>
    )
  }

  const { headers, rows } = data
  // Show only months that have at least one non-empty value
  const activeHeaders = headers.filter(h => rows.some(r => r.months[h]))

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ fontSize: '11px', fontWeight: 300, color: 'var(--muted)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Les dates indiquées sont les jours du mois (ex : 4, 12 = le 4 et le 12 du mois).</span>
        <a href={`https://docs.google.com/spreadsheets/d/${SHEET_ID}/view`} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--fire)', textDecoration: 'none' }}>
          Voir le Sheet complet →
        </a>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border)' }}>
        <thead>
          <tr>
            <th style={{ background: 'var(--ink)', color: 'white', padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', whiteSpace: 'nowrap', minWidth: '180px' }}>
              Catégorie
            </th>
            {activeHeaders.map(h => (
              <th key={h} style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.75)', padding: '14px 12px', textAlign: 'center', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', whiteSpace: 'nowrap', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const colors = CATEGORY_COLORS[row.category] || { bg: 'var(--white)', text: 'var(--ink)', border: 'var(--border-light)' }
            return (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                {/* Category label */}
                <td style={{ padding: '12px 20px', background: colors.bg, borderRight: '1px solid var(--border)', verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.text, flexShrink: 0, opacity: 0.7 }} />
                    <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: colors.text }}>
                      {row.category}
                    </span>
                  </div>
                </td>
                {/* Month cells */}
                {activeHeaders.map((h, j) => {
                  const val = row.months[h]
                  const hasContent = !!val
                  return (
                    <td key={h} style={{
                      padding: '10px 12px',
                      background: hasContent ? colors.bg : 'var(--white)',
                      borderLeft: '1px solid var(--border-light)',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      minWidth: '80px',
                    }}>
                      {hasContent ? (
                        // If it looks like day numbers, show badges; otherwise show text
                        /^\d[\d,;\s]*$/.test(val) ? (
                          <DayBadge value={val} />
                        ) : (
                          <span style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: '11px', fontWeight: 500, color: colors.text, letterSpacing: '0.5px' }}>
                            {val}
                          </span>
                        )
                      ) : (
                        <span style={{ display: 'block', width: '16px', height: '1px', background: 'var(--border)', margin: '0 auto' }} />
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}