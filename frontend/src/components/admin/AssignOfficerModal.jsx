import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

const AssignOfficerModal = ({
  complaint,
  closeModal,
  refreshComplaints,
}) => {
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await adminService.getUsers();

        setOfficers(
          users.filter((user) => user.role === "officer")
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  const handleAssign = async () => {
    if (!selectedOfficer) {
      return alert("Please select an officer.");
    }

    try {
      await adminService.assignOfficer(
        complaint._id,
        selectedOfficer
      );

      alert("Officer assigned successfully.");

      refreshComplaints();

      closeModal();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to assign officer."
      );
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal assign-modal">

        <h2>👮 Assign Officer</h2>

       <div className="assign-summary">

  <div className="summary-card">
    <span>Complaint</span>
    <h4>{complaint.title}</h4>
  </div>

  <div className="summary-card">
    <span>Department</span>
    <h4>
      {complaint.department?.departmentName || "Unassigned"}
    </h4>
  </div>

</div>

        <div className="form-group">

          <label>Select Officer</label>

          <select
            value={selectedOfficer}
            onChange={(e) =>
              setSelectedOfficer(e.target.value)
            }
          >
            <option value="">
              -- Select Officer --
            </option>

            {officers.map((officer) => (
              <option
                key={officer._id}
                value={officer._id}
              >
                {officer.name}
              </option>
            ))}
          </select>

        </div>

        <div className="modal-buttons">

          <button
            className="save-btn"
            onClick={handleAssign}
          >
            Assign
          </button>

          <button
            className="cancel-btn"
            onClick={closeModal}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default AssignOfficerModal;