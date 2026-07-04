import StatusBadge from "../StatusBadge";
// import SquarePen from "lucide";

function User({ item, idx, setModal }) {
  const { username, full_name, role, email } = item;

  return (
    <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
      <td className="w-9 border border-slate-200 px-3 py-2.25 text-slate-400">
        {idx + 1}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
        {full_name}
      </td>
      {/* <td className="border border-slate-200 px-3 py-2.25 font-mono text-slate-700 uppercase">
        <StatusBadge status={transaction_type} />
      </td> */}
      <td className="border border-slate-200 px-3 py-2.25 text-left text-slate-700">
        {username}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 font-bold text-slate-700">
        {email}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 font-mono text-slate-700">
        <StatusBadge status={role} />
      </td>

      <td className="border border-slate-200 px-3 py-2.25 whitespace-nowrap text-slate-700">
        <button
          className="mr-1.5 cursor-pointer rounded border border-blue-300 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
          onClick={() => setModal({ type: "edit", item })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-square-pen-icon lucide-square-pen"
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
        </button>
        <button
          className="cursor-pointer rounded border border-red-300 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
          onClick={() => setModal({ type: "delete", item })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash2-icon lucide-trash-2"
          >
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default User;
