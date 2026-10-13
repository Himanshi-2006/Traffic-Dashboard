import { Loader2, AlertTriangle, Inbox } from 'lucide-react'
export const Loading = () => <div className="state"><Loader2 className="spin" /> Loading data…</div>
export const ErrorState = ({ message, onRetry }) => <div className="state err"><AlertTriangle /> {message}<button className="btn" onClick={onRetry}>Retry</button></div>
export const Empty = ({ text = 'No records match the current filters.' }) => <div className="state"><Inbox /> {text}</div>
