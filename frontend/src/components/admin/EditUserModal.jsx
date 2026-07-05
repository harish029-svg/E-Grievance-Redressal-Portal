import { useState } from "react";
import adminService from "../../services/adminService";

const EditUserModal = ({ user, closeModal, refreshUsers }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    role: user.role || "citizen",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await adminService.updateUser(user._id, formData);
      alert("User updated successfully");
      refreshUsers();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="edit-modal">

        <h2>✏ Edit User</h2>

        <form onSubmit={handleSubmit} className="edit-user-form">

          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="citizen">Citizen</option>
              <option value="officer">Officer</option>
            </select>

          </div>

          <div className="edit-modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditUserModal;