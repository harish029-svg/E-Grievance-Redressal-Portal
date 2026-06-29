import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roles = [
  { value: 'client', label: 'Client' },
  { value: 'officer', label: 'Officer' },
  { value: 'admin', label: 'Admin' },
];

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('Public Works');
  const [role, setRole] = useState('client');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password, department, role });
      const destination = role === 'client' ? '/dashboard' : role === 'officer' ? '/officer' : '/admin';
      navigate(destination);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page page-center">
      <div className="glass-card" style={{ maxWidth: '520px', width: '100%' }}>
        <h1 className="text-4xl font-bold mb-4">Create your account</h1>
        <p className="text-gray-400 mb-6">Register as client, officer, or admin to access your dashboard.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="form-group">
            <span className="form-label">Role</span>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="form-input">
              {roles.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="form-group">
            <span className="form-label">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
              placeholder="John Doe"
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
            />
          </label>
          <label className="form-group">
            <span className="form-label">Department</span>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="form-input"
              placeholder="e.g. Water, Traffic, Health"
            />
          </label>
          {error && <p className="text-error text-sm">{error}</p>}
          <button type="submit" className="btn btn-accent btn-lg" disabled={loading}>
            {loading ? 'Registering…' : 'Sign Up'}
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-300 hover:text-blue-100">
            Sign in.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
