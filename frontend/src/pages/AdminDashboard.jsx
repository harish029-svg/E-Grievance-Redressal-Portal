import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { adminService } from '../services/adminService';
import departmentService from "../services/departmentService";
import announcementService from "../services/announcementService";
const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    users: 0,
    complaints: 0,
    departments: 0,
    announcements: 0,
  });
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    Promise.all([
      adminService.getUsers(),
      adminService.getComplaints(),
      departmentService.getDepartments(),
      announcementService.getAnnouncements(),
    ]).then(([users, complaints, departments, announcements]) => {
      setDashboardData({
        users: users.length,
        complaints: complaints.length,
        departments: departments.length,
        announcements: announcements.length,
      });
      setAnnouncements(announcements);
      console.log("Announcements:", announcements);
      
    });
  }, []);

  return (
    <div className="page-light">
      <Navbar />

      <main className="container py-24">

        {/* Header */}
        <div className="mb-10">
         {/* ===== Admin Header ===== */}

<div className="admin-header">

  <div className="admin-header-content">

    <span className="page-badge">
      ADMIN PANEL
    </span>

    <h1 className="admin-title">
      Welcome Back, Admin 👋
    </h1>

    <p className="admin-subtitle">
      Monitor complaints, manage users, assign officers and publish
      announcements from one place.
    </p>

  </div>

</div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">

          <div className="card hover:-translate-y-1 hover:shadow-xl transition-all">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-500">
              Total Users
            </p>

            <p className="text-5xl font-bold text-slate-900 mt-5">
              {dashboardData.users}
            </p>
          </div>

          <div className="card hover:-translate-y-1 hover:shadow-xl transition-all">
            <p className="text-sm uppercase tracking-[0.25em] text-orange-500">
              Active Complaints
            </p>

            <p className="text-5xl font-bold text-slate-900 mt-5">
              {dashboardData.complaints}
            </p>
          </div>

          <div className="card hover:-translate-y-1 hover:shadow-xl transition-all">
            <p className="text-sm uppercase tracking-[0.25em] text-green-500">
              Departments
            </p>

            <p className="text-5xl font-bold text-slate-900 mt-5">
              {dashboardData.departments}
            </p>
          </div>

        </div>

        {/* Action Cards */}
        {/* Dashboard Bottom */}

<div className="dashboard-bottom">

  {/* Left */}

  <div className="dashboard-left">

    <h2 className="section-title">
      Quick Actions
    </h2>

    <div className="quick-grid">

      <Link to="/admin/users" className="quick-card">
        <div className="quick-icon">👥</div>
        <h3>Users</h3>
        <p>Manage Citizens & Officers</p>
      </Link>

      <Link to="/admin/complaints" className="quick-card">
        <div className="quick-icon">📄</div>
        <h3>Complaints</h3>
        <p>Track and Resolve Complaints</p>
      </Link>

      <Link to="/admin/assign-officer" className="quick-card">
        <div className="quick-icon">👮</div>
        <h3>Assign Officer</h3>
        <p>Assign Pending Complaints</p>
      </Link>

    </div>

  </div>

  {/* Right */}

  <div className="dashboard-right">

    <div className="announcement-panel">

      <div className="announcement-header">

        <h2>📢 Recent Announcements</h2>

        <Link to="/admin/announcements">
          View All
        </Link>

      </div>

     {announcements.length > 0 ? (

  announcements
    .slice(0, 3)
    .map((announcement) => (

      <div
        key={announcement._id}
        className="announcement-item"
      >

        <div>

          <h4>{announcement.title}</h4>

          <p>{announcement.message}</p>

        </div>

        <span>

          {new Date(
            announcement.createdAt
          ).toLocaleDateString()}

        </span>

      </div>

    ))

) : (

  <p className="announcement-empty">
    No announcements available.
  </p>

)}

    </div>

  </div>

</div>

      </main>
    </div>
  );
};

export default AdminDashboard;