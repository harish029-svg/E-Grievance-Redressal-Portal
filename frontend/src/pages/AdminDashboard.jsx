import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { adminService } from '../services/adminService';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({ users: 0, complaints: 0, departments: 0 });

  useEffect(() => {
    Promise.all([adminService.getUsers(), adminService.getComplaints(), adminService.getDepartments()]).then(
      ([users, complaints, departments]) => {
        setDashboardData({ users: users.length, complaints: complaints.length, departments: departments.length });
      }
    );
  }, []);

  return (
    <div className="page page-light">
      <Navbar />
      <div className="container py-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-3">Manage users, complaints, and departments from one central control panel.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          <div className="card">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-500">Total users</p>
            <p className="text-5xl font-bold text-slate-900 mt-5">{dashboardData.users}</p>
          </div>
          <div className="card">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-500">Active complaints</p>
            <p className="text-5xl font-bold text-slate-900 mt-5">{dashboardData.complaints}</p>
          </div>
          <div className="card">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-500">Departments</p>
            <p className="text-5xl font-bold text-slate-900 mt-5">{dashboardData.departments}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Link to="/admin/users" className="card glass-card p-8">
            <h3 className="text-xl font-semibold text-white">User management</h3>
            <p className="text-gray-300 mt-3">Review, approve, and manage portal users.</p>
          </Link>
          <Link to="/admin/complaints" className="card glass-card p-8">
            <h3 className="text-xl font-semibold text-white">Complaint oversight</h3>
            <p className="text-gray-300 mt-3">Monitor active grievances and escalate where needed.</p>
          </Link>
          <Link to="/admin/departments" className="card glass-card p-8">
            <h3 className="text-xl font-semibold text-white">Department settings</h3>
            <p className="text-gray-300 mt-3">Keep department mappings and service workflows up to date.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;