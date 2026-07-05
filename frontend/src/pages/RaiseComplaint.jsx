import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { complaintService } from "../services/complaintService";
import { adminService } from "../services/adminService";

const RaiseComplaint = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await adminService.getDepartments();
        setDepartments(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await complaintService.createComplaint({
        title,
        department,
        location,
        priority,
        description,
      });

      navigate("/my-complaints");
    } catch (err) {
  console.log(err.response);

  setError(
    err?.response?.data?.message ||
    err.message ||
    "Unable to submit complaint."
  );
}finally {
      setLoading(false);
    }
  };

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
              📝 Raise a Complaint
            </h1>

            <p className="users-subtitle">
              Submit your grievance and track its progress in real time.
            </p>

          </div>

        </div>

        {/* Form */}

        <div className="card max-w-4xl mx-auto complaint-form-card">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="grid md:grid-cols-2 gap-5">

              {/* Title */}

              <div className="form-group">

                <label className="form-label">
                  📝 Complaint Title
                </label>

                <input
                  type="text"
                  className="form-input"
                  placeholder="Brief summary of your issue"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                />

              </div>

              {/* Department */}

              <div className="form-group">

                <label className="form-label">
                  🏢 Department
                </label>

                <select
                  className="form-input"
                  value={department}
                  onChange={(e) =>
                    setDepartment(e.target.value)
                  }
                  required
                >
                  <option value="">
                    Select Department
                  </option>

                  {departments.map((dept) => (

                    <option
                      key={dept._id}
                      value={dept._id}
                    >
                      {dept.departmentName}
                    </option>

                  ))}

                </select>

              </div>

              {/* Location */}

              <div className="form-group">

                <label className="form-label">
                  📍 Location
                </label>

                <input
                  type="text"
                  className="form-input"
                  placeholder="Complaint location"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  required
                />

              </div>

              {/* Priority */}

              <div className="form-group">

                <label className="form-label">
                  ⚡ Priority
                </label>

                <div className="priority-buttons">

                  <button
                    type="button"
                    className={`priority-btn ${
                      priority === "Low"
                        ? "priority-low active"
                        : ""
                    }`}
                    onClick={() =>
                      setPriority("Low")
                    }
                  >
                    🟢 Low
                  </button>

                  <button
                    type="button"
                    className={`priority-btn ${
                      priority === "Medium"
                        ? "priority-medium active"
                        : ""
                    }`}
                    onClick={() =>
                      setPriority("Medium")
                    }
                  >
                    🟡 Medium
                  </button>

                  <button
                    type="button"
                    className={`priority-btn ${
                      priority === "High"
                        ? "priority-high active"
                        : ""
                    }`}
                    onClick={() =>
                      setPriority("High")
                    }
                  >
                    🔴 High
                  </button>

                </div>

              </div>

            </div>

            {/* Upload */}

            <div className="form-group">

              <label className="form-label">
                📷 Upload Supporting Image (Optional)
              </label>

              <label className="upload-box">

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setImage(e.target.files[0])
                  }
                />

                <div className="upload-content">

                  <div className="upload-icon">
                    📁
                  </div>

                  <div>

                    <h4>
                      Click to upload
                    </h4>

                    <p>
                      JPG, PNG (Max 5 MB)
                    </p>

                  </div>

                </div>

                {image && (

                  <div className="selected-file">
                    ✅ {image.name}
                  </div>

                )}

              </label>

            </div>

            {/* Description */}

            <div className="form-group">

              <label className="form-label">
                📄 Complaint Description
              </label>

              <textarea
                rows="7"
                className="form-input"
                placeholder="Describe your issue in detail..."
                value={description}
                maxLength={500}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              />

              <p
                style={{
                  textAlign: "right",
                  marginTop: "8px",
                  color: "#64748B",
                  fontSize: "14px",
                }}
              >
                {description.length}/500 Characters
              </p>

            </div>

            {/* Error */}

            {error && (

              <div className="rounded-xl bg-red-100 border border-red-300 p-4 text-red-700">
                {error}
              </div>

            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading
                ? "Submitting Complaint..."
                : "🚀 Submit Complaint"}
            </button>

          </form>

        </div>

      </main>
    </div>
  );
};

export default RaiseComplaint;