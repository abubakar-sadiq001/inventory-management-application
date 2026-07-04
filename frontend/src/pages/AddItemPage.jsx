// src/pages/AddItemPage.jsx
import { useState } from "react";
import { api } from "../utils/api";
import ItemForm from "../components/ItemForm";

export default function AddItemPage({ onRefresh, onToast, onNav }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await api.addItem(formData);
      onToast("New item added to inventory.", "success");
      onRefresh();
      onNav("inventory");
    } catch {
      onToast("Could not save item.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-xl font-extrabold text-slate-900 mb-1">Add New Item</div>
      <div className="text-sm text-slate-500 mb-6">Register a new courseware record in the inventory.</div>
      <div className="bg-white border border-slate-200 rounded-md p-6 max-w-[520px]">
        <ItemForm onSubmit={handleSubmit} onCancel={() => onNav("inventory")} loading={loading} />
      </div>
    </div>
  );
}