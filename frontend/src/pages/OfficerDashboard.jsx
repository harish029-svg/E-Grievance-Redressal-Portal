import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const OfficerDashboard = () => (
  <div className="page page-light">
    <Navbar />
    <div className="container py-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Officer Dashboard</h1>
        <p className="text-gray-600 mt-3">Track assigned cases, update statuses, and stay on top of workflows.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3 mb-10">
        <div className="card">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-500">Assigned cases</p>
          <p className="text-5xl font-bold text-slate-900 mt-5">8</p>
        </div>
        <div className="card">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-500">In progress</p>
          <p className="text-5xl font-bold text-slate-900 mt-5">4</p>
        </div>
        <div className="card">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-500">Resolved today</p>
          <p className="text-5xl font-bold text-slate-900 mt-5">2</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Link to="/officer/assigned" className="card glass-card p-8">
          <h3 className="text-xl font-semibold text-white">Assigned complaints</h3>
          <p className="text-gray-300 mt-3">Open the queue and update ticket progress.</p>
        </Link>
        <Link to="/profile" className="card glass-card p-8">
          <h3 className="text-xl font-semibold text-white">Officer profile</h3>
          <p className="text-gray-300 mt-3">Keep your profile and department details current.</p>
        </Link>
        <div className="card glass-card p-8">
          <h3 className="text-xl font-semibold text-white">Daily briefing</h3>
          <p className="text-gray-300 mt-3">Your latest ticket assignment summary and performance overview.</p>
        </div>
      </div>
    </div>
  </div>
);

export default OfficerDashboard;
