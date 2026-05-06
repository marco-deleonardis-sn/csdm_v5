import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { EXAMPLES, EX_MODELS, Icon } from '../../data'

// ── Zone component ────────────────────────────────────────────────────────────
function Zone({ color, label, children }) {
  return (
    <div className="em-zone" style={{ borderColor: `${color}55` }}>
      <div className="em-zone-bar" style={{ background: color }} />
      <div className="em-zone-lbl" style={{ color }}>{label}</div>
      <div className="em-row">{children}</div>
    </div>
  )
}

function EntityGroup({ label, items, isHost = false, color = 'var(--text-f)' }) {
  if (!items?.length) return null
  return (
    <div className="em-egrp">
      <div className="em-egrp-lbl" style={{ color }}>{label}</div>
      {items.map((val, i) => (
        <div key={i} className={`em-ebox${i === 0 && isHost ? ' host' : ''}`}
          style={i === 0 && isHost ? { borderLeftColor: color } : {}}>
          {val}
        </div>
      ))}
    </div>
  )
}

function HRel({ label }) {
  return (
    <div className="em-rel" aria-hidden="true">
      <svg width="28" height="10" viewBox="0 0 28 10" fill="none" stroke="var(--bord-s)" strokeWidth="1">
        <line x1="0" y1="5" x2="22" y2="5" /><polyline points="16 1 22 5 16 9" />
      </svg>
      <span style={{ fontSize: '.5rem', color: 'var(--text-f)' }}>{label}</span>
    </div>
  )
}

function Connector({ label }) {
  return (
    <div className="em-connector" aria-hidden="true">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <div style={{ width: 1, height: 16, background: 'var(--bord-s)' }} />
        <div style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '6px solid var(--bord-s)', marginTop: -1 }} />
      </div>
      <span className="em-conn-lbl">{label}</span>
    </div>
  )
}

// ── Model diagram builder ──────────────────────────────────────────────────────
function ModelDiagram({ model }) {
  const { design, delivery, consumption } = model

  const hasDesign = design?.bcap?.length || design?.bapp_host || design?.bapp_apps?.length
  const siItems = [design?.bapp_host ? null : null, ...(delivery?.si_apps || [])]
    .filter(Boolean)
  const allSi = [delivery?.si_host, ...(delivery?.si_apps || [])].filter(Boolean)
  const hasDelivery = allSi.length || delivery?.tmo?.length || delivery?.infra?.length
  const hasConsumption = consumption?.bso?.length || consumption?.bs?.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
      {/* Design & Planning */}
      {hasDesign && (
        <>
          <Zone color="var(--cd)" label="Design & Planning">
            {design.bcap?.length > 0 && (
              <>
                <EntityGroup label="Business Capability" items={design.bcap} color="var(--cd)" />
                <HRel label="Provided by" />
              </>
            )}
            {(design.bapp_host || design.bapp_apps?.length > 0) && (
              <EntityGroup
                label="Business Application"
                items={[design.bapp_host, ...(design.bapp_apps || [])].filter(Boolean)}
                isHost={!!design.bapp_host}
                color="var(--cd)"
              />
            )}
          </Zone>
          <Connector label="Consumes →" />
        </>
      )}

      {/* Service Delivery */}
      {hasDelivery && (
        <>
          <Zone color="var(--cde)" label="Service Delivery">
            {allSi.length > 0 && (
              <EntityGroup
                label="Service Instance"
                items={allSi}
                isHost={!!delivery.si_host}
                color="var(--cde)"
              />
            )}
            {delivery.tmo?.length > 0 && (
              <>
                {allSi.length > 0 && <HRel label="Contained by" />}
                <EntityGroup label="Tech Mgmt Svc Offering" items={delivery.tmo} color="var(--cde)" />
              </>
            )}
            {delivery.tms?.length > 0 && (
              <>
                <HRel label="References" />
                <EntityGroup label="Tech Mgmt Service" items={delivery.tms} color="var(--cde)" />
              </>
            )}
            {delivery.dcig?.length > 0 && (
              <>
                <HRel label="Contains" />
                <EntityGroup label="Dynamic CI Group" items={delivery.dcig} color="var(--cde)" />
              </>
            )}
            {delivery.infra?.length > 0 && (
              <>
                {!delivery.dcig?.length && <HRel label="Contains" />}
                <EntityGroup label="Infrastructure CIs" items={delivery.infra} color="var(--text-f)" />
              </>
            )}
          </Zone>
          {hasConsumption && <Connector label="Depends on →" />}
        </>
      )}

      {/* Service Consumption */}
      {hasConsumption && (
        <Zone color="var(--cc)" label="Service Consumption">
          {consumption.bso?.length > 0 && (
            <EntityGroup label="Business Svc Offering" items={consumption.bso} color="var(--cc)" />
          )}
          {consumption.bs?.length > 0 && (
            <>
              <HRel label="Depends on" />
              <EntityGroup label="Business Service" items={consumption.bs} color="var(--cc)" />
            </>
          )}
          {consumption.sport?.length > 0 && (
            <>
              <HRel label="References" />
              <EntityGroup label="Service Portfolio" items={consumption.sport} color="var(--cc)" />
            </>
          )}
        </Zone>
      )}

      {/* CSM extension (MSP pattern) */}
      {consumption?.csm && (
        <Zone color="var(--indigo)" label="CSM Extension — Sold Product → Install Base">
          <EntityGroup label="Service Model" items={[consumption.csm.service_model]} color="var(--indigo)" />
          <HRel label="References" />
          <EntityGroup label="Sold Product" items={[consumption.csm.sold_product]} color="var(--indigo)" />
          {consumption.csm.install_base?.length > 0 && (
            <>
              <HRel label="References" />
              <EntityGroup label="Install Base Items" items={consumption.csm.install_base} color="var(--indigo)" />
            </>
          )}
        </Zone>
      )}

      <p style={{ fontFamily: 'var(--mono)', fontSize: '.56rem', color: 'var(--text-f)', marginTop: '.5rem' }}>
        Source: CSDM Data Models Guide · ServiceNow 2025 · Green left border = Host / Platform Host
      </p>
    </div>
  )
}

// ── Modal ──────────────────────────────────────────────────────────────────────
export default function ExampleModal() {
  const { state, actions } = useApp()

  const ex = useMemo(
    () => EXAMPLES.find(e => e.id === state.selectedExampleId),
    [state.selectedExampleId]
  )
  const model = ex ? EX_MODELS[ex.id] : null
  const isOpen = !!ex

  return (
    <div
      className={`em-ov${isOpen ? ' on' : ''}`}
      id="em-ov"
      role="dialog"
      aria-modal="true"
      aria-label={ex ? `Entity chain model — ${ex.nm}` : 'Example model'}
      aria-hidden={!isOpen}
      onClick={e => { if (e.target === e.currentTarget) actions.closeExample() }}
    >
      <div className="em-modal">
        <div className="em-mhd">
          <div className="em-mhd-left">
            <div className="em-mhd-nm" id="em-hd-nm">{ex?.nm}</div>
            <div className="em-mhd-meta" id="em-hd-meta">
              {ex && (
                <>
                  <span className="ex-badge" style={{ background:'rgba(82,184,255,.12)',color:'var(--blue)',border:'1px solid rgba(82,184,255,.25)' }}>{ex.depl}</span>
                  <span className="ex-badge" style={{ background:'rgba(255,255,255,.06)',color:'var(--text-m)',border:'1px solid var(--bord)' }}>{ex.ind}</span>
                  <span className="ex-badge" style={{ background:'rgba(74,222,128,.1)',color:'var(--ok)',border:'1px solid rgba(74,222,128,.22)' }}>{ex.mat}</span>
                </>
              )}
            </div>
          </div>
          <button
            className="em-mclose"
            id="em-close"
            onClick={actions.closeExample}
            aria-label="Close entity chain model"
          >
            ✕
          </button>
        </div>

        <div className="em-mbody" id="em-body">
          {ex && <p style={{ fontSize: 'var(--fs-small)', color: 'var(--text-m)', fontWeight: 300, lineHeight: 1.6, marginBottom: '1rem' }}>{ex.desc}</p>}
          {model ? <ModelDiagram model={model} /> : (
            <p style={{ fontSize: 'var(--fs-small)', color: 'var(--text-m)', fontStyle: 'italic' }}>
              Entity chain model not available for this example.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
