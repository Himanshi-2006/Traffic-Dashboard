import { useState } from 'react'
import Filters from '../components/Filters'; import IncidentTable from '../components/IncidentTable'; import IncidentDetail from '../components/IncidentDetail'
export default function Incidents({ items, f, setF, onMap }) {
  const [view, setView] = useState(null)
  return <><Filters f={f} setF={setF} /><div className="card"><div className="row"><h3>Road incidents</h3><b>{items.length} records</b></div><IncidentTable items={items} onView={setView} onMap={onMap} /></div><IncidentDetail i={view} onClose={() => setView(null)} onMap={i => { setView(null); onMap(i) }} /></>
}
