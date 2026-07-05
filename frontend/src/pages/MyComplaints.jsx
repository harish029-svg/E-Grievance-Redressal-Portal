import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ComplaintCard from "../components/ComplaintCard";
import { complaintService } from "../services/complaintService";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    complaintService
      .getUserComplaints()
      .then((result) => setComplaints(result))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      await complaintService.deleteComplaint(id);

      setComplaints((prev) =>
        prev.filter((complaint) => complaint._id !== id)
      );
    } catch (err) {
      alert("Unable to delete complaint.");
    }
  };

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-light">
      <Navbar />

      <main className="container py-24">

        {/* Header */}

        <div className="users-header">

          <div>
            <span className="page-badge">
              CITIZEN PORTAL
            </span>

            <h1 className="users-title">
              📋 My Complaints
            </h1>

            <p className="users-subtitle">
              View, manage and track all the complaints you have submitted.
            </p>
          </div>

        </div>

        {/* Search */}

        <div
          className="complaint-toolbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            margin: "35px 0",
          }}
        >

          <div style={{ flex: 1 }}>

            <input
              type="text"
              placeholder="Search by complaint title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "14px",
                border: "1px solid #dbe4f0",
                padding: "0 20px",
                fontSize: "16px",
                outline: "none",
                background: "#fff",
              }}
            />

          </div>

          <div
            style={{
              background: "#eef4ff",
              color: "#2563eb",
              padding: "16px 24px",
              borderRadius: "14px",
              fontWeight: "600",
              whiteSpace: "nowrap",
            }}
          >
            {filteredComplaints.length} Complaint
            {filteredComplaints.length !== 1 ? "s" : ""}
          </div>

        </div>

        {/* Loading */}

        {loading ? (
          <div className="card text-center p-10">
            <h3>Loading complaints...</h3>
          </div>
        ) : filteredComplaints.length === 0 ? (

          <div className="card text-center p-12">

            <div style={{ fontSize: "55px" }}>
              📂
            </div>

            <h2 className="text-2xl font-bold mt-4">
              No Complaints Found
            </h2>

            <p className="text-gray-500 mt-2">
              {search
                ? "No complaint matches your search."
                : "You haven't submitted any complaints yet."}
            </p>

          </div>

        ) : (

          <div
            className="complaints-list"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "28px",
              alignItems: "stretch",
            }}
          >

            {filteredComplaints.map((complaint) => (

              <ComplaintCard
                key={complaint._id}
                complaint={complaint}
                onDelete={handleDelete}
              />

            ))}

          </div>

        )}

      </main>
    </div>
  );
};

export default MyComplaints;