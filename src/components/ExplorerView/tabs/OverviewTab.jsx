import { Icon } from '../../../data'

const WN = [
  { t:'Ideation & Strategy — New Domain', d:'Brand-new CSDM domain in v5. Captures ideas, concepts, and considerations for new or improved services via Strategic Plan, Strategic Priority, Goal, Target, Product Idea, and Planning Item. Part of SPM.' },
  { t:'AI Data Model — GPU, LLM, AI App, AI Function', d:'New AI classes: AI Digital Asset (Build), AI Function (cloud AI SaaS), AI Application (on-prem/container AI), Data Service Instance (AI/ML pipelines), AI System Product Model. AI is a first-class CMDB entity in CSDM 5.' },
  { t:'Software Bill of Materials (SBOM)', d:'New Foundation capability. Detailed inventory of all software components. Core element for Security Operations and vulnerability tracking. FREE via ServiceNow Store (sn_sbom_core).' },
  { t:'System Component Model', d:'New product model hierarchy. Includes Software Component Model, Service Offering Model, Firmware Model, and AI System Product Model sub-types. Used by EA, Digital Product Release, SAM, and ITAM.' },
  { t:'Product Feature', d:'New Foundation capability. Represents what a Product Model does. Connects product capabilities to stories, code, and testing. Core element of Digital Product Release (DPR).' },
  { t:'Value Stream (expanded)', d:'New Foundation capability. How work really happens across the organization. 16 OOB value stream categories. Maps to Business Capabilities and Business Processes through m2m relationships.' },
  { t:'Teams — Multi-Group CI Ownership', d:'Solves multi-group CI ownership without custom attributes. The Teams related list automatically synchronizes Change Group, Managed by Group, and Support Group assignments from CI forms.' },
  { t:'Life Cycle Stage & Stage Status', d:'Replaces legacy operational_status synchronization. In Xanadu, Product Instance 2.0 (PI 2.0) eliminates legacy sync. Test in non-prod before activating.' },
  { t:'Service Instances Expanded', d:'Service Instance (renamed from Application Service) now has 6 siblings: Data, Network, Connection, Facility, and Operational Process Service Instance.' },
  { t:'Table Label Changes', d:'Three tables renamed: Technical Service → Technology Management Service, Technical Service Offering → Technology Management Service Offering, Application Service → Service Instance.' },
]

const PR = [
  { n:'01', t:'Simplified Concepts',               d:'Concepts are represented in a simple, distinct manner to eliminate duplicates and confusion over data sources.' },
  { n:'02', t:'Designed for Reporting & Analytics', d:'A prime objective of CSDM is to support consistent analysis across the ServiceNow AI Platform.' },
  { n:'03', t:'Prescriptive Relationships',         d:'The prescribed relationships and references should be the main approach to link CSDM tables. Deviating creates technical debt.' },
  { n:'04', t:'Shared Data Model Collaboration',    d:'CSDM identifies a data model shared across products. Collaborating with product teams achieves the best shared design.' },
  { n:'05', t:'Agreed Definitions',                 d:'Agreed-upon CSDM definitions should be used wherever the table, reference, or attribute is used.' },
  { n:'06', t:'OOB Tables',                         d:'Shared CSDM tables are provided out of box or as free App Store plugins. No licensing required for the CSDM framework itself.' },
  { n:'07', t:'Consistent Data Integrations',       d:'Leverage prescribed technologies when integrating external data sources. CMDB Service Graph Connectors are preferred.' },
  { n:'08', t:'CSDM Adoption',                      d:'Customer impacts per release are limited by providing automation and guidance to accelerate adoption.' },
  { n:'09', t:'Data Governance & Process',           d:'The presence of data provides little value without governance and effective process. Data quality is CSDM quality.' },
  { n:'10', t:'Product Use Documentation',           d:'Documented guidance on use and value of CSDM will be provided by each product team that references CSDM objects.' },
]

const WHY = [
  { t:'Common Language',           d:'A single page of CSDM shows how the data model covers different roles and needs. Once understood, it is the shared vocabulary across IT, business, and product teams.' },
  { t:'Eliminate Technical Debt',  d:'Organizations with bespoke data models value not needing to maintain custom tables. CSDM eliminates that ongoing maintenance burden.' },
  { t:'Greater Out-of-Box Use',    d:'ServiceNow products are architecting to CSDM. Non-compliant implementations receive reduced product value.' },
  { t:'Future-Proof',              d:'As ServiceNow adds new functionality, CSDM is the data model that will be expanded. Compliant implementations automatically benefit.' },
  { t:'AI Readiness',              d:'CSDM 5 creates the AI governance chain. Without CSDM-compliant data, AI agents, Now Assist, and AI Search cannot deliver full value. Clean CSDM data = better AI.' },
  { t:'Cross-Product Integration', d:'EA, Service Mapping, ITAM, SAM, and CSM all depend on the same CSDM objects. Compliance enables Better Together use cases.' },
]

export default function OverviewTab() {
  return (
    <div className="tpanel on" id="ep-overview" role="tabpanel">
      <div className="fam-hdr fade-in">
        <h2><Icon name="doc" size={16} /> CSDM 5 — White Paper</h2>
        <span className="fam-ct">Complete Reference</span>
      </div>
      <p className="sec-lede">
        The <strong>Common Service Data Model (CSDM)</strong> is a standard and shared set of service-related
        definitions across ServiceNow products and the ServiceNow AI Platform.{' '}
        <strong>CSDM is not a product or SKU</strong> — it is guidance for standardizing and modeling the CMDB
        that multiple products depend on. All objects and core tables are provided OOB regardless of licensing.
        CSDM 5 matures to enable sophisticated generative AI and business transformation — building the{' '}
        <strong>Digital Value Network</strong>.
      </p>
      <p style={{ fontSize: 'var(--fs-body)', color: 'var(--text-m)', fontWeight: 300, lineHeight: 1.75, marginBottom: '1.25rem', maxWidth: '640px' }}>
        End-to-end lifecycle: A new idea enters{' '}
        <span style={{ color: 'var(--ci)', fontWeight: 600 }}>Ideation &amp; Strategy</span> →{' '}
        <span style={{ color: 'var(--cd)', fontWeight: 600 }}>Design &amp; Planning</span> →{' '}
        <span style={{ color: 'var(--cb)', fontWeight: 600 }}>Build &amp; Integration</span> →{' '}
        <span style={{ color: 'var(--cde)', fontWeight: 600 }}>Service Delivery</span> →{' '}
        <span style={{ color: 'var(--cc)', fontWeight: 600 }}>Service Consumption</span>.{' '}
        <span style={{ color: 'var(--cp)', fontWeight: 600 }}>Manage Portfolio</span> spans all five stages.{' '}
        <span style={{ color: 'var(--cf)', fontWeight: 600 }}>Foundation</span> supports everything.
      </p>

      <div className="sec-hd">What Is New in CSDM 5</div>
      <div className="wn-grid">
        {WN.map(w => (
          <div key={w.t} className="wn-c fade-in">
            <div className="wn-t">{w.t}</div>
            <div className="wn-d">{w.d}</div>
          </div>
        ))}
      </div>

      <div className="sec-hd">10 Key Principles</div>
      <div className="pr-grid">
        {PR.map(p => (
          <div key={p.n} className="pr-c fade-in">
            <div className="pr-n">{p.n}</div>
            <div><div className="pr-t">{p.t}</div><div className="pr-d">{p.d}</div></div>
          </div>
        ))}
      </div>

      <div className="sec-hd">Why Follow CSDM?</div>
      <div className="wn-grid">
        {WHY.map(w => (
          <div key={w.t} className="wn-c fade-in">
            <div className="wn-t">{w.t}</div>
            <div className="wn-d">{w.d}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
