import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page page-light">
      <Navbar />
      <div className="container py-24">
        <div className="glass-card max-w-3xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Profile</h1>
          <p className="text-gray-600 mb-8">Update your profile details and review account information.</p>
          <div className="grid gap-4">
            <div className="card">
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-xl font-semibold text-slate-900">{user?.name || 'Citizen'}</p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-xl font-semibold text-slate-900">{user?.email || 'not available'}</p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-xl font-semibold text-slate-900">{user?.role || 'citizen'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="btn btn-outline btn-lg mt-8"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
