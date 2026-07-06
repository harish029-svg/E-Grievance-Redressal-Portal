const ViewComplaintModal = ({ complaint, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal complaint-view-modal">

        <div className="modal-header">
          <h2>📋 Complaint Details</h2>
          <button className="close-icon" onClick={closeModal}>
            ✕
          </button>
        </div>

        <div className="complaint-details-grid">

          <div className="detail-card">
            <span>Title</span>
            <h4>{complaint.title}</h4>
          </div>

          <div className="detail-card">
            <span>Status</span>
            <h4>{complaint.status}</h4>
          </div>

          <div className="detail-card full-width">
            <span>Description</span>
            <p>{complaint.description}</p>
          </div>

          <div className="detail-card">
            <span>Citizen</span>
            <h4>{complaint.citizen?.name || "N/A"}</h4>
          </div>

          <div className="detail-card">
            <span>Email</span>
            <h4>{complaint.citizen?.email || "N/A"}</h4>
          </div>

          <div className="detail-card">
            <span>Department</span>
            <h4>{complaint.department?.departmentName || "Unassigned"}</h4>
          </div>

          <div className="detail-card">
            <span>Assigned Officer</span>
            <h4>{complaint.assignedOfficer?.name || "Not Assigned"}</h4>
          </div>

          <div className="detail-card">
            <span>Priority</span>
            <h4>{complaint.priority}</h4>
          </div>

          <div className="detail-card">
            <span>Location</span>
            <h4>{complaint.location}</h4>
          </div>

          <div className="detail-card full-width">
            <span>Submitted On</span>
            <h4>
              {new Date(complaint.createdAt).toLocaleString()}
            </h4>
          </div>

        </div>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={closeModal}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewComplaintModal;