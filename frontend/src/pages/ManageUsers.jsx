import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/users",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await axios.delete(
      `http://localhost:5000/api/admin/users/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchUsers();
  };

  const changeRole = async (id, newRole) => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/users`,
      { role: newRole },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchUsers();
  };

  return (
    <AdminLayout>
      <div className="p-8 text-white">
        <h2 className="text-3xl font-bold mb-8">
          👥 Manage Users
        </h2>

        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-gray-300 text-sm uppercase">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-slate-700 hover:bg-slate-700 transition"
                >
                  <td className="p-4">{user.name}</td>
                  <td className="p-4 text-gray-300">{user.email}</td>

                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        changeRole(user._id, e.target.value)
                      }
                      className="bg-slate-900 text-white px-3 py-1 rounded-lg"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-white text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageUsers;