import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Filters from '../components/Filters'; import IncidentMap from '../components/IncidentMap'; import StatCard from '../components/StatCard'; import { Empty } from '../components/States'
import { hotspots } from '../utils/incidentFilters'; import { Flame, MapPin, Hash } from 'lucide-react'
export default function Hotspots({ items, f, setF }) {
  const h = hotspots(items)
  return <><Filters f={f} setF={setF} status={false} /><div className="grid3">
    <StatCard icon={Flame} label="Hotspots (≥3 reports in ~500 m cell)" value={h.length} color="#ef4444" /><StatCard icon={MapPin} label="Top hotspot" value={h[0]?.name || '—'} color="#f97316" /><StatCard icon={Hash} label="Reports in top hotspot" value={h[0]?.count ?? 0} color="#eab308" /></div>
    <div className="cols2"><div className="card"><h3>Hotspot map</h3><IncidentMap items={items} hot={h} height={380} legend={false} /></div>
      <div className="card"><h3>Incident frequency by location</h3>{h.length ? <div className="chart" style={{ height: 380 }}><ResponsiveContainer><BarChart data={h} layout="vertical" margin={{ left: 40 }}><XAxis type="number" allowDecimals={false} /><YAxis type="category" dataKey="name" width={130} /><Tooltip /><Bar dataKey="count" fill="#ef4444" /></BarChart></ResponsiveContainer></div> : <Empty text="No hotspots for this selection." />}</div></div></>
}
