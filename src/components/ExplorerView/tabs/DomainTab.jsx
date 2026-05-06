import { useMemo } from 'react'
import { useApp } from '../../../context/AppContext'
import { DOM_CFG, DOM_DESC, AI_NOTES, ENT, ROLES, ROLE_ICO, DOM_ICO, ENT_ICO, Icon, rgba } from '../../../data'

function EntityCapCard({ entity, domKey }) {
  const { state, actions } = useApp()
  const d = DOM_CFG[domKey]
  const q = state.searchQuery.toLowerCase()
  const searchStr = `${entity.lbl} ${entity.desc} ${entity.table || ''}`.toLowerCase()
  if (q && !searchStr.includes(q)) return null

  return (
    <div className="cap-card fade-in"
      role="button" tabIndex={0}
      aria-label={`${entity.lbl}${entity.isNew ? ' — New in CSDM 5' : ''}${entity.isRenamed ? ' — Renamed' : ''}. Click for details.`}
      onClick={() => actions.openEntity(entity.id)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') actions.openEntity(entity.id) }}
      data-srch={searchStr}
    >
      <div className="cap-hdr">
        <div>
          <div className="cap-fam">{d.l}</div>
          <div className="cap-nm">{entity.lbl}</div>
        </div>
        <div className="ico-box">
          <Icon name={ENT_ICO[entity.id] || 'doc'} size={20} />
        </div>
      </div>
      <p className="cap-desc">
        {entity.desc.length > 220 ? entity.desc.slice(0, 220) + '…' : entity.desc}
      </p>
      <div className="cap-foot">
        {entity.isNew     && <span className="badge new5"><Icon name="sparkle" size={8} /> New</span>}
        {entity.isRenamed && <span className="badge ren">Renamed</span>}
        {entity.table     && <span style={{ fontFamily: 'var(--mono)', fontSize: '.58rem', color: 'var(--text-f)' }}>{entity.table}</span>}
      </div>
    </div>
  )
}

export default function DomainTab({ domKey }) {
  const { actions } = useApp()
  const d = DOM_CFG[domKey]
  const desc = DOM_DESC[domKey] || ''
  const aiNote = AI_NOTES[domKey]
  const isNew = d.isNew ? ' ★' : ''

  const domRoles = useMemo(() => Object.entries(ROLES).filter(([, r]) => r.dm === d.l), [d.l])
  const domEnts  = useMemo(() => ENT.filter(e => e.dm === domKey), [domKey])

  return (
    <div className="tpanel on" id={`ep-${domKey}`} role="tabpanel">
      <div className="fam-hdr fade-in">
        <h2>
          <Icon name={DOM_ICO[domKey] || 'layers'} size={15} />
          {' '}{d.l}{isNew}
        </h2>
        <span className="fam-ct">{domEnts.length} entities</span>
      </div>

      {/* Role pills */}
      {domRoles.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '1rem' }} role="group" aria-label="Personas">
          {domRoles.map(([rid, r]) => (
            <button key={rid}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', minHeight: 32, borderRadius: '999px', border: `1px solid ${rgba(r.c, 0.3)}`, background: rgba(r.c, 0.1), color: r.c, fontFamily: 'var(--mono)', fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.06em', cursor: 'pointer', whiteSpace: 'nowrap' }}
              onClick={() => actions.openRole(rid)}
              aria-label={`${r.nm} — click for details`}
            >
              <Icon name={ROLE_ICO[rid] || 'user'} size={12} />
              {r.nm}
            </button>
          ))}
        </div>
      )}

      {/* AI callout banner */}
      {aiNote && (
        <div className={`ai-callout ${aiNote.type} fade-in`}>
          <Icon name="sparkle" size={13} />
          <div>
            <strong style={{ color: 'var(--text)' }}>{aiNote.title}</strong>{' '}
            {aiNote.body}
            {aiNote.action && (
              <button onClick={() => actions.setActiveTab(aiNote.action.tab)}
                style={{ color: 'var(--wg)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '.6rem', textDecoration: 'underline', padding: '0 4px' }}>
                {aiNote.action.label}
              </button>
            )}
          </div>
        </div>
      )}

      <p className="sec-lede">{desc}</p>

      <div className="cap-grid">
        {domEnts.map(e => <EntityCapCard key={e.id} entity={e} domKey={domKey} />)}
      </div>
    </div>
  )
}
