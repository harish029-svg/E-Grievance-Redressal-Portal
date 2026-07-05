const ViewUserModal = ({ user, closeModal }) => {
  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>User Details</h2>

        <div className="user-details">

          <p><strong>Name:</strong> {user.name}</p>

          <p><strong>Email:</strong> {user.email}</p>

          <p><strong>Phone:</strong> {user.phone || "N/A"}</p>

          <p><strong>Address:</strong> {user.address || "N/A"}</p>

          <p><strong>Role:</strong> {user.role}</p>

          <p>
            <strong>Department:</strong>{" "}
            {user.department?.departmentName ||
              user.department ||
              "N/A"}
          </p>

        </div>

        <div className="modal-buttons">

          <button onClick={closeModal}>
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default ViewUserModal;