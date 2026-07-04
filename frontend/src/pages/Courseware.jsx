import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CoursewareHeader from "../components/courseware/CoursewareHeader";
import CoursewareList from "../components/courseware/CoursewareList";
import NewCoursewareForm from "../components/courseware/NewCoursewareForm";
import UpdateCoursewareForm from "../components/courseware/UpdateCoursewareItem";
import DeleteConfirm from "../components/DeleteConfirm";
import Modal from "../components/Modal";
import {
  createCourseware,
  deleteCourseware,
  getCoursewares,
  updateCourseware,
} from "../services/api-endpoints";

function Courseware() {
  const [search, setSearch] = useState("");
  const [levelFlt, setLevelFlt] = useState("All Levels");
  const [semesterFlt, setSemesterFlt] = useState("All Semesters");
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coursewares, setCoursewares] = useState();

  useEffect(() => {
    async function handleGetCoursewares() {
      const coursewares = await getCoursewares();
      setCoursewares(coursewares);
    }
    handleGetCoursewares();
  }, []);

  const levels = ["All Levels", "100", "200", "300", "400", "PG"];
  const semesters = ["All Semesters", "1st", "2nd"];

  const filtered = coursewares?.filter((item) => {
    const matchSearch =
      item.course_title.toLowerCase().includes(search.toLowerCase()) ||
      item.course_code.toLowerCase().includes(search.toLowerCase()) ||
      item.level.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFlt === "All Levels" || item.level === levelFlt;
    const matchSemesters =
      semesterFlt === "All Semesters" || item.semester === semesterFlt;
    return matchSearch && matchLevel && matchSemesters;
  });

  async function fetchCoursewares() {
    const coursewares = await getCoursewares();
    setCoursewares(coursewares);
  }

  useEffect(() => {
    (function () {
      fetchCoursewares();
    })();
  }, []);

  async function handleCreateCourseware(formData) {
    setLoading(true);
    try {
      await createCourseware(formData);
      toast.success("New courseware created successfully.");

      fetchCoursewares();
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
      await updateCourseware(formData);
      toast.success("Item updated successfully.");

      fetchCoursewares();
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
      await deleteCourseware(modal.item.id);
      toast.success("Item removed from courseware.");

      fetchCoursewares();
    } catch {
      toast.error("Delete failed.");
    } finally {
      setLoading(false);
      setModal(null);
    }
  }

  return (
    <div>
      <CoursewareHeader
        search={search}
        setSearch={setSearch}
        semesters={semesters}
        setSemesterFlt={setSemesterFlt}
        semesterFlt={semesterFlt}
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
                Date
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
                <CoursewareList
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
          title={`Edit: ${modal.item.course_code}`}
          onClose={() => setModal(null)}
        >
          <UpdateCoursewareForm
            initial={modal.item}
            onSubmit={handleEdit}
            onCancel={() => setModal(null)}
            loading={loading}
          />
        </Modal>
      )}
      {modal?.type === "create" && (
        <Modal title="Create Courseware" onClose={() => setModal(null)}>
          <NewCoursewareForm
            // initial={modal.item}
            onSubmit={handleCreateCourseware}
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

export default Courseware;
