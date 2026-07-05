import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adminService } from "../services/adminService";

const AssignOfficer = () => {
  const [complaints, setComplaints] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const complaintData = await adminService.getComplaints();
      const users = await adminService.getUsers();

      setComplaints(complaintData);

      setOfficers(users.filter((user) => user.role === "officer"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssign = async (complaintId) => {
    try {
      const officerId = selectedOfficer[complaintId];

      if (!officerId) {
        alert("Please select an officer.");
        return;
      }

      await adminService.assignOfficer(
        complaintId,
        officerId
      );

      alert("Officer assigned successfully.");

      fetchData();
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Unable to assign officer."
      );
    }
  };

  return (
    <div className="page-light">
      <Navbar />

      <main className="container py-24">

        <div className="users-header">
          <div>
            <span className="page-badge">
              ADMIN PANEL
            </span>

            <h1 className="users-title">
              👮 Assign Officers
            </h1>

            <p className="users-subtitle">
              Assign pending complaints to officers.
            </p>
          </div>
        </div>

        <div className="users-stats">

          <div className="user-stat-card">
            <div className="stat-icon blue">📄</div>

            <div>
              <h2>{complaints.length}</h2>
              <p>Total Complaints</p>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="stat-icon orange">⏳</div>

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
            <div className="stat-icon green">👮</div>

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

        </div>

        <div className="grid gap-6">

          {complaints.map((complaint) => (

            <div
              key={complaint._id}
              className="glass-card p-6"
            >

              <h2 className="text-xl font-semibold">
                {complaint.title}
              </h2>

              <p className="mt-2">
                {complaint.description}
              </p>

              <p className="mt-3">
                <strong>Status:</strong>{" "}
                {complaint.status}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {complaint.department?.departmentName ||
                  "Not Selected"}
              </p>

              <select
                className="form-input mt-4"
                value={
                  selectedOfficer[complaint._id] || ""
                }
                onChange={(e) =>
                  setSelectedOfficer({
                    ...selectedOfficer,
                    [complaint._id]:
                      e.target.value,
                  })
                }
              >

                <option value="">
                  Select Officer
                </option>

                {officers
                  .filter(
                    (officer) =>
                      officer.department?._id ===
                      complaint.department?._id
                  )
                  .map((officer) => (

                    <option
                      key={officer._id}
                      value={officer._id}
                    >
                      {officer.name}
                    </option>

                  ))}

              </select>

              <button
                className="btn btn-primary mt-4"
                onClick={() =>
                  handleAssign(complaint._id)
                }
              >
                Assign Officer
              </button>

            </div>

          ))}

        </div>

      </main>
    </div>
  );
};

export default AssignOfficer;