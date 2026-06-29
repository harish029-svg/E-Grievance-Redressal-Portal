import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { adminService } from '../services/adminService';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getComplaints().then((result) => setComplaints(result)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page page-light">
      <Navbar />
      <div className="container py-24">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Manage Complaints</h1>
        <p className="text-gray-600 mb-8">Review all submitted complaints from the admin panel.</p>

        {loading ? (
          <div className="glass-card p-8 text-center text-slate-700">Loading complaints...</div>
        ) : complaints.length === 0 ? (
          <div className="glass-card p-8 text-center text-slate-700">
            <p className="text-xl font-semibold">No complaints have been submitted yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="card">
                <h2 className="text-xl font-semibold text-slate-900">{complaint.title}</h2>
                <p className="text-gray-500 mt-2">Department: {complaint.department || 'Unassigned'}</p>
                <p className="text-gray-500 mt-2">Status: {complaint.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageComplaints;
