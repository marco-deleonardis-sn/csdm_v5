export const J_STAGES = [
  {
    id: 'crawl', num: '01', ico: 'cube', lbl: 'Crawl', c: 'var(--cd)',
    prereq: null,
    desc: 'Minimum viable service model. Establish application inventory and their deployed instances. Most organizations already have this data — the goal is getting it accurately into ServiceNow.',
    req: [
      { name: 'Business Application', dom: 'Design & Planning', tbl: 'cmdb_ci_business_app',
        note: 'Application portfolio inventory — the software your org uses to deliver business capabilities' },
      { name: 'Service Instance', dom: 'Service Delivery', tbl: 'cmdb_ci_service_auto',
        note: 'Deployed instance of the application — represents Prod, Dev, QA environments separately' },
    ],
    opt: [],
    inh: [],
  },
  {
    id: 'walk', num: '02', ico: 'layers', lbl: 'Walk', c: 'var(--cde)',
    prereq: 'Crawl',
    desc: 'Formalize technology service management. Establish who owns and manages each application. Add the tech service structure connecting infrastructure to applications.',
    req: [
      { name: 'Tech Mgmt Service', dom: 'Service Delivery', tbl: 'cmdb_ci_service_technical',
        note: 'Technology towers: App Mgmt, Database Services, Network Services, Compute/Hosting. Published to service owners' },
      { name: 'Tech Mgmt Svc Offering', dom: 'Service Delivery', tbl: 'service_offering (Technical)',
        note: 'Stratifies the TMS: location, SLA, support group, environment, pricing. Each offering Contains Service Instances' },
    ],
    opt: [
      { name: 'Dynamic CI Group', dom: 'Service Delivery', tbl: 'cmdb_ci_query_based_service',
        note: 'Query-based grouping of CIs — all Windows servers, all SQL instances, all network gear' },
    ],
    inh: [
      { name: 'Business Application', dom: 'Design & Planning' },
      { name: 'Service Instance', dom: 'Service Delivery' },
    ],
  },
  {
    id: 'run', num: '03', ico: 'chart', lbl: 'Run', c: 'var(--cb)',
    prereq: 'Crawl + Walk',
    desc: 'Enable business impact analysis. Add the business-facing service layer connecting IT infrastructure to business outcomes. Required for meaningful Change impact and Incident business context.',
    req: [
      { name: 'Business Service', dom: 'Service Consumption', tbl: 'cmdb_ci_service_business',
        note: 'Published to business users. Operational CI — used for ITSM Incident, Problem, Change impact analysis and Change Approvals' },
      { name: 'Business Svc Offering', dom: 'Service Consumption', tbl: 'service_offering (Business)',
        note: 'Stratifies the Business Service: geography, pricing, availability, criticality, SLA. Orderable via Request Catalog' },
    ],
    opt: [
      { name: 'Service Portfolio', dom: 'Service Consumption', tbl: 'service_portfolio',
        note: 'Hierarchical classification: Technology Portfolio, HR Portfolio, Financial Portfolio, etc.' },
    ],
    inh: [
      { name: 'Business Application', dom: 'Design & Planning' },
      { name: 'Service Instance', dom: 'Service Delivery' },
      { name: 'Tech Mgmt Service', dom: 'Service Delivery' },
      { name: 'Tech Mgmt Svc Offering', dom: 'Service Delivery' },
    ],
  },
  {
    id: 'fly', num: '04', ico: 'sparkle', lbl: 'Fly', c: 'var(--ci)',
    prereq: 'Crawl + Walk + Run',
    desc: 'Complete CSDM 5. Align services to business capabilities, strategic goals, and the ideation pipeline. Unlocks AI-ready governance, EA alignment, and Strategic Portfolio Management.',
    req: [
      { name: 'Business Capability', dom: 'Design & Planning', tbl: 'cmdb_ci_business_capability',
        note: 'What the org is capable of (WHAT, not HOW). Up to 6 levels. Maps to Value Stream Stages (m2m). Foundation for EA rationalization' },
      { name: 'Information Object', dom: 'Design & Planning', tbl: 'cmdb_ci_information_object',
        note: 'Data governance — tracks data sensitivity and PII/PCI/HIPAA scoping per Business Application' },
    ],
    opt: [
      { name: 'Strategic Plan', dom: 'Ideation & Strategy', tbl: 'sn_gf_plan',
        note: 'Mission, Vision, Value statements — organizational context for Priorities, Goals, and Targets' },
      { name: 'Goals & Targets', dom: 'Ideation & Strategy', tbl: 'sn_gf_goal / sn_gf_goal_target',
        note: 'Qualitative goals + quantifiable measures. Planning Items align to these' },
      { name: 'AI Digital Asset', dom: 'Build & Integration', tbl: 'alm_ai_digital_asset',
        note: 'NEW: AI/GenAI component governance — models, datasets, prompts through the build pipeline' },
      { name: 'AI Application / Function', dom: 'Service Delivery', tbl: 'cmdb_ci_appl_ai_application',
        note: 'NEW: First-class CMDB CIs for on-prem AI and cloud AI SaaS. Subject to full ITSM impact analysis' },
    ],
    inh: [
      { name: 'Business Application', dom: 'Design & Planning' },
      { name: 'Service Instance', dom: 'Service Delivery' },
      { name: 'Tech Mgmt Service', dom: 'Service Delivery' },
      { name: 'Business Service', dom: 'Service Consumption' },
      { name: 'Business Svc Offering', dom: 'Service Consumption' },
    ],
  },
]

export const J_STAGE_ORDER = ['crawl', 'walk', 'run', 'fly']
