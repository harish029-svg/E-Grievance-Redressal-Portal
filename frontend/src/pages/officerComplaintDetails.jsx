import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { officerService } from "../services/officerService";

const OfficerComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const data = await officerService.getComplaintById(id);

        setComplaint(data);
        setStatus(data.status);
        setRemarks(data.remarks || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await officerService.updateAssignedComplaint(id, {
        status,
        remarks,
      });

      alert("Complaint updated successfully.");
      navigate("/officer/assigned");
    } catch (error) {
      console.error(error);
      alert("Unable to update complaint.");
    }
  };

  if (loading) {
    return (
      <div className="page page-light">
        <Navbar />
        <div className="container py-24">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="page page-light">
      <Navbar />

      <div className="container py-24">

        {/* Header */}

        <div className="users-header" style={{ marginBottom: "35px" }}>

          <div>

            <span className="page-badge">
              OFFICER PANEL
            </span>

            <h1 className="users-title">
              Complaint Details
            </h1>

            <p className="users-subtitle">
              Review complaint details and update its status.
            </p>

          </div>

        </div>

        {/* Information Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "22px",
            marginBottom: "30px",
          }}
        >

          <div className="glass-card" style={{ padding: "22px" }}>
            <p className="text-gray-500">Title</p>

            <h3 style={{ marginTop: "10px" }}>
              {complaint.title}
            </h3>
          </div>

          <div className="glass-card" style={{ padding: "22px" }}>
            <p className="text-gray-500">Department</p>

            <h3 style={{ marginTop: "10px" }}>
              {complaint.department?.departmentName}
            </h3>
          </div>

          <div className="glass-card" style={{ padding: "22px" }}>
            <p className="text-gray-500">Priority</p>

            <span
              className={`priority-badge ${
                complaint.priority === "High"
                  ? "priority-high"
                  : complaint.priority === "Medium"
                  ? "priority-medium"
                  : "priority-low"
              }`}
            >
              {complaint.priority}
            </span>
          </div>

          <div className="glass-card" style={{ padding: "22px" }}>
            <p className="text-gray-500">Current Status</p>

            <span
              className={`status-badge ${
                complaint.status === "Resolved"
                  ? "status-active"
                  : complaint.status === "Assigned"
                  ? "role-admin"
                  : "role-officer"
              }`}
            >
              {complaint.status}
            </span>
          </div>

        </div>

        {/* Description */}

        <div
          className="glass-card"
          style={{
            padding: "24px",
            marginBottom: "30px",
          }}
        >

          <h3 style={{ marginBottom: "16px" }}>
            Description
          </h3>

          <p
            style={{
              color: "#64748b",
              lineHeight: "1.8",
            }}
          >
            {complaint.description}
          </p>

        </div>

        {/* Update Card */}

        <div
          className="glass-card"
          style={{
            padding: "24px",
          }}
        >

          <div style={{ marginBottom: "24px" }}>

            <label className="form-label">
              Update Status
            </label>

            <select
              className="form-input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </select>

          </div>

          <div style={{ marginBottom: "30px" }}>

            <label className="form-label">
              Officer Remarks
            </label>

            <textarea
              className="form-input"
              rows="5"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />

          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
            }}
          >

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/officer/assigned")}
            >
              Back
            </button>

            <button
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update Complaint
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default OfficerComplaintDetails;