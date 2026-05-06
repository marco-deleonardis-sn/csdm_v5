import { Icon } from '../../../data'
import { J_STAGES, J_STAGE_ORDER } from '../../../data/journey'
import { useApp } from '../../../context/AppContext'

export default function JourneyTab() {
  const { state, actions } = useApp()
  const step = state.journeyStep || 'crawl'
  const stepIdx = J_STAGE_ORDER.indexOf(step)
  const data = J_STAGES.find(s => s.id === step)

  if (!data) return null

  return (
    <div className="tpanel on" id="ep-journey" role="tabpanel">
      <div className="fam-hdr fade-in">
        <h2><Icon name="chart" size={16} /> Where are you in your CSDM journey?</h2>
      </div>
      <p className="sec-lede">
        Select your current adoption stage to see which CSDM entities are required, which are optional,
        and what you have already completed. Each stage builds on the previous one.
      </p>

      {/* Stepper */}
      <div className="j-stepper" role="group" aria-label="Adoption stages">
        {J_STAGES.map((s, i) => {
          const isDone   = i < stepIdx
          const isActive = i === stepIdx
          return (
            <span key={s.id} style={{ display: 'contents' }}>
              {i > 0 && <div className="j-sep" aria-hidden="true" />}
              <div
                className={`j-step${isActive ? ' on' : ''}${isDone ? ' done' : ''}`}
                id={`jst-${s.id}`}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`Stage ${s.num}: ${s.lbl}`}
                onClick={() => actions.setJourneyStep(s.id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') actions.setJourneyStep(s.id) }}
              >
                <div className="j-sn">{s.num}</div>
                <div className="j-si"><Icon name={s.ico} size={18} /></div>
                <div className="j-sl">{s.lbl}</div>
              </div>
            </span>
          )
        })}
      </div>

      {/* Stage panel */}
      <div className="j-panel" id="j-stage-panel">
        <div className="j-ph">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
            <h3 style={{ fontSize: 'var(--fs-h3)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
              Stage {data.num} — {data.lbl}
            </h3>
            {data.prereq
              ? <span style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', color: 'var(--text-f)' }}>Requires: {data.prereq}</span>
              : <span style={{ fontFamily: 'var(--mono)', fontSize: '.55rem', color: 'var(--ok)' }}>Starting point — no prerequisites</span>
            }
          </div>
          <p style={{ fontSize: 'var(--fs-body)', color: 'var(--text-m)', fontWeight: 300, lineHeight: 1.6, margin: 0 }}>
            {data.desc}
          </p>
        </div>

        <div className="j-pbody">
          {/* Required column */}
          <div className="j-col">
            <div className="j-clbl" style={{ color: 'var(--ok)' }}>
              <Icon name="chart" size={12} /> Required for this stage
            </div>
            {data.req.map(e => (
              <div key={e.name} className="j-ent">
                <span className="j-edot" style={{ background: 'var(--ok)' }} />
                <div>
                  <div className="j-en">{e.name}</div>
                  <div className="j-et">{e.tbl}</div>
                  <div className="j-enote">{e.note}</div>
                </div>
              </div>
            ))}
            {data.opt.length > 0 && (
              <>
                <div className="j-clbl" style={{ color: 'var(--text-f)', marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--bord)' }}>
                  Optional
                </div>
                {data.opt.map(e => (
                  <div key={e.name} className="j-ent">
                    <span className="j-edot" style={{ background: 'var(--text-f)' }} />
                    <div>
                      <div className="j-en" style={{ fontWeight: 400, color: 'var(--text-m)' }}>{e.name}</div>
                      <div className="j-et">{e.tbl}</div>
                      <div className="j-enote">{e.note}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* Inherited column */}
          <div className="j-col">
            <div className="j-clbl" style={{ color: 'var(--text-f)' }}>
              <Icon name="layers" size={12} /> From previous stages
            </div>
            {data.inh.length === 0
              ? <p style={{ fontSize: 'var(--fs-small)', color: 'var(--text-m)', fontStyle: 'italic' }}>Starting stage — no prerequisites.</p>
              : data.inh.map(e => (
                <div key={e.name} className="j-ent" style={{ opacity: 0.6 }}>
                  <span className="j-edot" style={{ background: 'var(--text-f)' }} />
                  <div>
                    <div className="j-en" style={{ fontWeight: 400 }}>{e.name}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.5rem', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-f)' }}>{e.dom}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
