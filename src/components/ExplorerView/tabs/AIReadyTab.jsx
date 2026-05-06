import { Icon } from '../../../data'

const AIC = [
  { nm:'AI Digital Asset — Build Domain', ico:'sparkle', tag:'new',
    b:'Formal AI Digital Asset class (alm_ai_digital_asset) tracking AI/GenAI software components through the build pipeline. Sub-types: AI System Digital Asset, AI Model Digital Asset (LLMs, ML, SLMs), AI Dataset Digital Asset (source, training, validation), AI Prompt Digital Asset.',
    tbl:'alm_ai_system_digital_asset · alm_ai_model_digital_asset · alm_ai_dataset_digital_asset · alm_ai_prompt_digital_asset',
    impact:'Full AI lifecycle governance from build to production. Supports AI Control Tower (AICT) and CSO posture requirements.' },
  { nm:'AI Function — Cloud AI SaaS', ico:'sparkle', tag:'new',
    b:'AI Function (cmdb_ci_function_ai) represents AI SaaS deployed on public cloud — scalable, on-demand ML, data processing, and AI-driven services.',
    tbl:'cmdb_ci_function_ai',
    impact:'Govern cloud AI consumption with full ITSM impact analysis and service ownership.' },
  { nm:'AI Application — On-Prem / Container AI', ico:'ai', tag:'new',
    b:'AI Application (cmdb_ci_appl_ai_application) represents AI software running on Linux, Windows, Docker, or Kubernetes. First-class CMDB CI — discoverable, mappable, subject to full ITSM.',
    tbl:'cmdb_ci_appl_ai_application (extends cmdb_ci_appl)',
    impact:'Critical for Now Assist governance, AI Control Tower, and RSK0001195 Now Assist stewardship risk mitigation.' },
  { nm:'Data Service Instance — AI/ML Pipelines', ico:'cloud', tag:'new',
    b:'Data Service Instance (cmdb_ci_data_service_instance) represents deployed instances of data services including AI/ML services: pipelines, LLM inference endpoints, model training orchestration.',
    tbl:'cmdb_ci_data_service_instance',
    impact:'Enables ITSM Incident, Problem, and Change management for AI/ML infrastructure at full maturity.' },
  { nm:'AI System Product Models — Foundation', ico:'package', tag:'new',
    b:'Two new product model types: AI System Product Model and AI Content Product Model. Treat AI systems as first-class versioned products with full lifecycle tracking.',
    tbl:'cmdb_ai_system_product_model · cmdb_ai_content_product_model',
    impact:'AI systems governed as products with EOL tracking, vendor support timelines, and compatibility management.' },
  { nm:'Knowledge as AI Training Ground', ico:'book', tag:'enhanced',
    b:'In CSDM 5, Knowledge is elevated to a strategic AI data element. AI Agents use knowledge articles to learn — making knowledge quality directly linked to AI performance.',
    tbl:'kb_knowledge',
    impact:'Knowledge governance is now AI governance. A poorly maintained knowledge base directly degrades Now Assist and AI Search.' },
  { nm:'SBOM for AI Supply Chain Security', ico:'shield', tag:'new',
    b:'SBOM (sn_sbom_core, FREE on Store) enables a detailed inventory of all AI system components — ML libraries, model weights, data processing dependencies, and prompt templates.',
    tbl:'sn_sbom_doc (sn_sbom_core — FREE on ServiceNow Store)',
    impact:'Required for CSO posture and compliance with EU AI Act, NIST AI RMF. Directly supports AT&T RSK0001195.' },
  { nm:'Ideation & Strategy — AI Governance Entry Point', ico:'lightbulb', tag:'ai-govn',
    b:'The new Ideation & Strategy domain enables formal tracking of AI use cases as Product Ideas, aligned to Strategic Priorities. Creates the full governance chain from use case capture to deployment.',
    tbl:'sn_align_core_product_idea · sn_align_core_planning_item · sn_gf_plan · sn_gf_strategy',
    impact:"Enables the 'Permit to Build/Learn/Operate' governance language. Directly supports AI Control Tower (AICT) governance alignment." },
]

const AI_CLASSES = ['GPU','LLM / AI Model Digital Asset','AI Application','AI Function','Data Service Instance','AI System Product Model','SBOM (FREE)']

export default function AIReadyTab() {
  return (
    <div className="tpanel on" id="ep-ai" role="tabpanel">
      <div className="ai-band fade-in">
        <div className="ai-ey">CSDM 5 · AI Governance Chain</div>
        <h2 className="ai-ht">
          <Icon name="sparkle" size={22} />{' '}AI Ready <em>Services</em>
        </h2>
        <p className="ai-hb">
          CSDM 5 introduces a complete end-to-end AI governance chain. New classes — GPU, LLM, AI Application,
          AI Function — make AI workloads first-class CMDB citizens: discoverable, manageable, and subject to full
          ITSM impact analysis.
        </p>
        <div className="ai-classes">
          {AI_CLASSES.map(c => (
            <span key={c} className="ai-cls"><Icon name="sparkle" size={10} /> {c}</span>
          ))}
        </div>
      </div>

      <div className="ai-grid">
        {AIC.map(c => {
          const tag = c.tag === 'new'
            ? <span className="ai-new-tag"><Icon name="sparkle" size={8} /> NEW</span>
            : c.tag === 'enhanced'
            ? <span className="ai-enh-tag">ENHANCED</span>
            : <span className="ai-enh-tag">AI GOVN</span>
          return (
            <div key={c.nm} className="aic fade-in">
              <div className="aic-hd">
                <div>
                  <div style={{ marginBottom: 4 }}>{tag}</div>
                  <div className="aic-nm">{c.nm}</div>
                </div>
                <div className="aic-ico"><Icon name={c.ico} size={22} /></div>
              </div>
              <p className="aic-b">{c.b}</p>
              <div className="aic-tbl">{c.tbl}</div>
              <div className="aic-impact"><Icon name="arrow" size={11} /> {c.impact}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
