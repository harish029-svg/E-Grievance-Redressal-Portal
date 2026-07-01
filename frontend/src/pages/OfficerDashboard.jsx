import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementsPanel from '../components/AnnouncementsPanel';

const OfficerDashboard = () => (
  <div className="page page-light dashboard-page">
    <Navbar />
    <div className="container py-24">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-badge dashboard-badge-secondary">Officer Dashboard</span>
          <h1 className="dashboard-title">Field operations and case tracking</h1>
          <p className="dashboard-copy">Resolve assigned complaints, receive alerts, and keep your workflow aligned with policy updates.</p>
        </div>
      </div>

      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <p className="dashboard-stat-label">Assigned cases</p>
          <p className="dashboard-stat-value">8</p>
        </div>
        <div className="dashboard-stat-card">
          <p className="dashboard-stat-label">In progress</p>
          <p className="dashboard-stat-value">4</p>
        </div>
        <div className="dashboard-stat-card">
          <p className="dashboard-stat-label">Resolved today</p>
          <p className="dashboard-stat-value">2</p>
        </div>
      </div>

      <div className="dashboard-main-grid">
        <div className="dashboard-main-col">
          <AnnouncementsPanel role="officer" />
        </div>
        <div className="dashboard-side-col">
          <div className="card dashboard-side-card">
            <p className="dashboard-side-label">Officer notifications</p>
            <ul className="dashboard-notice-list">
              <li>New policy updates are available for review.</li>
              <li>Department meeting begins today at 3 PM.</li>
              <li>Emergency alerts are active in your ward.</li>
            </ul>
          </div>
          <div className="card dashboard-side-card">
            <p className="dashboard-side-label">Quick actions</p>
            <div className="dashboard-action-group">
              <Link to="/officer/assigned" className="dashboard-action-card">
                <h3>Assigned complaints</h3>
                <p>View your current assignments.</p>
              </Link>
              <Link to="/profile" className="dashboard-action-card">
                <h3>Update status</h3>
                <p>Keep your officer profile and availability current.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-summary-grid">
        <div className="card dashboard-summary-card">
          <p className="dashboard-summary-label">Assigned Complaints</p>
          <h3>Work queue</h3>
          <p>Review all active issues pending your action.</p>
        </div>
        <div className="card dashboard-summary-card">
          <p className="dashboard-summary-label">Update Complaint Status</p>
          <h3>Move cases forward</h3>
          <p>Log progress and keep citizens informed about resolutions.</p>
        </div>
        <div className="card dashboard-summary-card">
          <p className="dashboard-summary-label">Notifications</p>
          <h3>Action reminders</h3>
          <p>Stay aligned with official directives and urgent tasks.</p>
        </div>
      </div>
    </div>
  </div>
);

export default OfficerDashboard;
