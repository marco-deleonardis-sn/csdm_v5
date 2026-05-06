// rgba helper used throughout components
export function rgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

export const DOM_CFG = {
  build:       { l: 'Build & Integration',    c: '#C93838', icon: 'cube' },
  design:      { l: 'Design & Planning',       c: '#2478AA', icon: 'pencil' },
  ideation:    { l: 'Ideation & Strategy',     c: '#B88800', icon: 'lightbulb', isNew: true },
  delivery:    { l: 'Service Delivery',        c: '#C96C10', icon: 'cog' },
  consumption: { l: 'Service Consumption',     c: '#3D7C14', icon: 'layers' },
  foundation:  { l: 'Foundation',              c: '#888888', icon: 'database' },
  portfolio:   { l: 'Manage Portfolio',        c: '#94A3B8', icon: 'briefcase' },
}

export const DOM_DESC = {
  build:       'Tables providing visibility in the build and integration effort of digital products, including the DevOps process. NOT targets of ITSM processes. Common persona: Teams.',
  design:      'Tables used by Enterprise Architecture (EA, formerly APM) representing the logical design of enterprise applications. NOT direct targets of ITSM. Common personas: Enterprise Architect, Application Owner.',
  ideation:    'NEW DOMAIN in CSDM 5. Represents ideas, concepts, and considerations for creating new or improved CSDM services. Part of Strategic Portfolio Management (SPM). Common persona: Product Owner.',
  delivery:    'The overall end-to-end Service Delivery System — infrastructure, technologies, integration patterns, delivery networks, and operational models. ARE targets of ITSM: Incident, Problem, Change.',
  consumption: 'Tables used by Service Portfolio Management (SPM) and Customer Service Management (CSM). ARE selectable for ITSM. Common personas: Business Relationship Manager, Customer Service Manager.',
  foundation:  'Tables containing base data referenced from all other CSDM domains. Critical referential data. Common personas: Process Owner, Data Steward, Product Owner, Contract Manager.',
  portfolio:   'Encompasses portions of all five domains. Provides service owners visibility across Business Services, Business Applications, and Application Services.',
}

// Domain tab display order in Explorer
export const DOM_ORDER = ['ideation', 'design', 'build', 'delivery', 'consumption', 'foundation', 'portfolio']

// AI callout banners for specific domain tabs
export const AI_NOTES = {
  ideation: {
    type: 'purple',
    title: 'AI Governance Entry Point:',
    body: 'Ideation & Strategy is the first link in the CSDM 5 AI governance chain. Product Ideas and Planning Items capture AI use cases aligned to Strategic Priorities — enabling the Permit to Build/Learn/Operate governance language.',
    action: { label: 'View AI Ready tab →', tab: 'ep-ai' },
  },
  build: {
    type: 'green',
    title: 'AI Build:',
    body: 'The AI Digital Asset class (alm_ai_digital_asset) tracks AI/GenAI components — AI Model, AI Dataset, AI Prompt Digital Assets — through the build pipeline. These feed into deployed AI Application and AI Function CIs in Service Delivery.',
  },
  delivery: {
    type: 'green',
    title: 'AI Ready Classes:',
    body: 'AI Function (cmdb_ci_function_ai) for cloud AI SaaS and AI Application (cmdb_ci_appl_ai_application) for on-prem/containerized AI are first-class CMDB CIs subject to full ITSM: Incident, Problem, Change.',
  },
  foundation: {
    type: 'green',
    title: 'Knowledge is AI Governance:',
    body: 'AI Agents use knowledge articles to learn. The quality of your knowledge base directly impacts Now Assist, AI Search, and any AI Agent that draws on it. SBOM (FREE) tracks AI supply chain components for vulnerability management.',
  },
}
