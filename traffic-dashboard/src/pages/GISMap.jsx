import Filters from '../components/Filters'; import IncidentMap from '../components/IncidentMap'; import { Badge } from '../components/IncidentTable'
import { fmtTime, pct, place } from '../utils/formatters'
export default function GISMap({ items, f, setF, selected, setSelected }) {
  return <><Filters f={f} setF={setF} /><div className="cols-map"><div className="card"><div className="row"><h3>GIS Incident Map</h3><b>{items.length} incidents</b></div><IncidentMap items={items} selected={selected} onSelect={setSelected} height={560} /></div>
    <div className="card"><h3>Selected incident</h3>{selected ? <><Badge type={selected.event_type} /><p><b>{selected.id}</b><br />{place(selected)}<br />{fmtTime(selected.timestamp)}<br />Bus: {selected.bus_id || '—'}<br />Confidence: {pct(selected.confidence)}<br />Status: {selected.status || '—'}</p></> : <p className="muted">Click a marker (or use “Show on map” elsewhere) to inspect an incident.</p>}</div></div></>
}
