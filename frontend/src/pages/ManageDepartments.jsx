import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { adminService } from '../services/adminService';

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDepartments().then((result) => setDepartments(result)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page page-light">
      <Navbar />
      <div className="container py-24">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Manage Departments</h1>
        <p className="text-gray-600 mb-8">View and maintain portal departments.</p>

        {loading ? (
          <div className="glass-card p-8 text-center text-slate-700">Loading departments...</div>
        ) : (
          <div className="grid gap-6">
            {departments.map((department) => (
              <div key={department.id} className="card">
                <h2 className="text-xl font-semibold text-slate-900">{department.name}</h2>
                <p className="text-gray-500 mt-2">{department.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageDepartments;
