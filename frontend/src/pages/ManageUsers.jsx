import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { adminService } from '../services/adminService';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getUsers().then((result) => setUsers(result)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page page-light">
      <Navbar />
      <div className="container py-24">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Manage Users</h1>
        <p className="text-gray-600 mb-8">Review registered users and their roles in the portal.</p>

        {loading ? (
          <div className="glass-card p-8 text-center text-slate-700">Loading users...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {users.map((user) => (
              <div key={user.id} className="card">
                <h2 className="text-xl font-semibold text-slate-900">{user.name}</h2>
                <p className="text-gray-500 mt-2">{user.email}</p>
                <p className="mt-3 font-medium">Role: <span className="text-blue-600">{user.role}</span></p>
                <p className="text-sm text-gray-500 mt-2">Department: {user.department || 'N/A'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
