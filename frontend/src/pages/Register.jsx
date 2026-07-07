import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({
        name,
        email,
        password,
        phone,
        address,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page page-center">
      <div
        className="glass-card"
        style={{ maxWidth: "520px", width: "100%" }}
      >
        <h1 className="text-4xl font-bold mb-4">
          Create your account
        </h1>

        <p className="text-gray-400 mb-6">
          Register to access the Citizen Dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <label className="form-group">
            <span className="form-label">Full Name</span>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
              placeholder="John Doe"
              autoComplete="name"
            />
          </label>

          <label className="form-group">
            <span className="form-label">Email</span>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className="form-group">
            <span className="form-label">Phone</span>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="form-input"
              placeholder="9876543210"
            />
          </label>

          <label className="form-group">
            <span className="form-label">Address</span>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your address"
            />
          </label>

          <label className="form-group">
            <span className="form-label">Password</span>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Create a strong password"
              autoComplete="new-password"
            />
          </label>

          {error && (
            <p className="text-error text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-accent btn-lg"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

        </form>

        <p className="text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-300 hover:text-blue-100"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
