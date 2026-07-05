import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { officerService } from "../services/officerService";

const AssignedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    officerService
      .getAssignedComplaints()
      .then((result) => setComplaints(result))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page page-light">
      <Navbar />

      <div className="container py-24">

        {/* Header */}
        <div
          className="users-header"
          style={{ marginBottom: "40px" }}
        >
          <div>
            <span className="page-badge">
              OFFICER PANEL
            </span>

            <h1 className="users-title">
              Assigned Complaints
            </h1>

            <p className="users-subtitle">
              View, monitor and update the complaints assigned to you.
            </p>
          </div>

          <div
            style={{
              background: "#eef2ff",
              color: "#4338ca",
              padding: "12px 22px",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "15px",
              boxShadow: "0 6px 18px rgba(0,0,0,.08)",
            }}
          >
            Total Assigned: {complaints.length}
          </div>
        </div>

        {loading ? (
          <div className="glass-card p-8 text-center">
            Loading assigned complaints...
          </div>
        ) : complaints.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <h3>No Assigned Complaints</h3>
            <p>No complaints are assigned to you yet.</p>
          </div>
        ) : (
          <div
            className="users-card"
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              className="users-table-container"
              style={{
                overflowX: "auto",
              }}
            >
              <table className="users-table">

                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th style={{ textAlign: "center" }}>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {complaints.map((complaint) => (
                    <tr key={complaint._id}>

                      <td>
                        <strong
                          style={{
                            fontSize: "16px",
                            color: "#1e293b",
                          }}
                        >
                          {complaint.title}
                        </strong>
                      </td>

                      <td>
                        {complaint.department?.departmentName}
                      </td>

                      <td>
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
                      </td>

                      <td>
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
                      </td>

                      <td>
                        {new Date(
                          complaint.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <Link
                          to={`/officer/complaint/${complaint._id}`}
                          className="btn btn-primary"
                          style={{
                            padding: "9px 18px",
                            borderRadius: "10px",
                            fontSize: "14px",
                            textDecoration: "none",
                          }}
                        >
                          View Details
                        </Link>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AssignedComplaints;