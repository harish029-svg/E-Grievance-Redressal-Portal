import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { complaintService } from '../services/complaintService';

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    complaintService
      .getComplaintById(id)
      .then((result) => setComplaint(result))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="page page-light">
      <Navbar />
      <div className="container py-24">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Complaint details</h1>
            <p className="text-gray-600 mt-2">See the latest status and full complaint summary.</p>
          </div>
          <Link to="/my-complaints" className="btn btn-outline btn-sm">
            Back to complaints
          </Link>
        </div>

        {loading ? (
          <div className="glass-card p-8 text-center text-slate-700">Loading complaint details...</div>
        ) : !complaint ? (
          <div className="glass-card p-8 text-center text-slate-700">
            <p className="text-xl font-semibold">Complaint not found</p>
            <p className="text-gray-500 mt-2">Double-check the complaint link or return to your dashboard.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">{complaint.title}</h2>
              <p className="text-gray-600 leading-relaxed">{complaint.description}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
               <div className="card">

  <p className="text-sm text-gray-500">
    Department
  </p>

  <p className="text-lg font-semibold text-slate-900">
    {complaint.department?.departmentName ||
      "Department Not Assigned"}
  </p>

</div>
                <div className="card">
                  <p className="text-sm text-gray-500">Priority</p>
                  <p className="text-lg font-semibold text-slate-900">{complaint.priority}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-lg font-semibold text-slate-900">{complaint.status}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="text-lg font-semibold text-slate-900">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-8 bg-slate-950/70">
              <h3 className="text-xl font-semibold text-white mb-4">Support update</h3>
              <p className="text-gray-300">Our team is reviewing your request and will respond with a resolution plan soon. This is a front-end demo view of the complaint workflow.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetails;
