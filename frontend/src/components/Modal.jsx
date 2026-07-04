// src/components/Modal.jsx
export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/55 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-[#1e3a5f] text-white px-5 py-3.5 flex justify-between items-center">
          <span className="font-bold text-sm tracking-wide">{title}</span>
          <button onClick={onClose} className="bg-transparent border-none text-blue-300 cursor-pointer text-xl leading-none hover:text-blue-100 transition-colors">
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}