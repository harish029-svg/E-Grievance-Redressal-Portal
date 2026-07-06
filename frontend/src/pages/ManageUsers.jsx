import ViewUserModal from "../components/admin/ViewUserModal";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddUserModal from "../components/admin/AddUserModal";
import adminService from "../services/adminService";
import "../styles/admin.css";
import EditUserModal from "../components/admin/EditUserModal";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const [departments, setDepartments] = useState([]);
const [department, setDepartment] = useState("");
  const fetchUsers = async () => {
    try {
      const data = await adminService.getUsers();
      const filtered = data.filter(
  (user) => user.role !== "admin"
);

setUsers(filtered);
setFilteredUsers(filtered);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
  try {
    const data = await adminService.getDepartments();
    setDepartments(data);
  } catch (err) {
    console.error("Error fetching departments:", err);
  }
};

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    await adminService.deleteUser(id);

    alert("User deleted successfully");

    fetchUsers();
  } catch (err) {
    alert(err.response?.data?.message || "Failed to delete user");
  }
};

 useEffect(() => {
  fetchUsers();
  fetchDepartments();
}, []);

  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(result);
  }, [search, users]);

  return (
    <div className="page page-light">
      <Navbar />

      <div className="container py-24">

        {/* Header */}

        <div className="users-header">

  <div>

    <span className="page-badge">
      ADMIN PANEL
    </span>

    <h1 className="users-title">
      👥 User Management
    </h1>

    <p className="users-subtitle">
      Manage citizen and officer accounts across the grievance portal.
    </p>

  </div>

  <button
    className="add-user-btn"
    onClick={() => setShowModal(true)}
  >
    + Add New User
  </button>

</div>

        {/* Search */}

       <div className="search-box">

  <input
    type="text"
    className="search-input"
    placeholder="🔍 Search by name or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

</div>

<div className="users-stats">

  <div className="user-stat-card">

    <div className="stat-icon blue">👥</div>

    <div>

      <h2>{users.length}</h2>

      <p>Total Users</p>

    </div>

  </div>

  <div className="user-stat-card">

    <div className="stat-icon green">🧑</div>

    <div>

      <h2>{users.filter(u => u.role === "citizen").length}</h2>

      <p>Citizens</p>

    </div>

  </div>

  <div className="user-stat-card">

    <div className="stat-icon orange">👮</div>

    <div>

      <h2>{users.filter(u => u.role === "officer").length}</h2>

      <p>Officers</p>

    </div>

  </div>

  <div className="user-stat-card">

  <div className="stat-icon purple">🏢</div>

  <div>

    <h2>6</h2>

    <p>Departments</p>

  </div>

</div>

</div>

        {/* Table */}

        {loading ? (
          <div className="loading-card">
            Loading users...
          </div>
        ) : (
          <div className="users-card">

  <div className="users-table-container">

            <table className="users-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (

                    <tr key={user._id}>

                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td>
                       <span className={`role-badge ${user.role}`}>
  {user.role === "citizen" && "👤 Citizen"}
  {user.role === "officer" && "👮 Officer"}
</span>
                      </td>

                      <td>
                       {user.department?.departmentName || "N/A"}
                      </td>

                      <td>
                        <span className="status-active">
                          Active
                        </span>
                      </td>

                      <td>

                        <div className="table-actions">

                          <button
  className="view-btn"
  onClick={() => setSelectedUser(user)}
>
  👁View
</button>

                          <button
  className="edit-btn"
  onClick={() => setEditUser(user)}
>
  ✏️Edit
</button>

                          <button
  className="delete-btn"
  onClick={() => handleDelete(user._id)}
>
   🗑️Delete
</button>

                        </div>

                      </td>

                    </tr>

                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No users found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

            </div>

          </div>
        )}

        {/* Add User Modal */}

        {showModal && (
          <AddUserModal
            closeModal={() => setShowModal(false)}
            refreshUsers={fetchUsers}
          />
        )}

        {selectedUser && (
  <ViewUserModal
    user={selectedUser}
    closeModal={() => setSelectedUser(null)}
  />
)}

{editUser && (
  <EditUserModal
    user={editUser}
    closeModal={() => setEditUser(null)}
    refreshUsers={fetchUsers}
  />
)}

      </div>
    </div>
  );
};

export default ManageUsers;