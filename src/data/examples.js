// ── EXAMPLE CARDS (displayed in the grid) ────────────────────────────────────
export const EXAMPLES = [
  { id:'sn',  ico:'cloud',    icoBg:'rgba(82,184,255,.12)', icoColor:'var(--blue)',
    nm:'ServiceNow Platform',    depl:'SaaS / Platform Host', deplTag:'saas host', ind:'Technology',         indTag:'tech',
    mat:'Run / Fly', desc:'Platform Host with multiple Platform Apps. Each app has its own Service Instance that depends on the shared platform host instance.' },
  { id:'sap', ico:'database', icoBg:'rgba(251,191,36,.1)',  icoColor:'var(--warn)',
    nm:'SAP S/4HANA ERP',        depl:'On-Premise',           deplTag:'onprem',     ind:'Technology',         indTag:'tech',
    mat:'Run',     desc:'On-prem ERP with Platform Host/App model. Geography-based TMSOs for single or multi-location configurations.' },
  { id:'epic',ico:'chart',    icoBg:'rgba(248,113,113,.1)', icoColor:'var(--err)',
    nm:'EPIC Healthcare',         depl:'SaaS / Platform Host', deplTag:'saas host',  ind:'Healthcare',         indTag:'health',
    mat:'Run',     desc:'SaaS clinical platform. No infrastructure CIs. Each clinical module maps to its own Service Instance.' },
  { id:'o365',ico:'layers',   icoBg:'rgba(82,184,255,.1)',  icoColor:'var(--blue)',
    nm:'Microsoft O365',          depl:'SaaS',                 deplTag:'saas',       ind:'Technology',         indTag:'tech',
    mat:'Fly',     desc:'SaaS collaboration platform. Capability-aligned service model with optional on-prem Exchange and Active Directory.' },
  { id:'gw',  ico:'shield',   icoBg:'rgba(74,222,128,.1)',  icoColor:'var(--ok)',
    nm:'Guidewire Insurance',     depl:'SaaS / Multi-location',deplTag:'saas multi', ind:'Financial Services',  indTag:'finance',
    mat:'Run',     desc:'Insurance SaaS with multiple geographic environments. Offerings stratified by geography and SLA.' },
  { id:'sw',  ico:'cog',      icoBg:'rgba(255,255,255,.06)',icoColor:'var(--text-m)',
    nm:'SolidWorks / PDM',        depl:'Client/Server',        deplTag:'cs',         ind:'Manufacturing',      indTag:'mfg',
    mat:'Fly',     desc:'Client/server CAD platform. Infrastructure CIs with Dynamic CI Groups for servers, SQL instances, and network gear.' },
  { id:'sf',  ico:'cloud',    icoBg:'rgba(82,184,255,.1)',  icoColor:'var(--blue)',
    nm:'Salesforce',              depl:'SaaS',                 deplTag:'saas',       ind:'Technology',         indTag:'tech',
    mat:'Fly',     desc:'SaaS CRM with full business capability alignment. Production org and sandboxes as Service Instances.' },
  { id:'dyn', ico:'database', icoBg:'rgba(251,191,36,.1)',  icoColor:'var(--warn)',
    nm:'Microsoft Dynamics',      depl:'On-Premise',           deplTag:'onprem',     ind:'Technology',         indTag:'tech',
    mat:'Run',     desc:'On-premises CRM with SQL Server backend. Dynamic CI Groups map Windows Servers and SQL instances.' },
  { id:'msp', ico:'briefcase',icoBg:'rgba(118,97,255,.1)',  icoColor:'var(--indigo)',
    nm:'MSP — Managed Service Provider', depl:'MSP / CSM',     deplTag:'msp',        ind:'Technology',         indTag:'tech',
    mat:'Fly',     desc:'MSP + CSM integration pattern. Sold Products link client accounts to offerings. Install Base Items track monitored CIs per client.' },
]

// ── ENTITY CHAIN MODELS (visual diagram data) ─────────────────────────────────
// design: { bcap[], bapp_host, bapp_apps[] }
// delivery: { si_host, si_apps[], tmo[], tms[], dcig[], infra[] }
// consumption: { bso[], bs[], sport[], csm? }
export const EX_MODELS = {
  sn: {
    design: {
      bcap: [],
      bapp_host: 'ServiceNow Platform (Platform Host) SaaS',
      bapp_apps: ['SN Event Mgmt SaaS','SN Incident SaaS','SN IRM SaaS','SN Employee Svc Mgmt SaaS','SN Financial Svc Mgmt SaaS'],
    },
    delivery: {
      si_host: 'SN Yokohama Prod',
      si_apps: ['SN Event Mgmt Prod','SN Incident Mgmt Prod','SN IRM Prod','SN Employee Svc Mgmt Prod'],
      tmo: ['ServiceNow Administration','System Monitoring'],
      tms: ['Application Mgmt Services','Monitoring Services'],
      dcig: [], infra: [],
    },
    consumption: {
      bso: ['SN Incident Mgmt','SN Enterprise Architecture Mgmt','SN Onboarding','SN Finance Mgmt'],
      bs: ['End User Services','Enterprise Architectural Services','Risk Management Services','HR Services','Financial Services'],
      sport: ['Strategy & Vision Portfolio','Technology Portfolio','HR Portfolio','Financial Mgmt Portfolio'],
    },
  },
  sap: {
    design: {
      bcap: [],
      bapp_host: 'SAP S/4HANA ERP (Host)',
      bapp_apps: ['SAP Finance (App)','SAP Transportation Mgmt (App)'],
    },
    delivery: {
      si_host: 'SAP S/4HANA ERP Prod',
      si_apps: ['SAP Finance Prod','SAP Transportation Mgmt Prod'],
      tmo: ['SAP Administration','SAP Administration US','SAP Administration EMEA'],
      tms: ['Application Management Services'],
      dcig: [], infra: [],
    },
    consumption: {
      bso: ['SAP Finance Group Reporting','SAP Transportation Mgmt Support'],
      bs: ['Accounting Services','Fleet and Logistics Services'],
      sport: [],
    },
  },
  epic: {
    design: {
      bcap: [],
      bapp_host: 'EPIC Hyperspace EHR (Platform Host) SaaS',
      bapp_apps: ['MyChart — Patient Portal','Beaker — Laboratory','Radiant — Radiology','OpTime — Surgery'],
    },
    delivery: {
      si_host: 'EPIC Hyperspace Prod',
      si_apps: ['MyChart Prod','Beaker Prod','Radiant Prod','OpTime Prod'],
      tmo: ['EPIC Administration','Clinical Systems Monitoring'],
      tms: ['Application Mgmt Services','Clinical Systems Support'],
      dcig: [], infra: [],
    },
    consumption: {
      bso: ['Patient Portal Services','Laboratory Information Services','Radiology Services'],
      bs: ['Clinical Services','Patient Experience Services','Diagnostic Services'],
      sport: [],
    },
  },
  o365: {
    design: {
      bcap: ['Manage Communications','Manage Collaboration','Manage Identity & Access'],
      bapp_host: 'Microsoft O365 (Platform Host) SaaS',
      bapp_apps: ['Exchange Online','SharePoint Online','Microsoft Teams','OneDrive','Microsoft Entra ID'],
    },
    delivery: {
      si_host: 'O365 Production Tenant',
      si_apps: ['Exchange Online Prod','Teams Prod','SharePoint Prod','Entra ID Prod'],
      tmo: ['O365 Administration','Microsoft Support'],
      tms: ['Application Mgmt Services','Collaboration Services'],
      dcig: [], infra: [],
    },
    consumption: {
      bso: ['Email Services','Collaboration Services','Identity Management'],
      bs: ['Productivity Services','Collaboration Services','Identity Services'],
      sport: [],
    },
  },
  gw: {
    design: {
      bcap: [],
      bapp_host: 'Guidewire Insurance Suite (Host)',
      bapp_apps: ['GuideWire Claims Center','GuideWire Billing Center','GuideWire Policy Center'],
    },
    delivery: {
      si_host: 'GuideWire Insurance Suite Prod',
      si_apps: ['Claims Center DEV UK','Claims Center DEV NY','Claims Center EMEA','Claims Center NY PROD'],
      tmo: ['Guidewire Development Global','Guidewire Support EMEA','Guidewire Support US'],
      tms: ['Application Mgmt Services'],
      dcig: [], infra: [],
    },
    consumption: {
      bso: ['Claims Processing EMEA','Claims Processing US'],
      bs: ['Claims Processing Services'],
      sport: [],
    },
  },
  sw: {
    design: {
      bcap: ['Manage Technology','Manage Products'],
      bapp_host: 'SolidWorks PDM (Platform Host)',
      bapp_apps: ['SolidWorks (Client App)','SQL Database (Backend App)'],
    },
    delivery: {
      si_host: 'SolidWorks PDM Prod',
      si_apps: [],
      tmo: ['SolidWorks Administration','Database Administration','Network Administration','Windows Administration'],
      tms: ['Application Mgmt Services','Database Services','Network Services','Compute/Hosting Services'],
      dcig: ['All Windows Servers (Query)','MSSQL Apps (Query)','Network Gear (Query)'],
      infra: ['SolidWorks Archive Server','SolidWorks License Server','MSSQL@server123','Router01','Switch1001'],
    },
    consumption: {
      bso: ['Product Design Services','SolidWorks Service Desk'],
      bs: ['Product Prototyping Services'],
      sport: [],
    },
  },
  sf: {
    design: {
      bcap: ['Manage Customer Relationships','Manage Sales Pipeline','Manage Marketing Campaigns'],
      bapp_host: null,
      bapp_apps: ['Salesforce Sales Cloud','Salesforce Service Cloud','Salesforce Marketing Cloud'],
    },
    delivery: {
      si_host: null,
      si_apps: ['Salesforce Production Org','Salesforce Full Sandbox','Salesforce Dev Sandbox'],
      tmo: ['Salesforce Administration','Salesforce Support'],
      tms: ['Application Mgmt Services','CRM Services'],
      dcig: [], infra: [],
    },
    consumption: {
      bso: ['Sales Management','Customer Service Management','Marketing Automation'],
      bs: ['Sales Services','Customer Support Services','Marketing Services'],
      sport: [],
    },
  },
  dyn: {
    design: {
      bcap: [],
      bapp_host: null,
      bapp_apps: ['Microsoft Dynamics CRM 2016'],
    },
    delivery: {
      si_host: null,
      si_apps: ['Dynamics CRM Prod','Dynamics CRM Dev'],
      tmo: ['CRM Administration','SQL Administration','Windows Server Administration'],
      tms: ['Application Mgmt Services','Database Services','Compute/Hosting Services'],
      dcig: ['Windows Servers (Query)','MSSQL Apps (Query)'],
      infra: ['CRM App Server','MSSQL@CRM-server','Windows Server'],
    },
    consumption: {
      bso: ['Customer Relationship Management Services'],
      bs: ['Customer Management Services'],
      sport: [],
    },
  },
  msp: {
    design: {
      bcap: ['Manage Technology'],
      bapp_host: null,
      bapp_apps: ['LogicMonitor (Monitoring Platform SaaS)'],
    },
    delivery: {
      si_host: null,
      si_apps: ['LogicMonitor Prod'],
      tmo: ['ServiceNow Administration','System Monitoring — LogicMonitor Admin'],
      tms: ['Application Mgmt Services','Monitoring Services'],
      dcig: [],
      infra: ['Server 01 (Client Asset + CI)','Server 02 (Client Asset + CI)'],
    },
    consumption: {
      bso: ['Server Monitoring','Network Monitoring'],
      bs: ['Monitoring Services'],
      sport: [],
      csm: {
        service_model: 'Server Monitoring Service Model',
        sold_product: 'Client — Platinum Server Monitoring',
        install_base: ['Client Server 01','Client Server 02'],
      },
    },
  },
}
