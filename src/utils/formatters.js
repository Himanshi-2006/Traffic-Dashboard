export const TYPES = { pothole: { label: 'Pothole', color: '#ef4444' }, road_damage: { label: 'Road damage', color: '#f97316' }, accident: { label: 'Accident', color: '#991b1b' }, signboard: { label: 'Signboard issue', color: '#eab308' }, traffic_light: { label: 'Traffic light issue', color: '#8b5cf6' }, congestion: { label: 'Congestion', color: '#3b82f6' } }
export const typeInfo = t => TYPES[t] || { label: t || 'Unknown', color: '#64748b' }
export const fmtTime = s => { const d = new Date(s); return isNaN(d) ? '—' : d.toLocaleString() }
export const pct = c => (typeof c === 'number' ? Math.round(c * 100) + '%' : '—')
export const validPos = i => Number.isFinite(i.latitude) && Number.isFinite(i.longitude) && Math.abs(i.latitude) <= 90 && Math.abs(i.longitude) <= 180
export const place = i => i.location_name || (validPos(i) ? `${i.latitude.toFixed(4)}, ${i.longitude.toFixed(4)}` : 'Unknown')
