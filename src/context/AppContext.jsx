import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { REL_ENTS } from '../data'

// ── INITIAL STATE ────────────────────────────────────────────────────────────
const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('csdm-theme')
    if (saved) return saved
  } catch (_) {}
  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light'
  return 'dark'
}

const initialState = {
  theme: getInitialTheme(),
  view: window.innerWidth < 640 ? 'explorer' : 'diagram',
  activeTab: 'ep-overview',
  activeDomain: null,       // null = all domains shown
  selectedEntityId: null,   // opens EntityDetailPanel
  selectedRoleId: null,     // opens RoleSheet
  selectedExampleId: null,  // opens ExampleModal
  relEntityId: REL_ENTS[0]?.id ?? 'si',
  relDirection: 'all',
  journeyStep: 'crawl',
  searchQuery: '',
}

// ── REDUCER ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':        return { ...state, theme: action.payload }
    case 'SET_VIEW':         return { ...state, view: action.payload }
    case 'SET_ACTIVE_TAB':   return { ...state, activeTab: action.payload, searchQuery: '' }
    case 'SET_ACTIVE_DOMAIN':return { ...state, activeDomain: action.payload }
    case 'OPEN_ENTITY':      return { ...state, selectedEntityId: action.payload }
    case 'CLOSE_ENTITY':     return { ...state, selectedEntityId: null }
    case 'OPEN_ROLE':        return { ...state, selectedRoleId: action.payload }
    case 'CLOSE_ROLE':       return { ...state, selectedRoleId: null }
    case 'OPEN_EXAMPLE':     return { ...state, selectedExampleId: action.payload }
    case 'CLOSE_EXAMPLE':    return { ...state, selectedExampleId: null }
    case 'SET_REL_ENTITY':   return { ...state, relEntityId: action.payload, relDirection: 'all' }
    case 'SET_REL_DIRECTION':return { ...state, relDirection: action.payload }
    case 'SET_JOURNEY_STEP': return { ...state, journeyStep: action.payload }
    case 'SET_SEARCH':       return { ...state, searchQuery: action.payload }
    default:                 return state
  }
}

// ── CONTEXT ──────────────────────────────────────────────────────────────────
export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Persist theme and apply to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme)
    try { localStorage.setItem('csdm-theme', state.theme) } catch (_) {}
  }, [state.theme])

  // Body overflow lock when a panel is open
  useEffect(() => {
    const locked = state.selectedEntityId || state.selectedRoleId || state.selectedExampleId
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [state.selectedEntityId, state.selectedRoleId, state.selectedExampleId])

  // Keyboard ESC to close any open panel
  useEffect(() => {
    const handler = (e) => {
      if (e.key !== 'Escape') return
      if (state.selectedExampleId) dispatch({ type: 'CLOSE_EXAMPLE' })
      else if (state.selectedRoleId) dispatch({ type: 'CLOSE_ROLE' })
      else if (state.selectedEntityId) dispatch({ type: 'CLOSE_ENTITY' })
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [state.selectedEntityId, state.selectedRoleId, state.selectedExampleId])

  // ── Action helpers ──────────────────────────────────────────────────────
  const actions = {
    setTheme:         useCallback((t) => dispatch({ type: 'SET_THEME', payload: t }), []),
    setView:          useCallback((v) => dispatch({ type: 'SET_VIEW', payload: v }), []),
    setActiveTab:     useCallback((t) => dispatch({ type: 'SET_ACTIVE_TAB', payload: t }), []),
    setActiveDomain:  useCallback((d) => dispatch({ type: 'SET_ACTIVE_DOMAIN', payload: d }), []),
    openEntity:       useCallback((id) => dispatch({ type: 'OPEN_ENTITY', payload: id }), []),
    closeEntity:      useCallback(() => dispatch({ type: 'CLOSE_ENTITY' }), []),
    openRole:         useCallback((id) => dispatch({ type: 'OPEN_ROLE', payload: id }), []),
    closeRole:        useCallback(() => dispatch({ type: 'CLOSE_ROLE' }), []),
    openExample:      useCallback((id) => dispatch({ type: 'OPEN_EXAMPLE', payload: id }), []),
    closeExample:     useCallback(() => dispatch({ type: 'CLOSE_EXAMPLE' }), []),
    setRelEntity:     useCallback((id) => dispatch({ type: 'SET_REL_ENTITY', payload: id }), []),
    setRelDirection:  useCallback((d) => dispatch({ type: 'SET_REL_DIRECTION', payload: d }), []),
    setJourneyStep:   useCallback((s) => dispatch({ type: 'SET_JOURNEY_STEP', payload: s }), []),
    setSearch:        useCallback((q) => dispatch({ type: 'SET_SEARCH', payload: q }), []),

    // Convenience: navigate to entity in diagram view
    goToEntity: useCallback((id) => {
      dispatch({ type: 'SET_VIEW', payload: 'diagram' })
      setTimeout(() => dispatch({ type: 'OPEN_ENTITY', payload: id }), 80)
    }, []),

    // Convenience: switch to explorer and open a tab
    goToTab: useCallback((tabId) => {
      dispatch({ type: 'SET_VIEW', payload: 'explorer' })
      dispatch({ type: 'SET_ACTIVE_TAB', payload: tabId })
    }, []),
  }

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  )
}

// Convenience hook
export const useApp = () => useContext(AppContext)
