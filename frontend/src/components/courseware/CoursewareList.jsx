import { format, parseISO } from "date-fns";

function CoursewareList({ item, idx, setModal }) {
  return (
    <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
      <td className="w-9 border border-slate-200 px-3 py-2.25 text-slate-400">
        {idx + 1}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
        {item.course_title}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 font-mono font-bold text-slate-700">
        {item.course_code}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 text-center text-slate-700">
        {item.level}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 text-center text-slate-700">
        {item.semester}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
        {format(parseISO(item.created_at), "MMMM do, yyyy")}
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

export default CoursewareList;
