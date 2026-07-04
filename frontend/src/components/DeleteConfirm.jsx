export default function DeleteConfirm({ item, onConfirm, onCancel, loading }) {
  return (
    <div>
      <p className="mb-5 text-slate-600">
        Are you sure you want to remove{" "}
        <strong>
          {item.course_title || item.center_name || item.full_name}
        </strong>{" "}
        (
        <code className="font-mono">
          {item.course_code || item.center_code || item.username}
        </code>
        ) from this table? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-2.5">
        <button
          onClick={onCancel}
          className="cursor-pointer rounded border border-slate-300 bg-slate-100 px-4.5 py-2 text-sm transition-colors hover:bg-slate-200"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`cursor-pointer rounded border-none px-5 py-2 text-sm font-semibold text-white transition-colors ${
            loading
              ? "cursor-not-allowed bg-red-300"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Removing…" : "Yes, Remove"}
        </button>
      </div>
    </div>
  );
}
