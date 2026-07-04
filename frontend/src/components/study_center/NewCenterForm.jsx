import { useState } from "react";

const EMPTY_FORM = {
  center_name: "",
  center_code: "",
  location: "",
};

export default function NewCenterForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}) {
  const [form, setForm] = useState(initial || EMPTY_FORM);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.center_name || !form.center_code || !form.location === "") return;

    onSubmit({ ...form });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-2 mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Center Name *
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            value={form.center_name}
            onChange={set("center_name")}
            placeholder="e.g. NOUN Study Hall"
            required
          />
        </div>
        <div className="mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Center Code *
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            onChange={set("center_code")}
            placeholder="e.g. ABJ103"
            required
          />
        </div>
        <div className="mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Location
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            onChange={set("location")}
            placeholder="e.g. FCT, Abuja"
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
          {loading ? "Creating…" : "Create"}
        </button>
      </div>
    </form>
  );
}
