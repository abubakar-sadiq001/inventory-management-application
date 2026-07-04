import { useState } from "react";

const EMPTY_FORM = {
  username: "",
  password: "",
  role: "",
  full_name: "",
  email: "",
};

function UpdateUserItem({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !form.username ||
      !form.role === "" ||
      !form.full_name === "" ||
      !form.email === ""
    )
      return;

    onSubmit({ ...form });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-2 mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            User Name *
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            value={form.username}
            onChange={set("username")}
            placeholder="e.g. john_doe"
            required
          />
        </div>
        <div className="mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Password *
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            disabled
            onChange={set("password")}
            placeholder="password"
            required
          />
        </div>
        <div className="mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Role
          </label>
          <select
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            value={form.role}
            onChange={set("role")}
          >
            <option value="">Select Role...</option>
            {["admin", "staff"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Full Name
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            value={form.full_name}
            onChange={set("full_name")}
            placeholder="e.g. John Doe"
            required
          />
        </div>
        <div className="mb-3.5 flex flex-col gap-1">
          <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Email
          </label>
          <input
            className="font-inherit box-border w-full rounded border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm transition-colors outline-none focus:border-[#1e3a5f] focus:bg-white"
            value={form.email}
            onChange={set("email")}
            placeholder="e.g. john@example.com"
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
          {loading ? "Updating…" : "Update"}
        </button>
      </div>
    </form>
  );
}

export default UpdateUserItem;
