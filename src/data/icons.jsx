// ── SVG ICON PATHS (Lucide-geometry, hand-drawn, no external deps) ──────────
export const SVG_PATHS = {
  briefcase: '<rect x="2" y="8" width="20" height="14" rx="2"/><path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="2" y1="14" x2="22" y2="14"/>',
  cube:      '<polyline points="21 16 21 8 12 3 3 8 3 16 12 21 21 16"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" y1="22" x2="12" y2="12"/>',
  pencil:    '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  lightbulb: '<line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17H8v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"/>',
  cog:       '<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  layers:    '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  database:  '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>',
  sparkle:   '<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 3l.5 1.5 1.5.5-1.5.5L19 7l-.5-1.5L17 5l1.5-.5z"/>',
  shield:    '<path d="M12 2L3 7v6c0 5 3.8 9.6 9 11 5.2-1.4 9-6 9-11V7z"/>',
  book:      '<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>',
  code:      '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  flow:      '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  doc:       '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  package:   '<polyline points="21 16 21 8 12 3 3 8 3 16 12 21 21 16"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" y1="22" x2="12" y2="12"/>',
  chart:     '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  target:    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  api:       '<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>',
  server:    '<rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><line x1="6" y1="5.5" x2="6.01" y2="5.5"/><line x1="6" y1="12.5" x2="6.01" y2="12.5"/>',
  cloud:     '<path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>',
  user:      '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>',
  users:     '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="3"/><path d="M21 20c0-2.8-1.8-5-4-5.5"/>',
  ai:        '<path d="M12 2l2 7h7l-6 4 2 7-5-4-5 4 2-7-6-4h7z"/>',
  grid:      '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
  arrow:     '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  // ── Theme toggle icons (added for Header) ──────────────────────────────
  moon:      '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  sun:       '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  eye:       '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
}

// ── React icon component ──────────────────────────────────────────────────────
export function Icon({ name, size = 18, className = '', style = {} }) {
  // Dev-mode warning for unknown icon names. Production silently falls back.
  if (import.meta.env.DEV && !SVG_PATHS[name]) {
    console.warn(`[Icon] Unknown icon name: "${name}". Falling back to "doc".`)
  }
  const path = SVG_PATHS[name] || SVG_PATHS.doc
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: path }}
    />
  )
}

// ── Entity → icon key maps ────────────────────────────────────────────────────
export const ENT_ICO = {
  planitem:'doc',   prodidea:'lightbulb', devops:'code',    sdlc:'cube',
  aida:'sparkle',   bcap:'grid',          bapp:'layers',    iobj:'doc',
  stratplan:'target',stratpri:'lightbulb',goal:'target',    target:'chart',
  tms:'cog',        tmo:'doc',            si:'cloud',       tms2:'cog',
  tmo2:'doc',       dcig:'database',      api:'api',        app:'server',
  aifn:'sparkle',   aiapp:'ai',           sds:'cloud',      bso:'doc',
  bs:'briefcase',   sport:'chart',        svccat:'layers',  prodcat:'package',
  salescat:'chart', vs:'flow',            bp:'flow',        contract:'doc',
  pm:'package',     pf:'sparkle',         sbom:'shield',    lc:'flow',
  know:'book',      loc:'target',         team:'users',     cmdbg:'database',
  grp:'users',      org:'briefcase',
}

export const ROLE_ICO = {
  developer:'code',     teams:'users',        entarch:'grid',
  digprodowner:'layers',productowner:'lightbulb',serviceowner:'briefcase',
  siowner:'cog',        sdowner:'cog',        serviceagents:'server',
  brm:'users',          csm:'users',          knowowner:'book',
  processowner:'flow',  contractmgr:'doc',    prodowner:'package',
  datasteward:'shield',
}

export const DOM_ICO = {
  build:'cube',    design:'pencil',  ideation:'lightbulb', delivery:'cog',
  consumption:'layers', foundation:'database', portfolio:'briefcase',
}