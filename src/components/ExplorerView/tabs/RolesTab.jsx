import { useApp } from '../../../context/AppContext'
import { ROLES, ROLE_ICO, Icon, rgba } from '../../../data'

export default function RolesTab() {
  const { actions } = useApp()
  return (
    <div className="tpanel on" id="ep-roles" role="tabpanel">
      <div className="fam-hdr fade-in">
        <h2><Icon name="users" size={16} /> Roles &amp; Personas</h2>
        <span className="fam-ct">{Object.keys(ROLES).length} roles defined</span>
      </div>
      <p className="sec-lede">
        Every CSDM domain has defined personas who create, consume, and govern its data.
        Understanding who owns each entity clarifies accountability and accelerates adoption.
        Click any card to see full responsibilities and owned CSDM entities.
      </p>
      <div className="role-grid">
        {Object.entries(ROLES).map(([rid, r]) => (
          <div key={rid} className="rc fade-in"
            role="button" tabIndex={0}
            aria-label={`${r.nm} — ${r.dm}. Click for details.`}
            onClick={() => actions.openRole(rid)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') actions.openRole(rid) }}
          >
            <div className="rc-hd">
              <div className="rc-ico" style={{ background: rgba(r.c, 0.12), borderColor: rgba(r.c, 0.28), color: r.c }}>
                <Icon name={ROLE_ICO[rid] || 'user'} size={22} />
              </div>
              <div>
                <div className="rc-nm">{r.nm}</div>
                <div className="rc-dm" style={{ color: r.c }}>{r.dm}</div>
              </div>
            </div>
            <div className="rc-desc">{r.desc.length > 195 ? r.desc.slice(0, 195) + '…' : r.desc}</div>
            <div className="rc-ents">
              {r.ents.map(en => <span key={en} className="rc-ent">{en}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
