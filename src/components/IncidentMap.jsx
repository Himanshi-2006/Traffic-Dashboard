import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { TYPES, typeInfo, validPos, fmtTime, pct, place } from '../utils/formatters'
function Fly({ sel }) { const map = useMap(); useEffect(() => { if (sel && validPos(sel)) map.flyTo([sel.latitude, sel.longitude], 16) }, [sel]); return null }
export default function IncidentMap({ items, selected, onSelect, height = 480, legend = true, hot = [] }) {
  const pts = items.filter(validPos)
  return <div className="mapwrap" style={{ height }}>
    <MapContainer center={[30.7333, 76.7794]} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Fly sel={selected} />
      {hot.map(h => <CircleMarker key={h.key} center={[h.latitude, h.longitude]} radius={10 + h.count * 2} pathOptions={{ color: '#dc2626', fillColor: '#dc2626', fillOpacity: .25 }}><Popup><b>{h.name}</b><br />{h.count} incidents</Popup></CircleMarker>)}
      {pts.map(i => { const sel = selected?.id === i.id; return <CircleMarker key={i.id} center={[i.latitude, i.longitude]} radius={sel ? 11 : 7} pathOptions={{ color: sel ? '#0f172a' : '#fff', weight: sel ? 3 : 1.5, fillColor: typeInfo(i.event_type).color, fillOpacity: .9 }} eventHandlers={{ click: () => onSelect?.(i) }}>
        <Popup><b>{typeInfo(i.event_type).label}</b> ({i.id})<br />{place(i)}<br />{fmtTime(i.timestamp)}<br />Bus: {i.bus_id || '—'} · Confidence: {pct(i.confidence)}{i.status && <><br />Status: {i.status}</>}</Popup></CircleMarker> })}
    </MapContainer>
    <div className="mapcount">{pts.length} shown{pts.length < items.length && ` (${items.length - pts.length} without valid GPS)`}</div>
    {legend && <div className="legend">{Object.values(TYPES).map(t => <div key={t.label}><i style={{ background: t.color }} />{t.label}</div>)}</div>}
  </div>
}
