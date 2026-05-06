import { useState, useMemo } from 'react'
import { REL_ENTS, REL_PILL_STYLES, Icon } from '../../../data'
import { useApp } from '../../../context/AppContext'

const DIR_OPTS = [
  { v:'all', l:'All relationships' },
  { v:'in',  l:'Incoming' },
  { v:'out', l:'Outgoing' },
]

export default function RelationshipsTab() {
  const { state, actions } = useApp()
  const entityId = state.relEntityId || REL_ENTS[0]?.id
  const dir      = state.relDirection || 'all'

  const entity = useMemo(() => REL_ENTS.find(e => e.id === entityId), [entityId])

  const rels = useMemo(() => {
    if (!entity) return []
    return entity.rels.filter(r =>
      dir === 'all' || (dir === 'in' && r.dir === 'in') || (dir === 'out' && r.dir === 'out')
    )
  }, [entity, dir])

  const navigateTo = (toName) => {
    const target = REL_ENTS.find(e =>
      e.nm.toLowerCase().includes(toName.toLowerCase()) ||
      toName.toLowerCase().includes(e.nm.toLowerCase())
    )
    if (target) actions.setRelEntity(target.id)
  }

  return (
    <div className="tpanel on" id="ep-rel" role="tabpanel">
      <div className="fam-hdr fade-in">
        <h2><Icon name="flow" size={16} /> Entity Relationship Browser</h2>
        <span className="fam-ct">{REL_ENTS.length} entities</span>
      </div>
      <p className="sec-lede">
        Select any CSDM entity to see its complete set of defined relationships.
        Click a related entity in the table to navigate to its relationship view.
      </p>

      {/* Entity selector */}
      <div className="rel-ents" role="group" aria-label="Select entity">
        {REL_ENTS.map(e => (
          <button key={e.id}
            className={`rel-ebt${entityId === e.id ? ' on' : ''}`}
            onClick={() => actions.setRelEntity(e.id)}
            aria-pressed={entityId === e.id}
          >
            {e.nm}
          </button>
        ))}
      </div>

      {/* Selected entity header */}
      {entity && (
        <div className="rel-hdr" id="rel-hdr-content">
          <Icon name="cube" size={15} />
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 700, fontSize: 'var(--fs-body)', color: 'var(--text)' }}>{entity.nm}</span>
            <span className="badge dom" style={{ marginLeft: 8, background: 'rgba(255,255,255,.07)', border: '1px solid var(--bord)', color: 'var(--text-m)' }}>{entity.dom}</span>
          </div>
          <code style={{ fontFamily: 'var(--mono)', fontSize: '.58rem', color: 'var(--text-f)' }}>{entity.tbl}</code>
        </div>
      )}

      {/* Direction filter */}
      <div className="rel-dfilter" role="group" aria-label="Filter by direction">
        {DIR_OPTS.map(o => (
          <button key={o.v}
            className={`ex-chip rel-dir-btn${dir === o.v ? ' on' : ''}`}
            onClick={() => actions.setRelDirection(o.v)}
            aria-pressed={dir === o.v}
          >
            {o.l}
          </button>
        ))}
      </div>

      {/* Relationship table */}
      <div className="rel-twrap">
        <table className="rel-t" aria-label="Entity relationships">
          <colgroup>
            <col style={{ width: '24%' }} /><col style={{ width: '20%' }} />
            <col style={{ width: '24%' }} /><col />
          </colgroup>
          <thead>
            <tr>
              {['From','Relationship','To','Note'].map(h => (
                <th key={h} className="rel-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody id="rel-tbody">
            {rels.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '14px 12px', textAlign: 'center', fontSize: 'var(--fs-small)', color: 'var(--text-m)', fontStyle: 'italic' }}>
                No relationships in this direction.
              </td></tr>
            ) : rels.map((r, i) => {
              const pc = REL_PILL_STYLES[r.rel] || 'background:rgba(255,255,255,.06);color:var(--text-m);border-color:var(--bord)'
              const isOut = r.dir === 'out'
              const toClickable = !r.to.includes('(')
              return (
                <tr key={i} className="rel-tr">
                  <td className="rel-td" style={{ fontWeight: isOut ? 600 : 400, color: isOut ? 'var(--text)' : 'var(--text-m)' }}>
                    {isOut
                      ? <span style={{ color: 'var(--blue)', marginRight: 4 }}>→</span>
                      : <span style={{ color: 'var(--text-f)', marginRight: 4 }}>←</span>
                    }
                    {r.fr}
                  </td>
                  <td className="rel-td">
                    <span className="rel-pill" style={Object.fromEntries(pc.split(';').filter(Boolean).map(p => p.trim().split(':').map(s => s.trim())))}>
                      {r.rel}
                    </span>
                  </td>
                  <td className="rel-td" style={{ fontWeight: !isOut ? 600 : 400, color: !isOut ? 'var(--text)' : 'var(--text-m)' }}>
                    {toClickable
                      ? <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit', textDecoration: 'underline dotted' }}
                          onClick={() => navigateTo(r.to)}>{r.to} →</button>
                      : r.to
                    }
                  </td>
                  <td className="rel-td" style={{ fontStyle: 'italic', fontSize: '.6rem' }}>{r.note}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', color: 'var(--text-f)', marginTop: '.625rem' }}>
        Source: CSDM 5 White Paper · Scott Lemm &amp; Rob Koeten · ServiceNow 2025
      </p>
    </div>
  )
}
