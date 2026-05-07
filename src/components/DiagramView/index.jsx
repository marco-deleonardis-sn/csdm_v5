import { useApp } from '../../context/AppContext'
import { DOM_CFG, ENT, ROLES, ROLE_ICO, DOM_ICO, rgba, Icon } from '../../data'
import EntityChip from './EntityChip'

// ── HERO SECTION ──────────────────────────────────────────────────────────────
function Hero() {
  const LC_STAGES = [
    { label: 'Ideation & Strategy', color: 'var(--ci)' },
    { label: 'Design & Planning',   color: 'var(--cd)' },
    { label: 'Build & Integration', color: 'var(--cb)' },
    { label: 'Service Delivery',    color: 'var(--cde)' },
    { label: 'Service Consumption', color: 'var(--cc)' },
    { label: 'Manage Portfolio',    color: 'var(--cp)', sep: true },
    { label: 'Foundation',          color: 'var(--cf)', sep: true },
  ]

  return (
    <section className="hero" aria-label="CSDM 5 overview">
      <div className="hero-grd" aria-hidden="true" />
      <div className="hero-inner">
        <div className="eyebrow">ServiceNow White Paper · Scott Lemm &amp; Rob Koeten · 2025</div>
        <h2 className="h1">Common Service Data <em>Model 5</em></h2>
        <p className="lead">
          The prescriptive standard for service-related data across the ServiceNow AI Platform.
          Click any entity for full white paper details. Click any role badge to see responsibilities.
        </p>

        <div className="kpi-banner fade-in" role="list" aria-label="CSDM 5 statistics">
          {[
            { val: '7',   lbl: 'Domains',    color: 'var(--text)' },
            { val: '35+', lbl: 'Entities',   color: 'var(--wg)' },
            { val: '8',   lbl: 'New in v5',  color: 'var(--blue)' },
            { val: '3',   lbl: 'Renamed',    color: 'var(--warn)' },
          ].map(({ val, lbl, color }) => (
            <div key={lbl} className="kpi-item" role="listitem">
              <div className="kpi-val" style={{ color }}>{val}</div>
              <div className="kpi-lbl">{lbl}</div>
            </div>
          ))}
        </div>

        <nav className="lc-strip" aria-label="CSDM lifecycle flow">
          {LC_STAGES.map(({ label, color, sep }, i) => (
            <span key={label} style={{ display: 'contents' }}>
              {sep && i > 0 && <span className="lc-sep" aria-hidden="true" style={{ padding: '0 6px', opacity: 0.5 }}>|</span>}
              {!sep && i > 0 && <span className="lc-sep" aria-hidden="true">→</span>}
              <div
                className="lc-pill"
                style={{
                  borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
                  background: `color-mix(in srgb, ${color} 10%, transparent)`,
                  color,
                }}
                tabIndex={0}
              >
                {label}
              </div>
            </span>
          ))}
        </nav>
      </div>
    </section>
  )
}

// ── CHIPS BAR ────────────────────────────────────────────────────────────────
function ChipsBar() {
  const { state, actions } = useApp()

  return (
    <div className="chips-bar" role="toolbar" aria-label="Domain filter">
      <button
        className={`chip${!state.activeDomain ? ' on' : ''}`}
        style={!state.activeDomain ? { background: 'rgba(255,255,255,.12)', color: '#fff', borderColor: 'rgba(255,255,255,.26)' } : {}}
        onClick={() => actions.setActiveDomain(null)}
        aria-pressed={!state.activeDomain}
      >
        <span className="cdot" style={{ background: 'var(--text-m)' }} aria-hidden="true" />
        All Domains
      </button>

      {Object.entries(DOM_CFG).map(([k, d]) => {
        const isActive = state.activeDomain === k
        return (
          <button
            key={k}
            id={`chip-${k}`}
            className={`chip${isActive ? ' on' : ''}`}
            style={isActive ? { background: d.c, color: '#032D42', borderColor: 'transparent', fontWeight: 700 } : {}}
            onClick={() => actions.setActiveDomain(state.activeDomain === k ? null : k)}
            aria-pressed={isActive}
          >
            <span className="cdot" style={{ background: d.c }} aria-hidden="true" />
            {d.l}{d.isNew ? ' ★' : ''}
          </button>
        )
      })}
    </div>
  )
}

// ── PERSONA BADGE ─────────────────────────────────────────────────────────────
function PersonaBadge({ roleId }) {
  const { actions } = useApp()
  const r = ROLES[roleId]
  if (!r) return null
  return (
    <button
      className="prb"
      style={{
        background: rgba(r.c, 0.1),
        borderColor: rgba(r.c, 0.3),
        color: r.c,
      }}
      onClick={() => actions.openRole(roleId)}
      aria-label={`${r.nm} — click for responsibilities`}
    >
      <Icon name={ROLE_ICO[roleId] || 'user'} size={12} />
      {r.nm}
    </button>
  )
}

// ── DOMAIN ZONE ───────────────────────────────────────────────────────────────
function DomainZone({ domKey }) {
  const { state } = useApp()
  const d = DOM_CFG[domKey]
  const isDim = state.activeDomain !== null && state.activeDomain !== domKey
  const personas = Object.entries(ROLES)
    .filter(([, r]) => r.dm === d.l)
    .map(([id]) => id)

  // Entities for this zone (grouped by slot)
  const zoneEnts = ENT.filter(e => e.dm === domKey)

  // Slot → array of entities
  const slotGroups = {}
  zoneEnts.forEach(e => {
    if (!slotGroups[e.slot]) slotGroups[e.slot] = []
    slotGroups[e.slot].push(e)
  })

  const borderColor = rgba(d.c, 0.3)
  const bgColor = rgba(d.c, 0.06)

  return (
    <div
      className={`zone zone-${domKey}${isDim ? ' dim' : ''}`}
      id={`zone-${domKey}`}
      style={{ borderColor, background: bgColor }}
      aria-label={`${d.l} domain${d.isNew ? ' — new in CSDM 5' : ''}`}
    >
      <div className="zone-accent" style={{ background: d.c }} aria-hidden="true" />

      <div className="z-hd">
        <span className="z-icon" aria-hidden="true">
          <Icon name={DOM_ICO[domKey] || 'layers'} size={14} />
        </span>
        <span className="z-lbl" style={{ color: d.c }}>
          {d.l}
          {d.isNew && <span style={{ color: 'var(--wg)', fontSize: '.6rem' }} aria-label="New in CSDM 5"> ★</span>}
        </span>
        <span className="z-cnt" id={`zcnt-${domKey}`} title={`${zoneEnts.length} entities`}>
          {zoneEnts.length}
        </span>
      </div>

      {personas.length > 0 && (
        <div className="zone-personas" role="group" aria-label={`${d.l} personas`}>
          {personas.map(rid => <PersonaBadge key={rid} roleId={rid} />)}
        </div>
      )}

      {/* Zone-specific layout variations */}
      {domKey === 'build' && (
        <>
          <div className="inner-box">
            <div className="inner-box-lbl">Subsystems</div>
            <div className="ents" id="ents-build-sub">
              {(slotGroups['build-sub'] || []).map(e => (
                <EntityChip key={e.id} entity={e} domKey={domKey} />
              ))}
            </div>
          </div>
          <div className="ents" id="ents-build">
            {(slotGroups['build'] || []).map(e => (
              <EntityChip key={e.id} entity={e} domKey={domKey} />
            ))}
          </div>
        </>
      )}

      {domKey === 'delivery' && (
        <>
          <div className="delivery-inner">
            <div className="delivery-tier">
              <div className="zone-tier-lbl">Service Instance Owner tier</div>
              <div className="ents" id="ents-delivery-t1">
                {(slotGroups['delivery-t1'] || []).map(e => (
                  <EntityChip key={e.id} entity={e} domKey={domKey} />
                ))}
              </div>
            </div>
            <div className="delivery-tier">
              <div className="zone-tier-lbl">Service Delivery Owner tier</div>
              <div className="ents" id="ents-delivery-t2">
                {(slotGroups['delivery-t2'] || []).map(e => (
                  <EntityChip key={e.id} entity={e} domKey={domKey} />
                ))}
              </div>
            </div>
          </div>
          <div className="delivery-net">
            <div className="zone-tier-lbl">Service Delivery Network</div>
            <div className="ents" id="ents-delivery-net">
              {(slotGroups['delivery-net'] || []).map(e => (
                <EntityChip key={e.id} entity={e} domKey={domKey} />
              ))}
            </div>
          </div>
        </>
      )}

      {domKey === 'consumption' && (
        <>
          <div className="ents" id="ents-consumption-top">
            {(slotGroups['consumption-top'] || []).map(e => (
              <EntityChip key={e.id} entity={e} domKey={domKey} />
            ))}
          </div>
          <div className="cat-box">
            <div className="cat-box-lbl">Catalog</div>
            <div className="ents" id="ents-consumption-cat">
              {(slotGroups['consumption-cat'] || []).map(e => (
                <EntityChip key={e.id} entity={e} domKey={domKey} />
              ))}
            </div>
          </div>
        </>
      )}

      {domKey === 'foundation' && (
        <div className="ents" id="ents-foundation">
          {zoneEnts.map(e => (
            <EntityChip key={e.id} entity={e} domKey={domKey} />
          ))}
        </div>
      )}

      {!['build', 'delivery', 'consumption', 'foundation'].includes(domKey) && (
        <div className="ents" id={`ents-${domKey}`}>
          {zoneEnts.map(e => (
            <EntityChip key={e.id} entity={e} domKey={domKey} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── DIAGRAM VIEW ROOT ─────────────────────────────────────────────────────────
export default function DiagramView() {
  return (
    <>
      <div id="hero-wrap">
        <Hero />
        <ChipsBar />
      </div>

      <div className="view-wrap" id="v-diagram">
        <div className="dg-scroll">
          <div className="dg" id="dg" role="region" aria-label="CSDM 5 conceptual diagram">
            <DomainZone domKey="build" />
            <DomainZone domKey="design" />
            <DomainZone domKey="portfolio" />
            <DomainZone domKey="ideation" />
            <DomainZone domKey="delivery" />
            <DomainZone domKey="consumption" />
            <DomainZone domKey="foundation" />
          </div>
        </div>

        <div className="legend" role="list" aria-label="Diagram legend">
          <div className="leg-i" role="listitem">
            <span className="leg-dot" style={{ background: 'var(--wg)' }} aria-hidden="true" />
            ★ New in CSDM 5
          </div>
          <div className="leg-i" role="listitem">
            <span className="leg-dot" style={{ background: 'var(--blue)' }} aria-hidden="true" />
            ↷ Renamed in CSDM 5
          </div>
          <div className="leg-i" role="listitem">
            Click or tap any entity for white paper details
          </div>
        </div>
      </div>
    </>
  )
}
