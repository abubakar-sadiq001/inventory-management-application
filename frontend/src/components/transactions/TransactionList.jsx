import { format } from "date-fns";
import StatusBadge from "../../components/StatusBadge";

function TransactionList({ item, idx }) {
  let runningBalance;

  const {
    created_at,
    transaction_type,
    course_title,
    course_code,
    center_name,
    quantity,
    balanceAfter,
    performedBy,
    notes,
  } = item;
  const isAddition = transaction_type === "add";

  runningBalance = isAddition
    ? balanceAfter + quantity
    : balanceAfter - quantity;

  // const timezone = "Africa/Lagos"; // or your local timezone
  // const zonedDate = utcToZonedTime(created_at, timezone);
  const date = new Date(created_at);
  date.setHours(date.getHours() + 1); // Add your UTC offset

  return (
    <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
      <td className="w-9 border border-slate-200 px-3 py-2.25 text-slate-400">
        {idx + 1}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
        {format(date, "Pp")}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 font-mono text-slate-700 uppercase">
        <StatusBadge status={transaction_type} />
      </td>
      <td className="border border-slate-200 px-3 py-2.25 text-left text-slate-700">
        {course_title}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 font-bold text-slate-700">
        {course_code}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 font-mono text-slate-700">
        {center_name}
      </td>
      <td
        className="border border-slate-200 px-3 py-2.25 text-left font-semibold"
        style={{
          color: isAddition ? "#016630" : "#9f0712",
        }}
      >
        {isAddition ? `+${quantity}` : `-${quantity}`}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
        {runningBalance}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 font-mono font-bold text-slate-700">
        {performedBy}
      </td>
      <td className="border border-slate-200 px-3 py-2.25 text-left text-slate-700">
        {notes}
      </td>
    </tr>
  );
}

export default TransactionList;
