import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { ROLES, ROLE_ICO, Icon, rgba } from '../../data'

export default function RoleSheet() {
  const { state, actions } = useApp()
  const role = useMemo(
    () => state.selectedRoleId ? ROLES[state.selectedRoleId] : null,
    [state.selectedRoleId]
  )
  const isOpen = !!role

  return (
    <>
      <div className={`bs-ov${isOpen ? ' open' : ''}`} onClick={actions.closeRole} aria-hidden="true" />
      <div
        className={`bs${isOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={role ? `Role: ${role.nm}` : 'Role details'}
        aria-hidden={!isOpen}
      >
        {role && (
          <>
            <div className="bs-handle" aria-hidden="true" />
            <button className="bs-close" onClick={actions.closeRole} aria-label="Close">✕</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <div className="aic-ico" style={{ width: 48, height: 48, minWidth: 48, background: rgba(role.c, 0.12), borderColor: rgba(role.c, 0.28), color: role.c }}>
                <Icon name={ROLE_ICO[state.selectedRoleId] || 'user'} size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)' }}>{role.nm}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.1em', color: role.c }}>{role.dm}</div>
              </div>
            </div>

            <span className="bs-lbl">Overview</span>
            <div className="bs-body">{role.desc}</div>

            {role.resps?.length > 0 && (
              <>
                <span className="bs-lbl" style={{ marginTop: '1.25rem', display: 'block' }}>Responsibilities</span>
                <ul style={{ paddingLeft: '1rem', margin: 0 }}>
                  {role.resps.map(r => (
                    <li key={r} style={{ fontSize: 'var(--fs-small)', color: 'var(--text-m)', fontWeight: 300, lineHeight: 1.65, marginBottom: '.375rem' }}>{r}</li>
                  ))}
                </ul>
              </>
            )}

            {role.ents?.length > 0 && (
              <>
                <span className="bs-lbl" style={{ marginTop: '1.25rem', display: 'block' }}>Owned CSDM Entities</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: '.5rem' }}>
                  {role.ents.map(e => (
                    <span key={e} className="rc-ent">{e}</span>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
