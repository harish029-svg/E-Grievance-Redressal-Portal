import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { officerService } from "../services/officerService";

const OfficerDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await officerService.getAssignedComplaints();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const assigned = complaints.length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <div className="page page-light">
      <Navbar />

      <div className="container py-24">

        {/* Header */}

        <div className="users-header">

          <div>

            <span className="page-badge">
              OFFICER PANEL
            </span>

            <h1 className="users-title">
              👮 Officer Dashboard
            </h1>

            <p className="users-subtitle">
              Track assigned complaints, update their status and resolve
              grievances efficiently.
            </p>

          </div>

          <Link
            to="/officer/assigned"
            className="add-user-btn"
          >
            📋 Assigned Cases
          </Link>

        </div>

        {loading ? (

          <div className="loading-card">
            Loading Dashboard...
          </div>

        ) : (

          <>

            {/* Statistics */}

            <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
    marginBottom: "40px",
  }}
>

              <div className="user-stat-card">

                <div className="stat-icon blue">
                  📋
                </div>

                <div>

                  <h2>{assigned}</h2>

                  <p>Assigned Cases</p>

                </div>

              </div>

              <div className="user-stat-card">

                <div className="stat-icon orange">
                  🚧
                </div>

                <div>

                  <h2>{inProgress}</h2>

                  <p>In Progress</p>

                </div>

              </div>

              <div className="user-stat-card">

                <div className="stat-icon green">
                  ✅
                </div>

                <div>

                  <h2>{resolved}</h2>

                  <p>Resolved</p>

                </div>

              </div>

            </div>

            {/* Quick Actions */}

           <div className="dashboard-actions">

              <Link
                to="/officer/assigned"
                className="dashboard-card"
              >

                <div className="dashboard-icon">
                  📂
                </div>

                <h3>
                  Assigned Complaints
                </h3>

                <p>
                  View all complaints assigned to you and update
                  their progress.
                </p>

                <span className="dashboard-link">
                  Open →
                </span>

              </Link>

              <Link
                to="/profile"
                className="dashboard-card"
              >

                <div className="dashboard-icon">
                  👤
                </div>

                <h3>
                  My Profile
                </h3>

                <p>
                  View and update your profile information.
                </p>

                <span className="dashboard-link">
                  Open →
                </span>

              </Link>

              
            </div>

          </>

        )}

      </div>

    </div>
  );
};

export default OfficerDashboard;