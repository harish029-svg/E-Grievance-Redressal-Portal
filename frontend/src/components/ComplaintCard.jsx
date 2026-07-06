import { Link } from "react-router-dom";

const ComplaintCard = ({ complaint, onDelete }) => {
  const user = JSON.parse(localStorage.getItem("egp-user"));

  const detailsLink =
    user?.role === "officer"
      ? `/officer/complaint/${complaint._id}`
      : `/complaint/${complaint._id}`;

  return (
    <div
      className="glass-card"
      style={{
        width: "100%",
        margin: 0,
        padding: "22px",
        borderRadius: "18px",
        minHeight: "250px",
        border: "1px solid #edf2f7",
        boxShadow: "0 10px 25px rgba(0,0,0,.06)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "15px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: "700",
              color: "#0f172a",
              lineHeight: "1.2",
            }}
          >
            {complaint.title}
          </h2>

          <p
            style={{
              margin: "8px 0 0",
              fontSize: "15px",
              color: "#64748b",
            }}
          >
            {complaint.department?.departmentName ||
              "Department Not Assigned"}
          </p>
        </div>

        <span
          className={`status-badge ${
            complaint.status === "Resolved"
              ? "status-active"
              : complaint.status === "Assigned"
              ? "role-admin"
              : "role-officer"
          }`}
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {complaint.status}
        </span>
      </div>

      {/* Description */}

      <p
        style={{
          color: "#475569",
          fontSize: "15px",
          lineHeight: "1.6",
          margin: "20px 0",
          minHeight: "48px",
          overflow: "hidden",
        }}
      >
        {complaint.description}
      </p>

      {/* Footer */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "#f8fafc",
              padding: "8px 16px",
              borderRadius: "20px",
              fontWeight: "600",
              fontSize: "14px",
              color: "#475569",
            }}
          >
            {complaint.priority}
          </span>

          <span
            style={{
              background: "#f8fafc",
              padding: "8px 16px",
              borderRadius: "20px",
              fontWeight: "600",
              fontSize: "14px",
              color: "#475569",
            }}
          >
            {new Date(complaint.createdAt).toLocaleDateString()}
          </span>
        </div>

        {user?.role === "officer" ? (
          <Link
            to={detailsLink}
            style={{
              background:
                "linear-gradient(135deg,#7c3aed,#4f46e5)",
              color: "#fff",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "14px",
              whiteSpace: "nowrap",
            }}
          >
            View Details
          </Link>
        ) : (
          <button
            className="delete-btn"
            onClick={() => onDelete(complaint._id)}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "14px",
              whiteSpace: "nowrap",
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;