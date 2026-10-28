import { TYPES } from "../utils/formatters";
export default function Filters({ f, setF, status = true }) {
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="filters">
      <input
        placeholder="Incident ID / Bus ID"
        value={f.q}
        onChange={set("q")}
      />
      <select value={f.type} onChange={set("type")}>
        <option value="">All types</option>
        {Object.entries(TYPES).map(([k, v]) => (
          <option key={k} value={k}>
            {v.label}
          </option>
        ))}
      </select>
      {status && (
        <select value={f.status} onChange={set("status")}>
          <option value="">All status</option>
          <option value="open">Open</option>
          <option value="verified">Verified</option>
          <option value="under_review">Under review</option>
        </select>
      )}
      <input type="date" value={f.from} onChange={set("from")} />
      <input type="date" value={f.to} onChange={set("to")} />
      <button
        className="btn ghost"
        onClick={() => setF({ q: "", type: "", status: "", from: "", to: "" })}
      >
        Clear
      </button>
    </div>
  );
}
