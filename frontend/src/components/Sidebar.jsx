import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="hidden lg:block w-72 sticky top-24 h-[calc(100vh-6rem)]">
    <div className="glass-card p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">Dashboard menu</h2>
      <nav className="space-y-3 text-gray-300">
        <Link to="/dashboard" className="block hover:text-white">Overview</Link>
        <Link to="/raise-complaint" className="block hover:text-white">Raise Complaint</Link>
        <Link to="/my-complaints" className="block hover:text-white">My Complaints</Link>
        <Link to="/profile" className="block hover:text-white">Profile</Link>
      </nav>
    </div>
  </aside>
);

export default Sidebar;
