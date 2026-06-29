import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="bg-blue-600 p-2 rounded-xl">
              <ShieldCheck className="text-white" size={28} />
            </div>

            <div>

              <h1 className="text-white font-bold text-xl">
                E-Grievance
              </h1>

              <p className="text-blue-400 text-xs">
                Redressal Portal
              </p>

            </div>

          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex gap-10 text-gray-300 font-medium">

            <a href="#home" className="hover:text-blue-400 transition">
              Home
            </a>

            <a href="#features" className="hover:text-blue-400 transition">
              Features
            </a>

            <a href="#faq" className="hover:text-blue-400 transition">
              FAQ
            </a>

            <a href="#contact" className="hover:text-blue-400 transition">
              Contact
            </a>

          </div>

          {/* Buttons */}

          <div className="hidden md:flex gap-4">

            <Link
              to="/login"
              className="px-5 py-2 rounded-xl border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-105 transition duration-300"
            >
              Get Started
            </Link>

          </div>

          {/* Mobile */}

          <button
            className="text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700">

          <div className="flex flex-col p-6 gap-5 text-gray-300">

            <a href="#home">Home</a>

            <a href="#features">Features</a>

            <a href="#faq">FAQ</a>

            <a href="#contact">Contact</a>

            <Link
              to="/login"
              className="text-center border border-blue-500 py-2 rounded-xl"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-center bg-blue-600 py-2 rounded-xl"
            >
              Get Started
            </Link>

          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;