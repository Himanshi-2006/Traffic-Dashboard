import { useState, useEffect, useMemo, useCallback } from 'react'
import Sidebar from './components/Sidebar'; import Header from './components/Header'; import { Loading, ErrorState, Empty } from './components/States'; import IncidentDetail from './components/IncidentDetail'
import Dashboard from './pages/Dashboard'; import GISMap from './pages/GISMap'; import Incidents from './pages/Incidents'; import TrafficAnalytics from './pages/TrafficAnalytics'; import Hotspots from './pages/Hotspots'; import Reports from './pages/Reports'
import { getIncidents, USE_MOCK } from './services/api'; import { filterIncidents } from './utils/incidentFilters'
const EMPTY = { q: '', type: '', status: '', from: '', to: '' }
export default function App() {
  const [page, setPage] = useState('overview'), [menu, setMenu] = useState(false), [data, setData] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState(null)
  const [f, setF] = useState(EMPTY), [selected, setSelected] = useState(null), [view, setView] = useState(null)
  const load = useCallback(() => { setLoading(true); setError(null); getIncidents().then(setData).catch(e => setError(e.message)).finally(() => setLoading(false)) }, [])
  useEffect(load, [load])
  const items = useMemo(() => filterIncidents(data, f), [data, f])
  const showOnMap = i => { setSelected(i); setPage('map') }
  const nav = p => { setPage(p); setMenu(false) }
  const common = { items, f, setF }
  let body
  if (loading) body = <Loading />
  else if (error) body = <ErrorState message={error} onRetry={load} />
  else if (!data.length) body = <Empty text="The backend returned no incidents yet." />
  else body = { overview: <Dashboard {...common} onView={setView} onMap={showOnMap} selected={selected} setSelected={setSelected} goMap={() => nav('map')} />, map: <GISMap {...common} selected={selected} setSelected={setSelected} />, incidents: <Incidents {...common} onMap={showOnMap} />, analytics: <TrafficAnalytics {...common} />, hotspots: <Hotspots {...common} />, reports: <Reports {...common} /> }[page]
  return <div className="app"><Sidebar page={page} setPage={nav} open={menu} />
    <div className="main"><Header q={f.q} setQ={q => setF({ ...f, q })} onRefresh={load} onMenu={() => setMenu(!menu)} alerts={data.filter(i => i.event_type === 'accident').length} />
      {USE_MOCK && <div className="banner">Demo mode: showing synthetic sample data, not real detections. Set VITE_USE_MOCK=false to use the backend.</div>}
      <main className="content">{body}</main></div><IncidentDetail i={view} onClose={() => setView(null)} onMap={i => { setView(null); showOnMap(i) }} /></div>
}
