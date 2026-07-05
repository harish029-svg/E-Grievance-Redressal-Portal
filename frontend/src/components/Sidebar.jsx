import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Sidebar.css";
const Sidebar = () => {

  const { user, logout } = useAuth();

  const location = useLocation();

  const role = user?.role;

  return (

    <aside className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-box">
          🛡️
        </div>

        <div>

          <h2>E-Grievance</h2>

          <p>Redressal Portal</p>

        </div>

      </div>

      <nav className="sidebar-links">

        {/* Citizen */}

        {role === "citizen" && (
          <>
            <Link className={location.pathname==="/dashboard"?"active":""} to="/dashboard">🏠 Dashboard</Link>

            <Link className={location.pathname==="/raise-complaint"?"active":""} to="/raise-complaint">📝 Raise Complaint</Link>

            <Link className={location.pathname==="/my-complaints"?"active":""} to="/my-complaints">📄 My Complaints</Link>


            <Link className={location.pathname==="/profile"?"active":""} to="/profile">👤 Profile</Link>
          </>
        )}

        {/* Officer */}

        {role==="officer" && (
          <>
            <Link className={location.pathname==="/officer"?"active":""} to="/officer">🏠 Dashboard</Link>

            <Link className={location.pathname.includes("assigned")?"active":""} to="/officer/assigned">📄 Assigned Cases</Link>

            <Link className={location.pathname==="/profile"?"active":""} to="/profile">👤 Profile</Link>
          </>
        )}

        {/* Admin */}

       {/* Admin */}

{role === "admin" && (
  <>
    <Link
      to="/admin"
      className={`sidebar-item ${
        location.pathname === "/admin" ? "active" : ""
      }`}
    >
      <span>🏠</span>
      <span>Dashboard</span>
    </Link>

    <Link
      to="/admin/users"
      className={`sidebar-item ${
        location.pathname.includes("/users") ? "active" : ""
      }`}
    >
      <span>👥</span>
      <span>Users</span>
    </Link>

    <Link
      to="/admin/complaints"
      className={`sidebar-item ${
        location.pathname.includes("/complaints") ? "active" : ""
      }`}
    >
      <span>📄</span>
      <span>Complaints</span>
    </Link>

    <Link
      to="/admin/announcements"
      className={`sidebar-item ${
        location.pathname.includes("/announcements") ? "active" : ""
      }`}
    >
      <span>📢</span>
      <span>Announcements</span>
    </Link>

    <Link
      to="/admin/assign-officer"
      className={`sidebar-item ${
        location.pathname.includes("/assign-officer") ? "active" : ""
      }`}
    >
      <span>👮</span>
      <span>Assign Officer</span>
    </Link>

    <Link
      to="/profile"
      className={`sidebar-item ${
        location.pathname === "/profile" ? "active" : ""
      }`}
    >
      <span>👤</span>
      <span>Profile</span>
    </Link>
  </>
)}

      </nav>

      <button
        className="sidebar-logout"
        onClick={logout}
      >
        Logout
      </button>

    </aside>

  );

};

export default Sidebar;
