import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { getRecentInventories } from "../services/api-endpoints";

export default function Dashboard() {
  const [inventories, setInventory] = useState();

  const total = inventories?.length;
  const inStock = inventories?.filter((i) => i.status === "available").length;
  const lowStock = inventories?.filter((i) => i.status === "low_stock").length;
  const outStock = inventories?.filter(
    (i) => i.status === "out_of_stock",
  ).length;
  const recentItems = inventories?.slice(0, 5);

  useEffect(() => {
    async function handleGetInventories() {
      const inventories = await getRecentInventories();
      setInventory(inventories);
    }
    handleGetInventories();
  }, []);

  return (
    <div>
      <div className="mb-1 text-xl font-extrabold text-slate-900">
        Dashboard Overview
      </div>
      <div className="mb-6 text-sm text-slate-500">
        Summary of courseware inventory across all study centres.
      </div>
      <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
        <StatCard label="Total Records" value={total} accent="#3b82f6" />
        <StatCard label="In Stock" value={inStock} accent="#22c55e" />
        <StatCard label="Low Stock" value={lowStock} accent="#eab308" />
        <StatCard label="Out of Stock" value={outStock} accent="#ef4444" />
      </div>
      <div className="mb-7">
        <div className="mb-3 flex items-center border-b border-slate-200 pb-2 text-sm font-bold tracking-wider text-slate-600 uppercase">
          Recent Inventory Records
          <Link
            className="ml-4 cursor-pointer text-xs font-semibold text-[#1e3a5f] underline hover:text-[#162d4a]"
            to="/inventory"
          >
            (View all →)
          </Link>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                Course Title
              </th>
              <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                Code
              </th>
              <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                Centre
              </th>
              <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                Qty
              </th>
              <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {recentItems?.map((item, i) => (
              <tr key={i} className="bg-white">
                <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
                  {item.course_title}
                </td>
                <td className="border border-slate-200 px-3 py-2.25 font-mono font-semibold text-slate-700">
                  {item.course_code}
                </td>
                <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
                  {item.location}
                </td>
                <td className="border border-slate-200 px-3 py-2.25 text-right text-slate-700">
                  {item.quantity}
                </td>
                <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
