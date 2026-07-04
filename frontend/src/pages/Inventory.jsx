import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DeleteConfirm from "../components/DeleteConfirm";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";
import InventoryHeader from "../components/inventory/InventoryHeader";
import ItemForm from "../components/inventory/InventoryItemForm";
import NewInventoryForm from "../components/inventory/NewInventoryForm";
import {
  createInventory,
  deleteInventory,
  getInventories,
  updateInventory,
} from "../services/api-endpoints";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [levelFlt, setLevelFlt] = useState("All Levels");
  const [statusFlt, setStatusFlt] = useState("All Statuses");
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inventories, setInventories] = useState();

  useEffect(() => {
    async function handleGetInventories() {
      const inventories = await getInventories();

      setInventories(inventories);
    }
    handleGetInventories();
  }, []);

  const levels = ["All Levels", "100", "200", "300", "400", "PG"];
  const statuses = ["All Statuses", "available", "low_stock", "out_of_stock"];
  // const coursewarecodes = coursewares?.map((item) => item.course_code);

  const filtered = inventories?.filter((item) => {
    const matchSearch =
      item.course_title.toLowerCase().includes(search.toLowerCase()) ||
      item.course_code.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFlt === "All Levels" || item.level === levelFlt;
    const matchStatus =
      statusFlt === "All Statuses" || item.status === statusFlt;
    return matchSearch && matchLevel && matchStatus;
  });

  async function fetchInventories() {
    const result = await getInventories();
    setInventories(result);
  }

  useEffect(() => {
    (function () {
      fetchInventories();
    })();
  }, []);

  async function handleCreateInventory(formData) {
    setLoading(true);
    try {
      console.log(formData);
      await createInventory(formData);
      toast.success("Inventory created successfully.");

      fetchInventories();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
      setModal(null);
    }
  }
  async function handleEdit(formData) {
    setLoading(true);
    try {
      await updateInventory(formData);
      toast.success("Item updated successfully.");

      fetchInventories();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
      setModal(null);
    }
  }

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteInventory(modal.item.id);
      toast.success("Item removed from inventory.");

      fetchInventories();
    } catch {
      toast.error("Delete failed.");
    } finally {
      setLoading(false);
      setModal(null);
    }
  }

  return (
    <div>
      <InventoryHeader
        search={search}
        setSearch={setSearch}
        statuses={statuses}
        setStatusFlt={setStatusFlt}
        statusFlt={statusFlt}
        setLevelFlt={setLevelFlt}
        levelFlt={levelFlt}
        filtered={filtered}
        levels={levels}
        onSetModal={setModal}
      />

      <div className="overflow-x-auto rounded-md border border-slate-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                #
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Course Title
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Code
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Level
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Sem.
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Qty
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Study Centre
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Location
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Status
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered?.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-10 text-center text-sm text-slate-400"
                >
                  No records match your search.
                </td>
              </tr>
            ) : (
              filtered?.map((item, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}
                >
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
                  <td className="border border-slate-200 px-3 py-2.25 text-right text-slate-700">
                    {item.quantity}
                  </td>
                  <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
                    {item.center_name}
                  </td>
                  <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
                    {item.location}
                  </td>
                  <td className="border border-slate-200 px-3 py-2.25 text-slate-700">
                    <StatusBadge status={item.status} />
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal?.type === "create" && (
        <Modal title="Create Inventory" onClose={() => setModal(null)}>
          <NewInventoryForm
            initial={modal.item}
            onSubmit={handleCreateInventory}
            onCancel={() => setModal(null)}
            loading={loading}
          />
        </Modal>
      )}
      {modal?.type === "edit" && (
        <Modal
          title={`Edit: ${modal.item.course_code}`}
          onClose={() => setModal(null)}
        >
          <ItemForm
            initial={modal.item}
            onSubmit={handleEdit}
            onCancel={() => setModal(null)}
            loading={loading}
          />
        </Modal>
      )}
      {modal?.type === "delete" && (
        <Modal title="Confirm Removal" onClose={() => setModal(null)}>
          <DeleteConfirm
            item={modal.item}
            onConfirm={handleDelete}
            onCancel={() => setModal(null)}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  );
}
