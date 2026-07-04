import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";
import NewUserForm from "../components/users/NewUserForm";
import UserList from "../components/users/UserList";
import UsersHeader from "../components/users/UsersHeader";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/api-endpoints";
import DeleteConfirm from "../components/DeleteConfirm";
import UpdateUserItem from "../components/users/UpdateUserItem";

function Users() {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState();
  //   console.log(users);

  useEffect(() => {
    async function handleGetUsers() {
      const result = await getUsers();
      setUsers(result);
    }
    handleGetUsers();
  }, []);

  const filtered = users?.filter((item) => {
    const matchSearch =
      item.username.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  async function fetchUsers() {
    const result = await getUsers();
    setUsers(result);
  }

  useEffect(() => {
    (function () {
      fetchUsers();
    })();
  }, []);

  // create handler
  async function handleCreateUsers(formData) {
    setLoading(true);
    try {
      console.log(formData);
      await createUser(formData);
      toast.success("User created successfully.");

      fetchUsers();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
      setModal(null);
    }
  }

  // update handler
  async function handleUpdateUser(formData) {
    setLoading(true);
    try {
      await updateUser(formData);
      toast.success("User updated successfully.");

      fetchUsers();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
      setModal(null);
    }
  }

  // delete handler
  async function handleDeleteUser() {
    setLoading(true);
    try {
      await deleteUser(modal.item.id);
      toast.success("User deleted successfully.");

      fetchUsers();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
      setModal(null);
    }
  }

  return (
    <div>
      <UsersHeader
        search={search}
        setSearch={setSearch}
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
                Full Name
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                User Name
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Email
              </th>
              <th className="bg-[#1e3a5f] px-3 py-2.25 text-left text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Role
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
                <UserList key={idx} item={item} idx={idx} setModal={setModal} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal?.type === "create" && (
        <Modal title="Create User" onClose={() => setModal(null)}>
          <NewUserForm
            // initial={modal.item}
            onSubmit={handleCreateUsers}
            onCancel={() => setModal(null)}
            loading={loading}
          />
        </Modal>
      )}
      {modal?.type === "edit" && (
        <Modal title="Update User" onClose={() => setModal(null)}>
          <UpdateUserItem
            initial={modal.item}
            onSubmit={handleUpdateUser}
            onCancel={() => setModal(null)}
            loading={loading}
          />
        </Modal>
      )}
      {modal?.type === "delete" && (
        <Modal title="Confirm Removal" onClose={() => setModal(null)}>
          <DeleteConfirm
            item={modal.item}
            onConfirm={handleDeleteUser}
            onCancel={() => setModal(null)}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  );
}

export default Users;
