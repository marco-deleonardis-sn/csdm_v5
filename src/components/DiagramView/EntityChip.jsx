import { useApp } from '../../context/AppContext'
import { DOM_CFG, rgba } from '../../data'

export default function EntityChip({ entity, domKey }) {
  const { state, actions } = useApp()
  const d = DOM_CFG[domKey]
  const isSelected = state.selectedEntityId === entity.id
  const isDim = state.activeDomain !== null && state.activeDomain !== domKey

  const chipStyle = {
    background: isSelected ? rgba(d.c, 0.3) : rgba(d.c, 0.13),
    borderColor: isSelected ? d.c : rgba(d.c, 0.38),
    color: `var(--cc-${domKey})`,
    ...(isSelected && {
      boxShadow: `0 0 0 2px ${rgba(d.c, 0.3)}`,
      outline: `2px solid ${rgba(d.c, 0.5)}`,
      outlineOffset: '2px',
    }),
  }

  return (
    <div
      className={`ec${isDim ? ' dim' : ''}`}
      style={chipStyle}
      data-id={entity.id}
      data-dm={domKey}
      role="button"
      tabIndex={isDim ? -1 : 0}
      aria-label={[
        entity.lbl,
        entity.isNew ? '(New in CSDM 5)' : '',
        entity.isRenamed ? '(Renamed in CSDM 5)' : '',
        `— ${d.l} domain. Click for details.`,
      ].filter(Boolean).join(' ')}
      onClick={() => actions.openEntity(entity.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          actions.openEntity(entity.id)
          e.preventDefault()
        }
      }}
    >
      {entity.isNew     && <span className="dot-n" aria-hidden="true" title="New in CSDM 5" />}
      {entity.isRenamed && <span className="dot-r" aria-hidden="true" title="Renamed in CSDM 5" />}
      {entity.lbl}
    </div>
  )
}
