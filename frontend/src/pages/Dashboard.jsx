import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
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

  const roleCards = cards[role] || cards.client;

  return (
    <div className="page page-light">
      <Navbar />
      <div className="container py-24">
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full bg-violet-100 px-4 py-1 text-sm font-semibold text-violet-700">
            Signed in as {role.toUpperCase()}
          </span>
          <h1 className="text-4xl font-bold text-slate-900 mt-6">Hello, {user?.name || 'User'}</h1>
          <p className="text-gray-600 mt-3">Your dashboard gives you a clean view of your role-specific work and tasks.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {roleCards.map((card) => (
            <Link key={card.title} to={card.link} className="card hover:-translate-y-1 transition-transform">
              <p className="text-sm uppercase tracking-[0.25em] text-violet-500">{card.title}</p>
              <p className="text-5xl font-bold text-slate-900 mt-5">{card.value}</p>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {role === 'client' && (
            <>
              <Link to="/raise-complaint" className="card glass-card">
                <h3 className="text-xl font-semibold text-white">Raise complaint</h3>
                <p className="text-gray-300 mt-3">Submit an issue and track it until resolution.</p>
              </Link>
              <Link to="/my-complaints" className="card glass-card">
                <h3 className="text-xl font-semibold text-white">My complaints</h3>
                <p className="text-gray-300 mt-3">Review your submitted grievances and updates.</p>
              </Link>
              <Link to="/profile" className="card glass-card">
                <h3 className="text-xl font-semibold text-white">Profile</h3>
                <p className="text-gray-300 mt-3">Manage your personal details and account settings.</p>
              </Link>
            </>
          )}
          {role === 'officer' && (
            <>
              <Link to="/officer/assigned" className="card glass-card">
                <h3 className="text-xl font-semibold text-white">Assigned complaints</h3>
                <p className="text-gray-300 mt-3">Resolve issues assigned to your team quickly.</p>
              </Link>
              <Link to="/profile" className="card glass-card">
                <h3 className="text-xl font-semibold text-white">Officer profile</h3>
                <p className="text-gray-300 mt-3">Update your duty details and availability.</p>
              </Link>
              <Link to="/dashboard" className="card glass-card">
                <h3 className="text-xl font-semibold text-white">Team status</h3>
                <p className="text-gray-300 mt-3">Monitor officer performance and priorities.</p>
              </Link>
            </>
          )}
          {role === 'admin' && (
            <>
              <Link to="/admin/users" className="card glass-card">
                <h3 className="text-xl font-semibold text-white">Manage users</h3>
                <p className="text-gray-300 mt-3">Add or review officers and client accounts.</p>
              </Link>
              <Link to="/admin/complaints" className="card glass-card">
                <h3 className="text-xl font-semibold text-white">Review complaints</h3>
                <p className="text-gray-300 mt-3">Oversee all active and resolved grievances.</p>
              </Link>
              <Link to="/admin/departments" className="card glass-card">
                <h3 className="text-xl font-semibold text-white">Department settings</h3>
                <p className="text-gray-300 mt-3">Maintain department assignments and workflows.</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
