import { useState, useEffect } from "react";import adminService from "../../services/adminService";

const AddUserModal = ({ closeModal, refreshUsers }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "citizen",
    department: "",
  });
  const [departments, setDepartments] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const data = await adminService.getDepartments();
      setDepartments(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchDepartments();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await adminService.createUser(form);

      alert("User created successfully");

      refreshUsers();

      closeModal();
    } catch (err) {
  console.log(err);

  console.log("Status:", err.response?.status);
  console.log("Data:", err.response?.data);

  alert(JSON.stringify(err.response?.data));
}
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Add New User</h2>

        <form onSubmit={handleSubmit} className="user-form">

  <div className="form-group">
    <label>Full Name</label>
    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Enter full name"
      required
    />
  </div>

  <div className="form-group">
    <label>Email</label>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Enter email"
      required
    />
  </div>

  <div className="form-group">
    <label>Password</label>
    <input
      type="password"
      name="password"
      value={form.password}
      onChange={handleChange}
      placeholder="Enter password"
      required
    />
  </div>

  <div className="form-group">
    <label>Phone</label>
    <input
      type="text"
      name="phone"
      value={form.phone}
      onChange={handleChange}
      placeholder="Phone Number"
    />
  </div>

  <div className="form-group">
    <label>Address</label>
    <input
      type="text"
      name="address"
      value={form.address}
      onChange={handleChange}
      placeholder="Address"
    />
  </div>

  <div className="form-group">
    <label>Role</label>
    <select
      name="role"
      value={form.role}
      onChange={handleChange}
    >
      <option value="citizen">Citizen</option>
      <option value="officer">Officer</option>
    </select>
  </div>

  {form.role === "officer" && (
    <div className="form-group">
      <label>Department</label>
      <select
        name="department"
        value={form.department}
        onChange={handleChange}
      >
        <option value="">Select Department</option>

        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.departmentName}
          </option>
        ))}
      </select>
    </div>
  )}

  <div className="modal-buttons">
    <button type="submit" className="save-btn">
      Create User
    </button>

    <button
      type="button"
      className="cancel-btn"
      onClick={closeModal}
    >
      Cancel
    </button>
  </div>

</form>

      </div>

    </div>
  );
};

export default AddUserModal;