// src/components/ItemForm.jsx
import { useState } from "react";

const EMPTY_FORM = {
  course_title: "",
  course_code: "",
  level: "100",
  semester: "1st",
  quantity: "",
  center_name: "",
  status: "",
};

export default function ItemForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.course_title ||
      !form.course_code ||
      !form.center_name ||
      form.quantity === ""
    )
      return;
    onSubmit({ ...form, quantity: parseInt(form.quantity, 10) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-2 mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Course Title *
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            value={form.course_title}
            onChange={set("course_title")}
            placeholder="e.g. Computer Fundamentals"
            required
          />
        </div>
        <div className="mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Course Code *
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            value={form.course_code}
            onChange={set("course_code")}
            placeholder="e.g. GST103"
            required
          />
        </div>
        <div className="mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Level
          </label>
          <select
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            value={form.level}
            onChange={set("level")}
          >
            {["100", "200", "300", "400", "PG"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <div className="mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Semester
          </label>
          <select
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            value={form.semester}
            onChange={set("semester")}
          >
            {["1st", "2nd"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Status
          </label>
          <select
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            value={form.status}
            onChange={set("status")}
          >
            {["available", "low_stock", "out_of_stock"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Quantity *
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            type="number"
            min={0}
            value={form.quantity}
            onChange={set("quantity")}
            placeholder="0"
            required
          />
        </div>
        <div className="col-span-2 mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Study Centre / Location *
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            value={form.center_name}
            onChange={set("center_name")}
            placeholder="e.g. Lagos HQ"
            required
          />
        </div>
      </div>
      <div className="mt-1.5 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded border border-slate-300 bg-slate-100 px-4.5 py-2 text-sm font-medium transition-colors hover:bg-slate-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer rounded border-none px-5 py-2 text-sm font-semibold text-white transition-colors ${
            loading
              ? "cursor-not-allowed bg-blue-300"
              : "bg-[#1e3a5f] hover:bg-[#162d4a]"
          }`}
        >
          {loading ? "Saving…" : "Save Item"}
        </button>
      </div>
    </form>
  );
}
