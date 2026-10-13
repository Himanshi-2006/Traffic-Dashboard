import { LayoutDashboard, Map, AlertTriangle, BarChart3, Flame, FileText, Bus } from 'lucide-react'
export const NAV = [['overview', 'Overview', LayoutDashboard], ['map', 'GIS Incident Map', Map], ['incidents', 'Road Incidents', AlertTriangle], ['analytics', 'Traffic Analytics', BarChart3], ['hotspots', 'Congestion Hotspots', Flame], ['reports', 'Reports', FileText]]
export default function Sidebar({ page, setPage, open }) {
  return <aside className={'sidebar' + (open ? ' open' : '')}><div className="brand"><Bus /> RoadWatch</div>
    {NAV.map(([k, l, Icon]) => <button key={k} className={page === k ? 'on' : ''} onClick={() => setPage(k)}><Icon size={18} />{l}</button>)}</aside>
}
