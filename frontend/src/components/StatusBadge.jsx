function StatusBadge({ status }) {
  const styles = {
    available: "bg-green-100 text-green-800 border border-green-300",
    low_stock: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    out_of_stock: "bg-red-100 text-red-800 border border-red-300",
    add: "bg-green-100 text-green-800 border border-green-300",
    dispatch: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    remove: "bg-red-100 text-red-800 border border-red-300",
    admin: "bg-purple-50 text-purple-800 border border-purple-300",
    staff: "bg-blue-50 text-blue-800 border border-blue-300",
  };
  const className =
    styles[status] || "bg-gray-100 text-gray-700 border border-gray-300";
  return (
    <span
      className={`${className} rounded px-2 py-0.5 text-xs font-semibold whitespace-nowrap`}
    >
      {status || "Unknown"}
    </span>
  );
}

export default StatusBadge;
