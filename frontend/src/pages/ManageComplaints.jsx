import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adminService } from "../services/adminService";
import ViewComplaintModal from "../components/admin/ViewComplaintModal";
import AssignOfficerModal from "../components/admin/AssignOfficerModal";
import "../styles/admin.css";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [assignComplaint, setAssignComplaint] = useState(null);

  const fetchComplaints = async () => {
    try {
      const data = await adminService.getComplaints();
      setComplaints(data);
      setFilteredComplaints(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    const result = complaints.filter((complaint) =>
      complaint.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredComplaints(result);
  }, [search, complaints]);

  return (
    <div className="page page-light">
      <Navbar />

      <div className="container py-24">

        {/* Header */}

        <div className="users-header">

          <div>

            <span className="page-badge">
              ADMIN PANEL
            </span>

            <h1 className="users-title">
              📋 Complaint Management
            </h1>

            <p className="users-subtitle">
              Review, assign and monitor all complaints.
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="search-box">

          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Stats */}

        <div className="users-stats">

          <div className="user-stat-card">
            <div className="stat-icon blue">📄</div>

            <div>
              <h2>{complaints.length}</h2>
              <p>Total</p>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="stat-icon yellow">🟡</div>

            <div>
              <h2>
                {
                  complaints.filter(
                    (c) => c.status === "Pending"
                  ).length
                }
              </h2>

              <p>Pending</p>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="stat-icon blue">👮</div>

            <div>
              <h2>
                {
                  complaints.filter(
                    (c) => c.status === "Assigned"
                  ).length
                }
              </h2>

              <p>Assigned</p>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="stat-icon green">✅</div>

            <div>
              <h2>
                {
                  complaints.filter(
                    (c) => c.status === "Resolved"
                  ).length
                }
              </h2>

              <p>Resolved</p>
            </div>
          </div>

        </div>

        {/* Table */}

        {loading ? (

          <div className="loading-card">
            Loading complaints...
          </div>

        ) : (

          <div className="users-card">

            <div className="users-table-container">

              <table className="users-table">

                <thead>

                  <tr>
                    <th>Title</th>
                    <th>Citizen</th>
                    <th>Department</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredComplaints.length > 0 ? (

                    filteredComplaints.map((complaint) => (

                      <tr key={complaint._id}>

                        <td>{complaint.title}</td>

                        <td>
                          {complaint.citizen?.name || "N/A"}
                        </td>

                        <td>
                          {complaint.department?.departmentName ||
                            "Unassigned"}
                        </td>

                        <td>

                          <span
                            className={`priority-badge ${
                              complaint.priority === "High"
                                ? "high"
                                : complaint.priority === "Medium"
                                ? "medium"
                                : "low"
                            }`}
                          >
                            {complaint.priority}
                          </span>

                        </td>

                        <td>

                          <span
                            className={`status-badge ${
                              complaint.status === "Pending"
                                ? "pending"
                                : complaint.status === "Assigned"
                                ? "assigned"
                                : complaint.status === "In Progress"
                                ? "progress"
                                : complaint.status === "Resolved"
                                ? "resolved"
                                : "rejected"
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

                        <td>

                          <div className="table-actions">

                            <button
                              className="view-btn"
                              onClick={() =>
                                setSelectedComplaint(complaint)
                              }
                            >
                              👁 View
                            </button>

                            <button
                              className="edit-btn"
                              onClick={() =>
                                setAssignComplaint(complaint)
                              }
                            >
                              👮 Assign
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        No complaints found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

        {selectedComplaint && (

          <ViewComplaintModal
            complaint={selectedComplaint}
            closeModal={() =>
              setSelectedComplaint(null)
            }
          />

        )}

        {assignComplaint && (

          <AssignOfficerModal
            complaint={assignComplaint}
            closeModal={() =>
              setAssignComplaint(null)
            }
            refreshComplaints={fetchComplaints}
          />

        )}

      </div>
    </div>
  );
};

export default ManageComplaints;
