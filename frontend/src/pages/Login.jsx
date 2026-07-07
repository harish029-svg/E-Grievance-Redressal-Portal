import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ShieldCheck,
  User,
  Mail,
  Lock,
  ArrowRight
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login({ email, password });

      if (user.role === "citizen") {
        navigate("/dashboard");
      } else if (user.role === "officer") {
        navigate("/officer");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
  className="page page-center"
  style={{
    minHeight: "100vh",
    background:
  "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #F8FAFC 100%)",
    position: "relative",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "2rem",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  }}
>
      {/* Decorative Circles */}
      <div
        style={{
          position: "absolute",
          top: "70px",
          left: "70px",
          width: "80px",
          height: "80px",
          border: "2px solid rgba(37,99,235,.25)",
          borderRadius: "50%",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "60px",
          right: "90px",
          width: "30px",
          height: "30px",
          border: "2px solid rgba(37,99,235,.25)",
          borderRadius: "50%",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          margin: "0 auto",
        }}
      >
        {/* Logo Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "24px",
background: "#EFF6FF",              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 20px",
            }}
          >
            <ShieldCheck size={48} color="#2563EB" />
          </div>

          <h1
            style={{
              fontSize: "clamp(2.3rem, 5vw, 3.6rem)",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            <span style={{ color: "#2563EB" }}>
              E-Grievance
            </span>{" "}
            <span style={{ color: "#fff" }}>Portal</span>
          </h1>

          <p style={{ color: "#64748B" }}>
            Redressal Portal
          </p>
        </div>

        {/* Login Card */}
        <div
          className="glass-card"
          style={{
            padding: "2rem",
            border: "1px solid #E2E8F0",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "#EFF6FF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <User size={32} color="#2563EB" />
            </div>

            <div>
              <h2
                style={{
                  color: "#183153",
                  fontSize: "clamp(2rem,4vw,2.7rem)",
                  fontWeight: "700",
                  margin: 0,
                }}
              >
                Welcome back
              </h2>

              <p
                style={{
                  color: "#64748B",
                  marginTop: "8px",
                }}
              >
                Sign in to access your dashboard.
              </p>
            </div>
          </div>

          <hr className="divider" />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                Email Address
              </label>

              <div style={{ position: "relative" }}>
                <Mail size={20} className="input-icon" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  placeholder="you@example.com"
                  className="form-input"
                  autoComplete="email"
                  style={{
                    height: "60px",
                    paddingLeft: "55px",
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">
                Password
              </label>

              <div style={{ position: "relative" }}>
                <Lock size={20} className="input-icon" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  placeholder="Enter your password"
                  className="form-input"
                  autoComplete="current-password"
                  style={{
                    height: "60px",
                    paddingLeft: "55px",
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>

            {error && (
              <p
                style={{
                  color: "#ef4444",
                  marginBottom: "1rem",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                height: "62px",
                border: "none",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg,#2563EB,#3B82F6)",
                color: "#fff",
                fontSize: "1.1rem",
                fontWeight: "600",
                marginTop: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight size={22} />}
            </button>
          </form>

          {/* Register */}
          <p
            style={{
              textAlign: "center",
              color: "#64748B",
              marginTop: "2rem",
            }}
          >
            Need an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#2563EB",
                fontWeight: "600",
              }}
            >
              Sign up now.
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            color: "#64748b",
            marginTop: "2rem",
          }}
        >
          Secure • Transparent • Reliable
        </div>
      </div>
    </div>
  );
};

export default Login;