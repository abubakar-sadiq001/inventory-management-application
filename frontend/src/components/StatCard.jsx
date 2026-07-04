

// src/components/StatCard.jsx
export default function StatCard({ label, value, accent }) {
  return (
    <div className="bg-white border border-slate-200 rounded-md px-5 py-4.5 border-t-[3px]" style={{ borderTopColor: accent }}>
      <div className="text-2xl font-extrabold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}