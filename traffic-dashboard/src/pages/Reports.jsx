import { Download } from 'lucide-react'
import Filters from '../components/Filters'; import StatCard from '../components/StatCard'; import { byType, byDay } from '../utils/incidentFilters'; import { AlertTriangle, CalendarDays } from 'lucide-react'
const COLS = ['id', 'event_type', 'latitude', 'longitude', 'timestamp', 'bus_id', 'confidence', 'status', 'location_name']
function exportCsv(items) {
  const esc = v => `"${String(v ?? '').replace(/"/g, '""')}"`
  const csv = [COLS.join(','), ...items.map(i => COLS.map(c => esc(i[c])).join(','))].join('\n')
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'incidents.csv'; a.click(); URL.revokeObjectURL(a.href)
}
export default function Reports({ items, f, setF }) {
  const t = byType(items), d = byDay(items), peak = [...d].sort((a, b) => b.count - a.count)[0]
  return <><Filters f={f} setF={setF} /><div className="grid3"><StatCard icon={AlertTriangle} label="Total incidents" value={items.length} /><StatCard icon={CalendarDays} label="Days covered" value={d.length} color="#16a34a" /><StatCard icon={CalendarDays} label="Peak day" value={peak ? `${peak.date} (${peak.count})` : '—'} color="#f97316" /></div>
    <div className="card"><div className="row"><h3>Incidents by category</h3><button className="btn" disabled={!items.length} onClick={() => exportCsv(items)}><Download size={16} /> Export CSV ({items.length})</button></div>
      <table><thead><tr><th>Category</th><th>Count</th><th>Share</th></tr></thead><tbody>{t.map(r => <tr key={r.key}><td>{r.name}</td><td>{r.value}</td><td>{Math.round(r.value / items.length * 100)}%</td></tr>)}</tbody></table></div></>
}
