import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { complaintService } from '../services/complaintService';

const RaiseComplaint = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await complaintService.createComplaint({ title, department, description, priority });
      navigate('/my-complaints');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to submit complaint.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page-light">
      <Navbar />
      <div className="container py-24">
        <div className="glass-card max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Raise a Complaint</h1>
          <p className="text-gray-600 mb-8">Provide details about your grievance and submit it for review.</p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="form-group">
              <span className="form-label">Complaint title</span>
              <input
                className="form-input"
                placeholder="Brief summary of your issue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label className="form-group">
              <span className="form-label">Department</span>
              <input
                className="form-input"
                placeholder="e.g. Public Works, Traffic, Health"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </label>
            <label className="form-group">
              <span className="form-label">Priority</span>
              <select
                className="form-input"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
            <label className="form-group">
              <span className="form-label">Description</span>
              <textarea
                className="form-input"
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail"
                required
              />
            </label>
            {error && <p className="text-error text-sm">{error}</p>}
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Submitting…' : 'Submit Complaint'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RaiseComplaint;
