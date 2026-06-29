import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ComplaintCard from '../components/ComplaintCard';
import { complaintService } from '../services/complaintService';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    complaintService
      .getUserComplaints()
      .then((result) => setComplaints(result))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page page-light">
      <Navbar />
      <div className="container py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Complaints</h1>
          <p className="text-gray-600 mt-2">Review the status of the complaints you have submitted.</p>
        </div>

        {loading ? (
          <div className="glass-card p-8 text-center text-slate-700">Loading complaints...</div>
        ) : complaints.length === 0 ? (
          <div className="glass-card p-8 text-center text-slate-700">
            <p className="text-xl font-semibold">No complaints found yet.</p>
            <p className="text-gray-500 mt-2">Submit a new grievance from your dashboard.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {complaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
