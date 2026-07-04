function CenterList({ item, idx, setModal }) {
  return (
    <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
      <td className="w-9 border border-slate-200 px-3 py-2.25 text-slate-400">
        {idx + 1}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
        {item.center_name}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 font-mono font-bold text-slate-700">
        {item.center_code}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 text-left text-slate-700">
        {item.location}
      </td>

      <td className="border border-slate-200 px-3 py-2.25 whitespace-nowrap text-slate-700">
        <button
          className="mr-1.5 cursor-pointer rounded border border-blue-300 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
          onClick={() => setModal({ type: "edit", item })}
        >
          Edit
        </button>
        <button
          className="cursor-pointer rounded border border-red-300 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
          onClick={() => setModal({ type: "delete", item })}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CenterList;
