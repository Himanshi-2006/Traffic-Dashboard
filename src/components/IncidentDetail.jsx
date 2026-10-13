import { X } from 'lucide-react'
import { fmtTime, pct, place } from '../utils/formatters'
import { Badge } from './IncidentTable'
export default function IncidentDetail({ i, onClose, onMap }) {
  if (!i) return null
  const rows = [['ID', i.id], ['Location', place(i)], ['Coordinates', `${i.latitude ?? '—'}, ${i.longitude ?? '—'}`], ['Detected', fmtTime(i.timestamp)], ['Bus', i.bus_id || '—'], ['AI confidence', pct(i.confidence)], ['Status', i.status || '—'], ['Vehicles counted', i.vehicle_count ?? '—']]
  return <div className="modal" onClick={onClose}><div className="card panel" onClick={e => e.stopPropagation()}><button className="icon close" onClick={onClose}><X /></button>
    <h3>Incident details</h3><Badge type={i.event_type} /><dl>{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    {onMap && <button className="btn" onClick={() => onMap(i)}>Show on map</button>}</div></div>
}
