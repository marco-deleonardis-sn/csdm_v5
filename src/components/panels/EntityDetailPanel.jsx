import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { ENT, DOM_CFG, ENT_ICO, Icon, rgba } from '../../data'

export default function EntityDetailPanel() {
  const { state, actions } = useApp()
  const entity = useMemo(
    () => ENT.find(e => e.id === state.selectedEntityId),
    [state.selectedEntityId]
  )
  const isOpen = !!entity

  if (!entity && !isOpen) return null

  const d = entity ? DOM_CFG[entity.dm] : null

  return (
    <>
      {/* Overlay */}
      <div
        className={`dp-ov${isOpen ? ' on' : ''}`}
        onClick={actions.closeEntity}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`dp-panel${isOpen ? ' on' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={entity ? `Details for ${entity.lbl}` : 'Entity details'}
        aria-hidden={!isOpen}
      >
        <div className="dp-handle" aria-hidden="true" />

        {entity && (
          <>
            <div className="dp-hd">
              <div className="dp-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="aic-ico" style={{ background: rgba(d.c, 0.1), borderColor: rgba(d.c, 0.22), color: d.c }}>
                    <Icon name={ENT_ICO[entity.id] || 'doc'} size={20} />
                  </div>
                  <div>
                    <div className="dp-nm">{entity.lbl}</div>
                    <div className="dp-dm" style={{ color: d.c }}>{d.l}</div>
                  </div>
                </div>
                <button className="dp-close" onClick={actions.closeEntity} aria-label="Close panel">✕</button>
              </div>

              <div className="dp-bdg" id="dp-bdg">
                {entity.isNew && (
                  <span className="badge new5"><Icon name="sparkle" size={8} /> New in CSDM 5</span>
                )}
                {entity.isRenamed && (
                  <span className="badge ren">Renamed in CSDM 5</span>
                )}
              </div>
            </div>

            <div className="dp-body" id="dp-body">
              <p className="dp-desc" id="dp-dsc">{entity.desc}</p>

              {entity.table && (
                <div className="dp-box">
                  <div className="dp-bl">ServiceNow Table</div>
                  <div className="dp-bv">{entity.table}</div>
                </div>
              )}

              {entity.subTypes?.length > 0 && (
                <div className="dp-box">
                  <div className="dp-bl">Sub-types</div>
                  <ul className="dp-ul">
                    {entity.subTypes.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              )}

              {entity.refs?.length > 0 && (
                <div className="dp-box" id="dp-ext">
                  <div className="dp-bl">Key Relationships &amp; Notes</div>
                  <ul className="dp-ul">
                    {entity.refs.map(r => <li key={r}>{r}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  )
}
