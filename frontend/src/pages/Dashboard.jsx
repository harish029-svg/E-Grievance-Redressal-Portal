import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from "react";
import complaintService from "../services/complaintService";
import announcementService from "../services/announcementService";
import dashboardBanner from "../assets/banner.png";

const Dashboard = () => {
  const { user } = useAuth();
const role = user?.role || "citizen";

const [complaints, setComplaints] = useState([]);
const [announcements, setAnnouncements] = useState([]);

useEffect(() => {
  const loadDashboard = async () => {
    try {
      const complaintData = await complaintService.getUserComplaints();
      setComplaints(complaintData);

      const announcementData =
        await announcementService.getAnnouncements();
      setAnnouncements(announcementData);
    } catch (err) {
      console.log(err);
    }
  };

  loadDashboard();
}, []);
  const roleCards = [
  {
    title: "My Complaints",
    value: complaints.length,
  },
  {
    title: "Pending",
    value: complaints.filter(
      (c) => c.status === "Pending"
    ).length,
  },
  {
    title: "Resolved",
    value: complaints.filter(
      (c) => c.status === "Resolved"
    ).length,
  },
];
  

  return (
    <div className="page-light">
      <Navbar />

      <main className="container py-24">

       <div className="users-header"
       style={{
    padding: "35px 45px",
    minHeight: "280px",
  }}>

  <div>

    <span className="page-badge">
      CITIZEN PORTAL
    </span>

    <h1 className="users-title">
      👋 Welcome Back, {user?.name}
    </h1>

    <p className="users-subtitle"  style={{
   fontSize: "15px",
    lineHeight: "1.6",
    marginBottom: "22px",
  }}>
      Raise complaints, track their progress, receive announcements,
      and stay connected with your local authorities.
    </p>

    <div
      style={{
        marginTop: "28px",
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <div className="flex gap-4 mt-8">

  <Link
    to="/raise-complaint"
    className="btn btn-primary"
    style={{
    background: "#ffffff",
    color: "#2563eb",
    padding: "12px 26px",
    borderRadius: "12px",
    fontWeight: "600",
    textDecoration: "none",
    boxShadow: "0 8px 20px rgba(0,0,0,.12)",
    transition: ".3s",
  }}
  >
    ➕ Raise Complaint
  </Link>

  <Link
    to="/my-complaints"
    className="btn btn-primary"
    style={{
    background: "#ffffff",
    color: "#2563eb",
    padding: "12px 26px",
    borderRadius: "12px",
    fontWeight: "600",
    textDecoration: "none",
    boxShadow: "0 8px 20px rgba(0,0,0,.12)",
    transition: ".3s",
  }}
  >
    📋 My Complaints
  </Link>

</div>
    </div>

  </div>
<div className="users-header-image">
    <img
      src={dashboardBanner}
      alt="Dashboard Banner"
    />
  </div>
</div>
        {/* Stats Cards */}
        {/* Stats Cards */}
<div className="grid gap-4 md:grid-cols-3 mb-8">

  <Link
    to="/my-complaints"
    className="rounded-2xl bg-white shadow-lg p-5 hover:shadow-lg transition h-40"
  >
    <div className="text-4xl">📄</div>

    <h2 className="text-3xl font-bold mt-3">
      {roleCards[0].value}
    </h2>

    <p className="text-gray-600 text-sm">
      My Complaints
    </p>
  </Link>

  <Link
    to="/my-complaints"
       className="rounded-2xl bg-white shadow-md p-5 hover:shadow-lg transition h-40"
  >
    <div className="text-4xl">⏳</div>

    <h2 className="text-3xl font-bold mt-3">
      {roleCards[1].value}
    </h2>

    <p className="text-gray-600 text-sm">
      Pending
    </p>
  </Link>

  <Link
    to="/my-complaints"
className="rounded-2xl bg-white shadow-md p-5 hover:shadow-lg transition h-40"  >
    <div className="text-4xl">✅</div>
    

    <h2 className="text-3xl font-bold mt-3">
      {roleCards[2].value}
    </h2>

    <p className="text-gray-600 text-sm">
      Resolved
    </p>
  </Link>

</div>

        {/* Action Cards */}
        {/* Quick Actions + Announcements */}

{/* Quick Actions + Latest Announcements */}

<div className="grid gap-8 lg:grid-cols-2 mb-10">

  {/* Quick Actions */}
  <div className="rounded-3xl bg-white p-8 shadow-lg">

    <h2 className="text-2xl font-bold text-slate-900 mb-6">
      ⚡ Quick Actions
    </h2>

   <div className="grid gap-6">

      <Link
        to="/profile"
        className="rounded-2xl border border-violet-100 p-5 hover:bg-violet-50 transition"
      >
        <div className="text-4xl">👤</div>
        <h3 className="font-semibold text-lg mt-3">My Profile</h3>
        <p className="text-gray-500 text-sm mt-2">
          View and update your personal information.
        </p>
      </Link>
    </div>

  </div>

  {/* Latest Announcements */}
  <div className="rounded-3xl bg-white p-8 shadow-lg">

    <h2 className="text-2xl font-bold text-slate-900 mb-6">
      📢 Latest Announcements
    </h2>

    <div className="space-y-5">

  {announcements.slice(0, 3).map((announcement) => (

    <div
      key={announcement._id}
      className="rounded-xl bg-slate-50 p-5"
    >

      <h3 className="font-semibold">
        {announcement.title}
      </h3>

      <p className="text-gray-600 mt-2">
        {announcement.message}
      </p>

    </div>

  ))}

</div>

  </div>

</div>

{/* Recent Complaints */}

<div className="rounded-3xl bg-white p-8 shadow-lg mb-10">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-2xl font-bold text-slate-900">
      📋 Recent Complaints
    </h2>

    <Link
      to="/my-complaints"
      className="text-violet-600 font-semibold hover:underline"
    >
      View All →
    </Link>

  </div>

  <div className="space-y-4">

  {complaints.slice(0, 3).map((complaint) => (

    <div
      key={complaint._id}
      className="flex items-center justify-between rounded-xl border p-5"
    >

      <div>

        <h3 className="font-semibold text-lg">
          {complaint.title}
        </h3>

        <p className="text-gray-500">
          {complaint.department?.departmentName}
        </p>

      </div>

      <span className="rounded-full bg-violet-100 text-violet-700 px-4 py-2">
        {complaint.status}
      </span>

    </div>

  ))}

</div>

  

</div>


{/* Portal Features */}

<div className="grid gap-6 md:grid-cols-3 mb-10">

  <div className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition">

    <div className="text-5xl mb-4">⚡</div>

    <h3 className="text-xl font-bold text-slate-900">
      Fast Complaint Tracking
    </h3>

    <p className="text-gray-600 mt-3 leading-7">
      Track every complaint in real time from submission to resolution.
    </p>

  </div>

  <div className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition">

    <div className="text-5xl mb-4">🔒</div>

    <h3 className="text-xl font-bold text-slate-900">
      Secure Portal
    </h3>

    <p className="text-gray-600 mt-3 leading-7">
      Your complaints and personal information are securely protected.
    </p>

  </div>

  <div className="rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition">

    <div className="text-5xl mb-4">📢</div>

    <h3 className="text-xl font-bold text-slate-900">
      Instant Updates
    </h3>

    <p className="text-gray-600 mt-3 leading-7">
      Receive notifications and announcements whenever there is an update.
    </p>

  </div>

</div>

{/* Tips */}

<div className="rounded-3xl bg-violet-50 border border-violet-200 p-8 mb-10">

  <h2 className="text-2xl font-bold text-violet-800 mb-5">
    💡 Tips for Faster Resolution
  </h2>

  <ul className="space-y-3 text-slate-700">

    <li>✔ Provide accurate complaint details.</li>

    <li>✔ Upload supporting images whenever possible.</li>

    <li>✔ Select the correct department.</li>

    <li>✔ Track your complaint regularly for updates.</li>

  </ul>

</div>

<div className="rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-lg p-10">

  <h2 className="text-3xl font-bold text-blue-900">
    Together We Build Better Communities
  </h2>

  <p className="mt-4 text-gray-700 leading-8">
    Thank you for using the E-Grievance Redressal Portal. Your feedback helps improve public services and ensures faster resolution of civic issues.
  </p>

</div>

      </main>
    </div>
  );
};

export default Dashboard;