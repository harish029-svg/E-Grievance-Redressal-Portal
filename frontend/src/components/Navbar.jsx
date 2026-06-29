import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            Get Started
          </Link>
        </div>

        <button className="site-toggle" onClick={() => setMenuOpen(!menuOpen)}>
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
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;