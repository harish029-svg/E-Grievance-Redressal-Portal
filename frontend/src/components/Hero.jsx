import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, ListChecks, Clock3, UserCheck } from 'lucide-react';

const stats = [
  { value: '92%', label: 'Resolution rate' },
  { value: '24h', label: 'Avg response' },
  { value: '3.8/5', label: 'Citizen score' },
];

const Hero = () => (
  <section id="home" className="section hero-section">
    <div className="container hero-grid">
      <div>
        <span className="hero-tag">E-Grievance Portal</span>

        <h1 className="hero-title">
          A modern grievance portal for citizens, officers, and administrators.
        </h1>

        <p className="hero-copy-text">
          Streamline complaint submission, assign officers automatically, and keep every stakeholder informed from submission through resolution.
        </p>

        <div className="hero-ctas">
          <Link to="/register" className="site-btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="site-btn-secondary">
            Login
          </Link>
        </div>

        <div className="hero-stats">
          {stats.map((item) => (
            <div key={item.label} className="hero-stat-card">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hero-panel"
      >
        <div className="hero-glow hero-glow-purple" />
        <div className="hero-glow hero-glow-gold" />

        <div className="hero-panel-grid">
          <div className="hero-card">
            <div className="panel-row">
              <div className="site-logo-icon hero-panel-icon">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="hero-card-title">Secure grievance tracking</p>
                <p className="hero-card-text">Built for official transparency.</p>
              </div>
            </div>
            <div className="hero-pill-row">
              <span className="hero-pill">Citizen first</span>
              <span className="hero-pill hero-pill-muted">Audit-ready</span>
            </div>
          </div>

          <div className="hero-feature-grid">
            <div className="hero-feature">
              <div className="panel-row hero-feature-heading" style={{ color: 'var(--color-secondary)' }}>
                <ListChecks size={20} />
                <strong>Ticket workflows</strong>
              </div>
              <p className="hero-card-text">Track every complaint stage from submission to closure.</p>
            </div>
            <div className="hero-feature">
              <div className="panel-row hero-feature-heading" style={{ color: 'var(--color-accent)' }}>
                <Clock3 size={20} />
                <strong>Fast responses</strong>
              </div>
              <p className="hero-card-text">Ensure faster officer and admin action across departments.</p>
            </div>
          </div>

          <div className="hero-note-card">
            <div className="panel-row" style={{ color: 'var(--color-white)' }}>
              <UserCheck size={20} />
              <p className="hero-card-title">Designed for public sector teams</p>
            </div>
            <p className="hero-card-text">A clean dashboard experience for all roles with consistent government-grade trust.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
