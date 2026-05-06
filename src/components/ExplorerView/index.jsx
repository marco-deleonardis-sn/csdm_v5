import { useMemo, useCallback } from 'react'
import { useApp } from '../../context/AppContext'
import { DOM_CFG, DOM_ORDER, Icon } from '../../data'
import OverviewTab    from './tabs/OverviewTab'
import AIReadyTab     from './tabs/AIReadyTab'
import RolesTab       from './tabs/RolesTab'
import JourneyTab     from './tabs/JourneyTab'
import ExamplesTab    from './tabs/ExamplesTab'
import RelationshipsTab from './tabs/RelationshipsTab'
import DomainTab      from './tabs/DomainTab'

// ── TAB DEFINITIONS ─────────────────────────────────────────────────────────
const STATIC_TABS = [
  { id: 'ep-overview', label: 'Overview',       icon: 'doc' },
  { id: 'ep-ai',       label: 'AI Ready',       icon: 'sparkle', accent: true },
  { id: 'ep-roles',    label: 'Roles',          icon: 'user' },
  { id: 'ep-lc',       label: 'Lifecycle',      icon: 'flow' },
  { id: 'ep-journey',  label: 'Journey',        icon: 'chart' },
  { id: 'ep-examples', label: 'Examples',       icon: 'grid' },
  { id: 'ep-rel',      label: 'Relationships',  icon: 'flow' },
]

// ── CONTEXT STRIP ─────────────────────────────────────────────────────────────
function ContextStrip() {
  return (
    <div id="exp-ctx" className="exp-ctx" aria-label="Page context">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 'clamp(1.1rem,3vw,1.5rem)', fontWeight: 900, letterSpacing: '-.03em', color: 'var(--text)' }}>
          CSDM <em style={{ fontStyle: 'normal', color: 'var(--wg)' }}>5</em>
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)', color: 'var(--text-m)', whiteSpace: 'nowrap' }}>
          Common Service Data Model
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-label)', color: 'var(--text-f)', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
          7 Domains · 35+ Entities · 8 New in v5
        </span>
      </div>
    </div>
  )
}

// ── TAB BUTTON ────────────────────────────────────────────────────────────────
function TabBtn({ id, label, icon, domColor, isNew, accent, isActive, onClick }) {
  return (
    <button
      className={`tb${isActive ? ' on' : ''}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={id}
      onClick={onClick}
    >
      {domColor && (
        <span className="tdot" style={{ background: domColor }} aria-hidden="true" />
      )}
      {!domColor && icon && (
        <Icon name={icon} size={12} style={{ opacity: accent ? 1 : 0.7 }} />
      )}
      {accent
        ? <span style={{ color: 'var(--wg)', fontWeight: 700, marginRight: 4 }}>★</span>
        : null}
      {label}
      {isNew && <span style={{ color: 'var(--wg)' }}> ★</span>}
    </button>
  )
}

// ── EXPLORER VIEW ROOT ────────────────────────────────────────────────────────
export default function ExplorerView() {
  const { state, actions } = useApp()

  const domainTabs = useMemo(() => DOM_ORDER.map(k => ({
    id: `ep-${k}`,
    key: k,
    label: DOM_CFG[k].l,
    domColor: DOM_CFG[k].c,
    isNew: DOM_CFG[k].isNew,
  })), [])

  const allTabs = useMemo(() => [...STATIC_TABS, ...domainTabs], [domainTabs])

  const handleTabClick = useCallback((id) => {
    actions.setActiveTab(id)
  }, [actions])

  const activeTab = state.activeTab || 'ep-overview'

  return (
    <>
      <ContextStrip />

      <div id="v-explorer" role="region" aria-label="CSDM 5 Explorer">
        <nav className="tnav" aria-label="Explorer tabs">
          <div className="tnav-inner" id="exp-tabs" role="tablist">
            {allTabs.map(tab => (
              <TabBtn
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                domColor={tab.domColor}
                isNew={tab.isNew}
                accent={tab.accent}
                isActive={activeTab === tab.id}
                onClick={() => handleTabClick(tab.id)}
              />
            ))}
          </div>
        </nav>

        <div className="exp-wrap">
          {/* Search bar */}
          <div className="srch-bar" role="search">
            <div className="srch-row">
              <span className="srch-ico" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                className="srch"
                type="search"
                id="srch"
                placeholder="Search all entities, tables, descriptions…"
                value={state.searchQuery}
                onChange={e => actions.setSearch(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                aria-label="Search entities"
              />
            </div>
          </div>

          {/* Tab panels */}
          <div id="exp-panels">
            {activeTab === 'ep-overview'  && <OverviewTab />}
            {activeTab === 'ep-ai'        && <AIReadyTab />}
            {activeTab === 'ep-roles'     && <RolesTab />}
            {activeTab === 'ep-lc'        && <LifecycleTab />}
            {activeTab === 'ep-journey'   && <JourneyTab />}
            {activeTab === 'ep-examples'  && <ExamplesTab />}
            {activeTab === 'ep-rel'       && <RelationshipsTab />}
            {domainTabs.map(t => activeTab === t.id && (
              <DomainTab key={t.key} domKey={t.key} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// Lifecycle tab re-exported inline to avoid a separate file for now
function LifecycleTab() {
  const STAGES = [
    { nm:'Foundation', ico:'database', c:'#888888', sub:'Referential Data',
      d:'Establish the data all other CSDM domains depend on: organizational structure, locations, groups, users, CMDB Groups, Product Models, and Contracts.',
      tbls:'Company, Business Unit, Department, Location, Group, User, CMDB Group, Product Model, Contract',
      v:'Foundation for all ServiceNow products. Many features fail without accurate referential data.' },
    { nm:'Crawl', ico:'cube', c:'#2478AA', sub:'Applications',
      d:'Quick wins in service management. Focus on Business Applications (portfolio), SDLC Components (optional), Application Services, and discoverable infrastructure.',
      tbls:'cmdb_ci_business_app, cmdb_ci_sdlc_component, cmdb_ci_service_discovered, cmdb_ci_appl, cmdb_ci_server',
      v:'Minimum CMDB for ITSM: Incident, Problem, Change. Foundation for EA, DevOps, Service Mapping.' },
    { nm:'Walk', ico:'cog', c:'#C96C10', sub:'Tech Services',
      d:'Formalize management of technology services. Focus on Technology Management Services, Offerings, and Dynamic CI Groups.',
      tbls:'cmdb_ci_service_technical, service_offering (Technical Service), cmdb_ci_query_based_service',
      v:'CI metadata sync via TMO. Foundation for technical SPM. TMOs orderable via Request Catalog.' },
    { nm:'Run', ico:'layers', c:'#C93838', sub:'Business Services',
      d:'Business service impact. Focus on Business Services, Business Service Offerings, and Service Portfolio.',
      tbls:'cmdb_ci_service_business, service_offering (Business Service), service_portfolio',
      v:'ITSM Incident, Problem, Change impact assessment. Service Portfolio Management workspace.' },
    { nm:'Fly', ico:'sparkle', c:'#B88800', sub:'Full CSDM 5',
      d:'Complete CSDM 5. Business Capabilities, Information Objects, Catalog, and all AI-related entities.',
      tbls:'cmdb_ci_business_capability, cmdb_ci_information_object, sc_catalog, alm_ai_digital_asset, cmdb_ci_function_ai',
      v:'Enterprise Architecture rationalization. Full AI governance. PII/PCI/HIPAA compliance.' },
  ]
  const MIG = [
    { n:'01', t:'Back Up Your Data',         d:'Export all table data with attributes to Excel before any migration.' },
    { n:'02', t:'Attribute Mapping',          d:'Identify what tables your data migrates to. Categorize custom attributes: Best Practice, Keep, Refactor, Do Not Need.' },
    { n:'03', t:'Table Dependency Script',    d:'Run the ServiceNow Community fix script to identify all reports, business rules, scripts, and references that depend on your non-conforming table. Most important step.' },
    { n:'04', t:'Refactor Attributes',        d:'Create necessary attributes on the new CSDM tables. Perform documented refactor efforts for attributes with OOB equivalents.' },
    { n:'05', t:'Data Migration',             d:'Modify the class to the new table in small batches. Reload data into new attributes. Remediate reports, rules, and scripts. Validate all dependencies.' },
  ]
  return (
    <div className="tpanel on" id="ep-lc" role="tabpanel">
      <div className="fam-hdr fade-in">
        <h2><Icon name="flow" size={16} /> Lifecycle &amp; Adoption</h2>
        <span className="fam-ct">Foundation → Fly</span>
      </div>
      <p className="sec-lede">ServiceNow recommends a staged approach — do not try to implement all elements at once. Each stage builds value and unlocks additional product capabilities.</p>
      <div className="adopt-stages">
        {STAGES.map(s => (
          <div key={s.nm} className="as-c fade-in">
            <div className="as-bar" style={{ background: s.c }} />
            <div className="as-ico"><Icon name={s.ico} size={20} /></div>
            <div className="as-nm">{s.nm}</div>
            <div className="as-sub">{s.sub}</div>
            <p className="as-d">{s.d}</p>
            <div className="as-tbls">
              <div className="as-tbl-lbl">Key Tables</div>
              <div className="as-tbl-v">{s.tbls}</div>
            </div>
            <div style={{ marginTop: 7, paddingTop: 7, borderTop: '1px solid var(--bord)' }}>
              <div className="as-tbl-lbl">Value Unlocked</div>
              <div className="as-val">{s.v}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mig-box fade-in">
        <h3 style={{ fontSize: 'var(--fs-h3)', fontWeight: 700, color: 'var(--text)', marginBottom: '.625rem' }}>
          Migrating into CSDM — 5-Step Process
        </h3>
        <p className="sec-lede">Migrating from non-conforming tables is a careful process. ServiceNow Customer Outcomes and partners are available to assist.</p>
        <div className="pr-grid">
          {MIG.map(m => (
            <div key={m.n} className="pr-c fade-in">
              <div className="pr-n">{m.n}</div>
              <div><div className="pr-t">{m.t}</div><div className="pr-d">{m.d}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
