import { AlertTriangle, Construction, Route, Siren, Flame, Bus } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import StatCard from '../components/StatCard'; import IncidentMap from '../components/IncidentMap'; import IncidentTable from '../components/IncidentTable'
import { byDay, byType, hotspots } from '../utils/incidentFilters'; import { fmtTime, typeInfo, place } from '../utils/formatters'
export default function Dashboard({ items, onView, onMap, selected, setSelected, goMap }) {
  const n = t => items.filter(i => i.event_type === t).length, types = byType(items), days = byDay(items)
  const recent = [...items].sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1))
  return <>
    <div className="grid6">
      <StatCard icon={AlertTriangle} label="Total incidents" value={items.length} />
      <StatCard icon={Construction} label="Potholes detected" value={n('pothole')} color="#ef4444" />
      <StatCard icon={Route} label="Road damage reports" value={n('road_damage')} color="#f97316" />
      <StatCard icon={Siren} label="Accident alerts" value={n('accident')} color="#991b1b" />
      <StatCard icon={Flame} label="Congestion hotspots" value={hotspots(items).length} color="#eab308" />
      <StatCard icon={Bus} label="Buses reporting" value={new Set(items.map(i => i.bus_id).filter(Boolean)).size} color="#16a34a" />
    </div>
    <div className="card"><div className="row"><h3>Incident map preview</h3><button className="btn ghost" onClick={goMap}>Open full map</button></div><IncidentMap items={items} selected={selected} onSelect={setSelected} height={300} legend={false} /></div>
    <div className="cols2">
      <div className="card"><h3>Incidents per day</h3><div className="chart"><ResponsiveContainer><LineChart data={days}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis allowDecimals={false} /><Tooltip /><Line dataKey="count" stroke="#2563eb" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></div>
      <div className="card"><h3>Incident distribution</h3><div className="chart"><ResponsiveContainer><PieChart><Pie data={types} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85}>{types.map(t => <Cell key={t.key} fill={t.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></div>
    </div>
    <div className="cols2">
      <div className="card"><h3>Type breakdown</h3>{types.map(t => <div key={t.key} className="bar"><span>{t.name}</span><div><i style={{ width: (t.value / items.length) * 100 + '%', background: t.color }} /></div><b>{t.value}</b></div>)}</div>
      <div className="card"><h3>Recent activity</h3><ul className="feed">{recent.slice(0, 6).map(i => <li key={i.id}><i style={{ background: typeInfo(i.event_type).color }} /><span><b>{typeInfo(i.event_type).label}</b> at {place(i)} <small>{i.bus_id} · {fmtTime(i.timestamp)}</small></span></li>)}</ul></div>
    </div>
    <div className="card"><h3>Recent incidents</h3><IncidentTable items={recent.slice(0, 6)} onView={onView} onMap={onMap} paginate={false} /></div>
  </>
}
