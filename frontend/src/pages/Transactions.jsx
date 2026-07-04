import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";
import NewTransactionForm from "../components/transactions/NewTransactionForm";
import TransactionHeader from "../components/transactions/TransactionHeader";
import TransactionList from "../components/transactions/TransactionList";
import { createTransaction, getTransactions } from "../services/api-endpoints";

function Transactions() {
  const [search, setSearch] = useState("");
  const [levelFlt, setLevelFlt] = useState("All Levels");
  const [semesterFlt, setSemesterFlt] = useState("All Semesters");
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    async function handleGetTransactions() {
      const result = await getTransactions();
      setTransactions(result);
    }
    handleGetTransactions();
  }, []);

  const filtered = transactions?.filter((item) => {
    const matchSearch =
      item.course_title.toLowerCase().includes(search.toLowerCase()) ||
      item.course_code.toLowerCase().includes(search.toLowerCase()) ||
      item.center_name.toLowerCase().includes(search.toLowerCase());

    return matchSearch;
  });

  async function fetchTransactions() {
    const result = await getTransactions();
    setTransactions(result);
  }

  useEffect(() => {
    (function () {
      fetchTransactions();
    })();
  }, []);

  async function handleCreateTransaction(formData) {
    setLoading(true);
    try {
      console.log(formData);
      await createTransaction(formData);
      toast.success("New transaction created successfully.");

      fetchTransactions();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
      setModal(null);
    }
  }

  // async function handleEdit(formData) {
  //   setLoading(true);
  //   try {
  //     await updateCenter(formData);
  //     toast.success("Center updated successfully.");

  //     fetchTransactions();
  //   } catch (err) {
  //     console.log(err.message);
  //     toast.error(err.message);
  //   } finally {
  //     setLoading(false);
  //     setModal(null);
  //   }
  // }

  // async function handleDelete() {
  //   setLoading(true);
  //   try {
  //     await deleteCenter(modal.item.id);
  //     toast.success("Center removed from centers.");

  //     fetchTransactions();
  //   } catch {
  //     toast.error("Delete failed.");
  //   } finally {
  //     setLoading(false);
  //     setModal(null);
  //   }
  // }

  return (
    <div>
      <TransactionHeader
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
                Date & Time
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Type
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Course
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Code
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Study Center
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Quantity
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Balance After
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Performed By
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Notes
              </th>

              {/* <th className="w-2.5 bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Actions
              </th> */}
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
                <TransactionList
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

      {modal?.type === "create" && (
        <Modal title="Create Center" onClose={() => setModal(null)}>
          <NewTransactionForm
            // initial={modal.item}
            onSubmit={handleCreateTransaction}
            onCancel={() => setModal(null)}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  );
}

export default Transactions;
