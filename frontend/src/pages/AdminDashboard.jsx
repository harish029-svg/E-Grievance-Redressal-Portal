import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementsPanel from '../components/AnnouncementsPanel';
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

        <div className="dashboard-header">
          <div>
            <span className="dashboard-badge dashboard-badge-accent">Admin Dashboard</span>
            <h1 className="dashboard-title">Admin control center</h1>
            <p className="dashboard-copy">Manage users, complaints, departments, and announcements from one secure portal.</p>
          </div>
        </div>

        <div className="dashboard-stats-grid mb-10">
          <div className="dashboard-stat-card">
            <p className="dashboard-stat-label">Total users</p>
            <p className="dashboard-stat-value">{dashboardData.users}</p>
          </div>
          <div className="dashboard-stat-card">
            <p className="dashboard-stat-label">Active complaints</p>
            <p className="dashboard-stat-value">{dashboardData.complaints}</p>
          </div>
          <div className="dashboard-stat-card">
            <p className="dashboard-stat-label">Departments</p>
            <p className="dashboard-stat-value">{dashboardData.departments}</p>
          </div>
        </div>

        <div className="dashboard-main-grid mb-10">
          <div className="dashboard-main-col">
            <AnnouncementsPanel role="admin" editable />
          </div>
          <div className="dashboard-side-col">
            <div className="card dashboard-side-card">
              <p className="dashboard-side-label">Platform alerts</p>
              <ul className="dashboard-notice-list">
                <li>Review the latest announcement performance metrics.</li>
                <li>Ensure department assignments are up to date.</li>
                <li>Investigate high-priority cases flagged today.</li>
              </ul>
            </div>
            <div className="dashboard-action-group">
              <Link to="/admin/users" className="card dashboard-action-card hover:-translate-y-1 transition-transform">
                <h3>User management</h3>
                <p>Approve portal accounts and officer roles.</p>
              </Link>
              <Link to="/admin/complaints" className="card dashboard-action-card hover:-translate-y-1 transition-transform">
                <h3>View complaints</h3>
                <p>Monitor active grievances and escalate as needed.</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card">
            <p className="text-sm uppercase tracking-[0.25em] text-[#0F4C81] font-semibold">View All Announcements</p>
            <h3 className="text-xl font-semibold text-slate-900 mt-2">Content oversight</h3>
            <p className="text-gray-600 mt-3">Create, edit, and remove public notices from a single management panel.</p>
          </div>
          <div className="card">
            <p className="text-sm uppercase tracking-[0.25em] text-[#2E7D32] font-semibold">Create Announcement</p>
            <h3 className="text-xl font-semibold text-slate-900 mt-2">Publish updates</h3>
            <p className="text-gray-600 mt-3">Share alerts, policy changes, and operational notices instantly.</p>
          </div>
          <div className="card">
            <p className="text-sm uppercase tracking-[0.25em] text-[#FF6B00] font-semibold">Edit / Delete</p>
            <h3 className="text-xl font-semibold text-slate-900 mt-2">Keep announcements current</h3>
            <p className="text-gray-600 mt-3">Manage every notice and remove outdated information efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;