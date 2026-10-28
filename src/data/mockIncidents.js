// DEMO DATA ONLY: synthetic records around Chandigarh. Not real detections.
const spots = [
  ["Sector 17 Plaza", 30.7398, 76.7827],
  ["Madhya Marg", 30.7333, 76.7794],
  ["PGI Chowk", 30.7646, 76.7753],
  ["Tribune Chowk", 30.7261, 76.7873],
  ["Industrial Area Ph-1", 30.7046, 76.803],
  ["Sector 22 Market", 30.736, 76.77],
];
const types = [
  "pothole",
  "pothole",
  "road_damage",
  "accident",
  "signboard",
  "traffic_light",
  "congestion",
  "congestion",
];
const status = ["open", "verified", "under_review"];
let s = 7;
const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
export const mockIncidents = Array.from({ length: 64 }, (_, n) => {
  const [name, la, lo] = spots[Math.floor(r() ** 1.5 * spots.length)];
  const t = types[Math.floor(r() * types.length)];
  const ts = new Date(
    Date.UTC(2026, 9, 13, 12) - r() * 14 * 864e5,
  ).toISOString();
  const o = {
    id: "INC" + String(n + 1).padStart(3, "0"),
    event_type: t,
    latitude: +(la + (r() - 0.5) * 0.004).toFixed(5),
    longitude: +(lo + (r() - 0.5) * 0.004).toFixed(5),
    timestamp: ts,
    bus_id: "BUS_" + (101 + Math.floor(r() * 8)),
    confidence: +(0.6 + r() * 0.39).toFixed(2),
    location_name: name,
    status: status[Math.floor(r() * 3)],
  };
  if (t === "congestion") o.vehicle_count = 20 + Math.floor(r() * 60);
  return o;
});
