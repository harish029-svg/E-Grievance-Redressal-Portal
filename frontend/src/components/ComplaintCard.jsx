import { Link } from 'react-router-dom';

const ComplaintCard = ({ complaint }) => {
  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h3 className="text-white text-xl font-semibold">{complaint.title}</h3>
          <p className="text-muted text-sm mt-2">{complaint.department || 'General'}</p>
        </div>
        <span className="text-xs uppercase tracking-[0.18em] font-semibold" style={{ color: complaint.status === 'Resolved' ? '#10B981' : '#FBBF24' }}>
          {complaint.status}
        </span>
      </div>
      <p className="text-gray-300 text-sm mb-4">{complaint.description?.slice(0, 120)}...</p>
      <div className="flex items-center justify-between gap-4 text-sm text-gray-400">
        <span>Priority: {complaint.priority || 'Medium'}</span>
        <Link
          to={`/complaint/${complaint._id || complaint.id}`}
          className="btn btn-outline btn-sm"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default ComplaintCard;
