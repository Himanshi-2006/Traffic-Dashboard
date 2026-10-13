import { useState } from 'react'
import { Eye, MapPin } from 'lucide-react'
import { typeInfo, fmtTime, pct, place } from '../utils/formatters'
import { Empty } from './States'
const COLS = [['id', 'Incident ID'], ['event_type', 'Type'], ['location_name', 'Location'], ['timestamp', 'Detected'], ['bus_id', 'Bus'], ['confidence', 'Confidence'], ['status', 'Status']]
export const Badge = ({ type }) => <span className="badge" style={{ background: typeInfo(type).color + '22', color: typeInfo(type).color }}>{typeInfo(type).label}</span>
export default function IncidentTable({ items, onView, onMap, pageSize = 8, paginate = true }) {
  const [sort, setSort] = useState({ k: 'timestamp', d: -1 }), [p, setP] = useState(0)
  if (!items.length) return <Empty />
  const rows = [...items].sort((a, b) => (a[sort.k] > b[sort.k] ? 1 : a[sort.k] < b[sort.k] ? -1 : 0) * sort.d)
  const pages = Math.ceil(rows.length / pageSize), cur = Math.min(p, pages - 1), shown = paginate ? rows.slice(cur * pageSize, (cur + 1) * pageSize) : rows
  return <><div className="tablewrap"><table><thead><tr>{COLS.map(([k, l]) => <th key={k} onClick={() => setSort({ k, d: sort.k === k ? -sort.d : 1 })}>{l}{sort.k === k ? (sort.d > 0 ? ' ▲' : ' ▼') : ''}</th>)}<th>Actions</th></tr></thead>
    <tbody>{shown.map(i => <tr key={i.id}><td>{i.id}</td><td><Badge type={i.event_type} /></td><td>{place(i)}</td><td>{fmtTime(i.timestamp)}</td><td>{i.bus_id || '—'}</td><td>{pct(i.confidence)}</td><td>{i.status || '—'}</td>
      <td className="acts"><button className="icon" title="Details" onClick={() => onView(i)}><Eye size={16} /></button><button className="icon" title="Show on map" onClick={() => onMap(i)}><MapPin size={16} /></button></td></tr>)}</tbody></table></div>
    {paginate && pages > 1 && <div className="pager"><button className="btn ghost" disabled={cur === 0} onClick={() => setP(cur - 1)}>Prev</button><span>Page {cur + 1} / {pages} · {rows.length} records</span><button className="btn ghost" disabled={cur >= pages - 1} onClick={() => setP(cur + 1)}>Next</button></div>}</>
}
