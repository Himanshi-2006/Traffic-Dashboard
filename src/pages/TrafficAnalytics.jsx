import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import Filters from '../components/Filters'; import { Empty } from '../components/States'
import { byDay, byType, countBy } from '../utils/incidentFilters'; import { place } from '../utils/formatters'
const Box = ({ title, note, data, children }) => <div className="card"><h3>{title}</h3>{note && <small className="muted">{note}</small>}{data.length ? <div className="chart"><ResponsiveContainer>{children}</ResponsiveContainer></div> : <Empty text="No data for this selection." />}</div>
export default function TrafficAnalytics({ items, f, setF }) {
  const cong = items.filter(i => i.event_type === 'congestion')
  const veh = Object.entries(cong.reduce((m, i) => { if (Number.isFinite(i.vehicle_count)) { const d = i.timestamp.slice(5, 10); m[d] = (m[d] || 0) + i.vehicle_count } return m }, {})).sort().map(([date, vehicles]) => ({ date, vehicles }))
  const dens = byDay(cong), loc = Object.entries(countBy(cong, place)).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
  const grid = <CartesianGrid strokeDasharray="3 3" />
  return <><Filters f={f} setF={setF} status={false} /><div className="cols2">
    <Box title="Vehicle counts over time" note="Sum of vehicle_count on congestion reports" data={veh}><LineChart data={veh}>{grid}<XAxis dataKey="date" /><YAxis /><Tooltip /><Line dataKey="vehicles" stroke="#2563eb" strokeWidth={2} /></LineChart></Box>
    <Box title="Traffic density over time" note="Congestion reports per day" data={dens}><LineChart data={dens}>{grid}<XAxis dataKey="date" /><YAxis allowDecimals={false} /><Tooltip /><Line dataKey="count" stroke="#eab308" strokeWidth={2} /></LineChart></Box>
    <Box title="Congestion by location" data={loc}><BarChart data={loc}>{grid}<XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="count" fill="#3b82f6" /></BarChart></Box>
    <Box title="Incident counts by type" data={byType(items)}><BarChart data={byType(items)}>{grid}<XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" fill="#2563eb" /></BarChart></Box>
    <Box title="Incident trend by day" data={byDay(items)}><LineChart data={byDay(items)}>{grid}<XAxis dataKey="date" /><YAxis allowDecimals={false} /><Tooltip /><Line dataKey="count" stroke="#ef4444" strokeWidth={2} /></LineChart></Box></div></>
}
