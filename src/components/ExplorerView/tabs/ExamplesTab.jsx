import { useState, useMemo } from 'react'
import { Icon } from '../../../data'
import { EXAMPLES } from '../../../data/examples'
import { useApp } from '../../../context/AppContext'

const DEPL_OPTS = [
  { v:'all', l:'All' }, { v:'saas', l:'SaaS' }, { v:'onprem', l:'On-Premise' },
  { v:'multi', l:'Multi-location' }, { v:'host', l:'Platform Host' },
  { v:'cs', l:'Client/Server' }, { v:'msp', l:'MSP' },
]
const IND_OPTS = [
  { v:'all', l:'All' }, { v:'tech', l:'Technology' }, { v:'health', l:'Healthcare' },
  { v:'finance', l:'Financial Services' }, { v:'mfg', l:'Manufacturing' },
]

export default function ExamplesTab() {
  const { actions } = useApp()
  const [depl, setDepl] = useState('all')
  const [ind, setInd]   = useState('all')

  const filtered = useMemo(() => EXAMPLES.filter(ex => {
    const dMatch = depl === 'all' || ex.deplTag.includes(depl)
    const iMatch = ind  === 'all' || ex.indTag === ind
    return dMatch && iMatch
  }), [depl, ind])

  return (
    <div className="tpanel on" id="ep-examples" role="tabpanel">
      <div className="fam-hdr fade-in">
        <h2><Icon name="grid" size={16} /> Real-World Examples</h2>
        <span className="fam-ct">{EXAMPLES.length} scenarios</span>
      </div>
      <p className="sec-lede">
        Pre-modeled lexicons for common deployment patterns, sourced directly from the CSDM Data Models guide.
        Find a scenario that matches your organization and adapt the entity chain to your context.
      </p>

      {/* Deployment filter */}
      <div className="ex-filter" role="group" aria-label="Filter by deployment">
        <span style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-f)' }}>Deployment:</span>
        {DEPL_OPTS.map(o => (
          <button key={o.v} className={`ex-chip ex-chip-d${depl === o.v ? ' on' : ''}`}
            onClick={() => setDepl(o.v)} aria-pressed={depl === o.v}>{o.l}</button>
        ))}
      </div>

      {/* Industry filter */}
      <div className="ex-filter" role="group" aria-label="Filter by industry">
        <span style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-f)' }}>Industry:</span>
        {IND_OPTS.map(o => (
          <button key={o.v} className={`ex-chip ex-chip-i${ind === o.v ? ' on' : ''}`}
            onClick={() => setInd(o.v)} aria-pressed={ind === o.v}>{o.l}</button>
        ))}
      </div>

      <div className="ex-grid" id="ex-grid">
        {filtered.map(ex => (
          <div key={ex.id} className="ex-card fade-in"
            role="button" tabIndex={0}
            aria-label={`${ex.nm} — click to view entity chain model`}
            onClick={() => actions.openExample(ex.id)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') actions.openExample(ex.id) }}
          >
            <div className="ex-head">
              <div className="ex-ico" style={{ background: ex.icoBg, color: ex.icoColor }}>
                <Icon name={ex.ico} size={17} />
              </div>
              <div className="ex-nm">{ex.nm}</div>
            </div>
            <div className="ex-badges">
              <span className="ex-badge" style={{ background:'rgba(82,184,255,.1)',color:'var(--blue)',border:'1px solid rgba(82,184,255,.22)' }}>{ex.depl}</span>
              <span className="ex-badge" style={{ background:'rgba(255,255,255,.06)',color:'var(--text-m)',border:'1px solid var(--bord)' }}>{ex.ind}</span>
              <span className="ex-badge" style={{ background:'rgba(74,222,128,.1)',color:'var(--ok)',border:'1px solid rgba(74,222,128,.22)' }}>{ex.mat}</span>
            </div>
            <p className="ex-desc">{ex.desc}</p>
            <div className="ex-cta"><Icon name="arrow" size={12} /> View entity chain model</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ fontSize: 'var(--fs-small)', color: 'var(--text-m)', fontStyle: 'italic' }}>
            No examples match the selected filters.
          </p>
        )}
      </div>
    </div>
  )
}
