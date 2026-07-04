export default StudyCenters;

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DeleteConfirm from "../components/DeleteConfirm";
import Modal from "../components/Modal";
import CenterList from "../components/study_center/CenterList";
import NewCenterForm from "../components/study_center/NewCenterForm";
import StudyCenterHeader from "../components/study_center/StudyCenterHeader";
import UpdateCenterForm from "../components/study_center/UpdateCenterItem";
import {
  createCenter,
  deleteCenter,
  getStudyCenters,
  updateCenter,
} from "../services/api-endpoints";

function StudyCenters() {
  const [search, setSearch] = useState("");
  const [levelFlt, setLevelFlt] = useState("All Levels");
  const [semesterFlt, setSemesterFlt] = useState("All Semesters");
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studyCenters, setStudyCenters] = useState();
  // console.log(studyCenters);

  useEffect(() => {
    async function handleGetStudyCenters() {
      const result = await getStudyCenters();
      setStudyCenters(result);
    }
    handleGetStudyCenters();
  }, []);

  const filtered = studyCenters?.filter((item) => {
    const matchSearch =
      item.center_name.toLowerCase().includes(search.toLowerCase()) ||
      item.center_code.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    return matchSearch;
  });

  // console.log(filtered);

  async function fetchStudyCenters() {
    const result = await getStudyCenters();
    setStudyCenters(result);
  }

  useEffect(() => {
    (function () {
      fetchStudyCenters();
    })();
  }, []);

  async function handleCreateCenter(formData) {
    setLoading(true);
    try {
      await createCenter(formData);
      toast.success("New center created successfully.");

      fetchStudyCenters();
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
      await updateCenter(formData);
      toast.success("Center updated successfully.");

      fetchStudyCenters();
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
      await deleteCenter(modal.item.id);
      toast.success("Center removed from centers.");

      fetchStudyCenters();
    } catch {
      toast.error("Delete failed.");
    } finally {
      setLoading(false);
      setModal(null);
    }
  }

  return (
    <div>
      <StudyCenterHeader
        search={search}
        setSearch={setSearch}
        setSemesterFlt={setSemesterFlt}
        semesterFlt={semesterFlt}
        setLevelFlt={setLevelFlt}
        levelFlt={levelFlt}
        filtered={filtered}
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
                Center Name
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Code
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Location
              </th>

              <th className="w-2.5 bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
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
                <CenterList
                  key={idx}
                  item={item}
                  idx={idx}
                  setModal={setModal}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal?.type === "edit" && (
        <Modal
          title={`Edit: ${modal.item.center_code}`}
          onClose={() => setModal(null)}
        >
          <UpdateCenterForm
            initial={modal.item}
            onSubmit={handleEdit}
            onCancel={() => setModal(null)}
            loading={loading}
          />
        </Modal>
      )}
      {modal?.type === "create" && (
        <Modal title="Create Center" onClose={() => setModal(null)}>
          <NewCenterForm
            // initial={modal.item}
            onSubmit={handleCreateCenter}
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
