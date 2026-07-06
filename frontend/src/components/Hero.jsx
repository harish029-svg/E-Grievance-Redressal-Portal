import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Clock3,
  FileSearch
} from "lucide-react";

import dashboardBanner from "../assets/banner.png";

const Hero = () => {
  return (
    <section id="home" className="hero-modern">
      <div className="container hero-modern-grid">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .6 }}
        >
          <span className="hero-badge">
            Government Digital Service
          </span>

          <h1 className="hero-heading">
            A Modern
            <br />
            <span>E-Grievance Portal</span>
            <br />
            For Every Citizen
          </h1>

          <p className="hero-description">
            Submit complaints online, track every update in real time,
            communicate with authorities, and receive transparent
            resolutions through one secure government platform.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="site-btn-primary">
              Register Now
            </Link>

            <Link to="/login" className="site-btn-secondary">
              Login
            </Link>
          </div>

          <div className="hero-features">

            <div>
              <ShieldCheck size={20} />
              <span>Secure Portal</span>
            </div>

            <div>
              <Clock3 size={20} />
              <span>Fast Resolution</span>
            </div>

            <div>
              <FileSearch size={20} />
              <span>Complaint Tracking</span>
            </div>

            <div>
              <CheckCircle2 size={20} />
              <span>Transparent Process</span>
            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          className="hero-image-area"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >
          <img
            src={dashboardBanner}
            alt="Portal Illustration"
            className="hero-image"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;