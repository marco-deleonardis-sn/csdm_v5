# CSDM 5 Interactive Reference

React 18 + Vite rewrite of the CSDM 5 single-file HTML application.

## One-time setup

```bash
# 1. Clone your GitHub repo (or initialize a new one)
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# 2. Copy all files from this project into the repo root
# (replace index.html if one exists)

# 3. Install dependencies
npm install

# 4. Update vite.config.js base path to match your GitHub Pages URL
#    If your site is at https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
#    → base: '/YOUR_REPO_NAME/'
#    If it's at https://YOUR_USERNAME.github.io/ (custom domain or root)
#    → base: '/'
```

## Development

```bash
npm run dev
# Open http://localhost:5173
```

## GitHub Pages deployment

### Option A — GitHub Actions (recommended, automatic)

1. Push to `main` → GitHub Actions builds and deploys automatically.
2. In your repo: **Settings → Pages → Source: GitHub Actions**
3. That's it. Every push to `main` triggers a redeploy.

### Option B — Manual deploy with gh-pages

```bash
npm run deploy
# Builds dist/ and pushes to gh-pages branch
```

In your repo: **Settings → Pages → Source: Deploy from branch → gh-pages → / (root)**

## Project structure

```
src/
├── main.jsx              # React entry point
├── App.jsx               # Root component — wires everything together
├── styles/
│   └── global.css        # All CSS (ported from HTML file, same token system)
├── context/
│   └── AppContext.jsx     # Global state — theme, view, open panels, all app state
├── data/
│   ├── icons.js           # SVG icon renderer + all icon maps
│   ├── domains.js         # Domain config, descriptions, AI notes
│   ├── entities.js        # All 35+ CSDM 5 entities
│   ├── roles.js           # All 15 CSDM roles and personas
│   ├── journey.js         # Crawl/Walk/Run/Fly stage data
│   ├── examples.js        # 9 real-world examples + entity chain models
│   ├── relationships.js   # Full relationship table + pill styles
│   └── index.js           # Barrel re-export
└── components/
    ├── Header.jsx          # Sticky header — theme + view toggles
    ├── DiagramView/
    │   ├── index.jsx       # Hero, chips bar, domain grid
    │   └── EntityChip.jsx  # Individual entity button
    ├── ExplorerView/
    │   ├── index.jsx       # Tab nav, search, panel routing
    │   └── tabs/
    │       ├── OverviewTab.jsx       # What's New, Principles, Why CSDM
    │       ├── AIReadyTab.jsx        # AI governance chain
    │       ├── RolesTab.jsx          # Role cards grid
    │       ├── JourneyTab.jsx        # Crawl/Walk/Run/Fly stepper
    │       ├── ExamplesTab.jsx       # Real-world examples with filters
    │       ├── RelationshipsTab.jsx  # Entity relationship browser
    │       └── DomainTab.jsx         # Reused for all 7 domain tabs
    └── panels/
        ├── EntityDetailPanel.jsx     # Slide-in entity detail (ESC to close)
        ├── ExampleModal.jsx          # Full-width entity chain model overlay
        └── RoleSheet.jsx             # Bottom sheet role detail
```

## Adding new content

**New entity:** Add an object to `src/data/entities.js` → ENT array.

**New example:** Add to `src/data/examples.js` EXAMPLES array + a matching key in EX_MODELS.

**New relationship:** Add to `src/data/relationships.js` REL_ENTS array.

**New journey stage:** Add to `src/data/journey.js` J_STAGES array and J_STAGE_ORDER.

No component changes required — all tabs read from the data files.

## Tech stack

- React 18.3 (functional components, hooks only)
- Vite 5.4 (build + dev server)
- No external UI library — same CSS token system as the original HTML
- gh-pages or GitHub Actions for deployment

## Credits

CSDM 5 White Paper by Scott Lemm & Rob Koeten — ServiceNow 2025.
Interactive reference created by Marco De Leonardis, Principal Platform Architect,
ServiceNow Customer Excellence Group.
