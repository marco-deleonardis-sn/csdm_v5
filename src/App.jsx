import { useApp, AppProvider } from './context/AppContext'
import Header from './components/Header'
import DiagramView from './components/DiagramView'
import ExplorerView from './components/ExplorerView'
import EntityDetailPanel from './components/panels/EntityDetailPanel'
import ExampleModal from './components/panels/ExampleModal'
import RoleSheet from './components/panels/RoleSheet'

function AppShell() {
  const { state } = useApp()

  return (
    <div className="app-root" data-view={state.view}>
      <Header />

      <main>
        {state.view === 'diagram' && <DiagramView />}
        {state.view === 'explorer' && <ExplorerView />}
      </main>

      {/* Panels rendered outside main — always in DOM, controlled by state */}
      <EntityDetailPanel />
      <ExampleModal />
      <RoleSheet />

      <footer className="app-footer" role="contentinfo">
        <p className="footer-author">
          Created by Marco De Leonardis&nbsp;&nbsp;|&nbsp;&nbsp;Principal Platform Architect&nbsp;&nbsp;|&nbsp;&nbsp;ServiceNow Customer Excellence Group
        </p>
        <p className="footer-source">
          Based on CSDM 5 White Paper by Scott Lemm &amp; Rob Koeten &middot; ServiceNow 2025
        </p>
        <p className="footer-legal">
          &copy; 2026 ServiceNow, Inc. ServiceNow, the ServiceNow logo, Now, ServiceNow AI Platform, and other ServiceNow marks are trademarks and/or registered trademarks of ServiceNow, Inc. in the United States and/or other countries. Other company and product names may be trademarks of the respective companies with which they are associated.
        </p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
