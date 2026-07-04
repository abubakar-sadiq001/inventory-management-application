import { useState } from "react";

const EMPTY_FORM = {
  course_code: "",
  course_title: "",
  level: "100",
  semester: "1st",
};

export default function NewCoursewareForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}) {
  const [form, setForm] = useState(initial || EMPTY_FORM);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !form.course_code ||
      !form.course_title ||
      !form.level === "" ||
      form.semester === ""
    )
      return;

    onSubmit({ ...form });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-2 mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Course Title *
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
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
