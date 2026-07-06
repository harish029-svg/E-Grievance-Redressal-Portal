import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const role = user?.role;

  // Pages where sidebar should appear
  const sidebarPages = [
    "/dashboard",
    "/raise-complaint",
    "/my-complaints",
    "/announcements",
    "/profile",
    "/officer",
    "/admin",
  ];

  const showSidebar =
    user &&
    sidebarPages.some((page) => location.pathname.startsWith(page));

  // Sidebar
  if (showSidebar) {
    return (
      <aside className="sidebar">

        <Link
  to="/"
  className="sidebar-logo"
  style={{
    textDecoration: "none",
    color: "inherit",
  }}
>
  <div className="logo-box">
    <ShieldCheck size={26} />
  </div>

  <div>
    <h2>E-Grievance</h2>
    <p>Redressal Portal</p>
  </div>
</Link>

        <div className="sidebar-links">

          {role === "citizen" && (
            <>
              <Link to="/dashboard">🏠 Dashboard</Link>
              <Link to="/raise-complaint">📝 Raise Complaint</Link>
              <Link to="/my-complaints">📄 My Complaints</Link>
              <Link to="/profile">👤 Profile</Link>
            </>
          )}

          {role === "officer" && (
            <>
              <Link to="/officer">🏠 Dashboard</Link>
              <Link to="/officer/assigned">📄 Assigned Cases</Link>
              <Link to="/profile">👤 Profile</Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link to="/admin">🏠 Dashboard</Link>
              <Link to="/admin/users">👥 Users</Link>
              <Link to="/admin/complaints">📄 Complaints</Link>
              <Link to="/admin/announcements">📢 Announcements</Link>
              <Link to="/admin/assign-officer">👮 Assign Officer</Link>
              <Link to="/profile">👤 Profile</Link>
            </>
          )}

        </div>

        <button
          className="sidebar-logout"
          onClick={logout}
        >
          Logout
        </button>

      </aside>
    );
  }

  // Normal Navbar (Landing Page)
  return (
    <nav className={`site-navbar ${scrolled ? "site-navbar-scrolled" : ""}`}>
      <div className="container site-navbar-inner">

        <Link to="/" className="site-logo">

          <div className="site-logo-icon">
            <ShieldCheck size={24} />
          </div>

          <div className="site-logo-title">
            <h1>E-Grievance</h1>
            <p>Redressal Portal</p>
          </div>

        </Link>

        <div className="site-links">

          <a href="#home" className="site-nav-link">
            Home
          </a>

          <a href="#features" className="site-nav-link">
            Features
          </a>

          <a href="#faq" className="site-nav-link">
            FAQ
          </a>

          <a href="#contact" className="site-nav-link">
            Contact
          </a>

        </div>

        <div className="site-actions">

          <Link to="/login" className="site-btn-secondary">
            Login
          </Link>

          <Link to="/register" className="site-btn-primary">
            Register
          </Link>

        </div>

        <button
          className="site-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {menuOpen && (
        <div className="site-mobile-menu">

          <div className="site-links-mobile">

            <a href="#home" className="site-nav-mobile-link">
              Home
            </a>

            <a href="#features" className="site-nav-mobile-link">
              Features
            </a>

            <a href="#faq" className="site-nav-mobile-link">
              FAQ
            </a>

            <a href="#contact" className="site-nav-mobile-link">
              Contact
            </a>

            <Link to="/login" className="site-nav-mobile-link">
              Login
            </Link>

            <Link to="/register" className="site-nav-mobile-link">
              Register
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;