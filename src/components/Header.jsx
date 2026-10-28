import { Search, Bell, RefreshCw, Menu } from "lucide-react";
export default function Header({ q, setQ, onRefresh, onMenu, alerts }) {
  return (
    <header className="header">
      <button className="icon menu" onClick={onMenu}>
        <Menu />
      </button>
      <div className="title">
        <b>AI-Powered Urban Road & Traffic Monitoring</b>
        <small>
          {new Date().toLocaleDateString(undefined, { dateStyle: "full" })}
        </small>
      </div>
      <div className="search">
        <Search size={16} />
        <input
          placeholder="Search incident ID, bus ID, location"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <button
        className="icon"
        title={alerts + " accident alerts in current data"}
      >
        <Bell size={18} />
        {alerts > 0 && <span className="dot">{alerts}</span>}
      </button>
      <button className="icon" title="Refresh data" onClick={onRefresh}>
        <RefreshCw size={18} />
      </button>
    </header>
  );
}
