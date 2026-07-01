import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementsPanel from '../components/AnnouncementsPanel';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const role = user?.role || 'client';

  const cards = {
    client: [
      { title: 'My Complaints', value: '5', link: '/my-complaints' },
      { title: 'Pending Resolutions', value: '2', link: '/my-complaints' },
      { title: 'Closed cases', value: '12', link: '/my-complaints' },
    ],
    officer: [
      { title: 'Assigned cases', value: '8', link: '/officer/assigned' },
      { title: 'Open tickets', value: '3', link: '/officer/assigned' },
      { title: 'Completed today', value: '4', link: '/officer/assigned' },
    ],
    admin: [
      { title: 'Total users', value: '280', link: '/admin/users' },
      { title: 'Active complaints', value: '18', link: '/admin/complaints' },
      { title: 'Departments', value: '6', link: '/admin/departments' },
    ],
  };

  const cardsMeta = {
    client: {
      title: 'Citizen Dashboard',
      subtitle: 'Track your complaints, notices, and status updates in one trusted portal.',
    },
    officer: {
      title: 'Officer Dashboard',
      subtitle: 'Manage assignments, review urgent notices, and update case progress.',
    },
    admin: {
      title: 'Admin Dashboard',
      subtitle: 'Oversee users, complaints, departments, and announcement management.',
    },
  };

  const roleCards = cards[role] || cards.client;
  const metadata = cardsMeta[role] || cardsMeta.client;

  return (
    <div className="page page-light dashboard-page">
      <Navbar />
      <div className="container py-24">
        <div className="dashboard-header">
          <div>
            <span className="dashboard-badge">Signed in as {role.toUpperCase()}</span>
            <h1 className="dashboard-title">Welcome back, {user?.name || 'Citizen'}</h1>
            <p className="dashboard-copy">{metadata.subtitle}</p>
          </div>
        </div>

        <div className="dashboard-stats-grid">
          {roleCards.map((card) => (
            <Link key={card.title} to={card.link} className="dashboard-stat-card">
              <p className="dashboard-stat-label">{card.title}</p>
              <p className="dashboard-stat-value">{card.value}</p>
            </Link>
          ))}
        </div>

        <div className="dashboard-main-grid">
          <div className="dashboard-main-col">
            <AnnouncementsPanel role={role} />
          </div>
          <div className="dashboard-side-col">
            {role === 'client' && (
              <div className="card dashboard-side-card">
                <p className="dashboard-side-label">My Complaints</p>
                <div className="dashboard-timeline-item">
                  <div>
                    <p className="dashboard-item-title">Water supply issue</p>
                    <p className="dashboard-item-meta">Complaint ID: #CMP-1042</p>
                  </div>
                  <span className="pill pill-warning">In progress</span>
                </div>
                <div className="dashboard-timeline-item">
                  <div>
                    <p className="dashboard-item-title">Road maintenance request</p>
                    <p className="dashboard-item-meta">Complaint ID: #CMP-1018</p>
                  </div>
                  <span className="pill pill-success">Resolved</span>
                </div>
              </div>
            )}

            {role === 'officer' && (
              <div className="card dashboard-side-card">
                <p className="dashboard-side-label">Officer Actions</p>
                <div className="dashboard-action-group">
                  <Link to="/officer/assigned" className="dashboard-action-card">
                    <h3>Assigned complaints</h3>
                    <p>Open your current case queue.</p>
                  </Link>
                  <Link to="/profile" className="dashboard-action-card">
                    <h3>Update profile</h3>
                    <p>Keep your duty and contact details current.</p>
                  </Link>
                </div>
              </div>
            )}

            {role === 'admin' && (
              <div className="card dashboard-side-card">
                <p className="dashboard-side-label">Admin controls</p>
                <div className="dashboard-action-group">
                  <Link to="/admin/users" className="dashboard-action-card">
                    <h3>Manage users</h3>
                    <p>Approve officers and support accounts.</p>
                  </Link>
                  <Link to="/admin/complaints" className="dashboard-action-card">
                    <h3>Review complaints</h3>
                    <p>Monitor high-priority issues in real time.</p>
                  </Link>
                </div>
              </div>
            )}

            <div className="card dashboard-side-card">
              <p className="dashboard-side-label">Quick notifications</p>
              <ul className="dashboard-notice-list">
                <li>Your next update is due within 24 hours.</li>
                <li>New announcement published for your district.</li>
                <li>Review pending approvals before end of day.</li>
              </ul>
            </div>
          </div>
        </div>

        {role === 'client' && (
          <div className="dashboard-summary-grid">
            <div className="card dashboard-summary-card">
              <p className="dashboard-summary-label">Complaint Status</p>
              <h3>Track progress</h3>
              <p>Monitor every stage of your grievance from submission to closure.</p>
            </div>
            <div className="card dashboard-summary-card">
              <p className="dashboard-summary-label">Recent Complaints</p>
              <h3>Last updates</h3>
              <p>Review the latest activity and stay informed.</p>
            </div>
            <div className="card dashboard-summary-card">
              <p className="dashboard-summary-label">Notifications</p>
              <h3>Personal reminders</h3>
              <p>Stay ahead with timely updates and required follow-ups.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
