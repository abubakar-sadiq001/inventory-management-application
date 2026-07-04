// src/components/Toast.jsx
import { useEffect } from "react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === "error" ? "bg-red-100" : "bg-green-100";
  const color = type === "error" ? "text-red-800" : "text-green-800";
  const border = type === "error" ? "border-red-300" : "border-green-300";

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] ${bg} ${color} border ${border} rounded-md px-4 py-3 font-medium shadow-lg max-w-xs text-sm flex items-center gap-2.5`}>
      <span>{type === "error" ? "✕" : "✓"}</span>
      <span>{message}</span>
    </div>
  );
}