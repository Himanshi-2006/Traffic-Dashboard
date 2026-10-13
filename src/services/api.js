import { mockIncidents } from '../data/mockIncidents'
const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
export const ENDPOINTS = { incidents: '/api/incidents', incident: id => `/api/incidents/${id}`, summary: '/api/analytics/summary', traffic: '/api/analytics/traffic' }
async function get(path) {
  let res
  try { res = await fetch(BASE + path) } catch { throw new Error(`Cannot reach backend at ${BASE}. Is it running?`) }
  if (!res.ok) throw new Error(`Backend returned HTTP ${res.status}`)
  try { return await res.json() } catch { throw new Error('Backend returned invalid JSON') }
}
// Accepts either [..] or { incidents: [..] }; drops records without id/event_type.
export async function getIncidents() {
  if (USE_MOCK) return mockIncidents
  const d = await get(ENDPOINTS.incidents), arr = Array.isArray(d) ? d : d?.incidents
  if (!Array.isArray(arr)) throw new Error('Unexpected response format from /api/incidents')
  return arr.filter(i => i && i.id && i.event_type)
}
export const getIncident = id => (USE_MOCK ? Promise.resolve(mockIncidents.find(i => i.id === id) || null) : get(ENDPOINTS.incident(id)))
