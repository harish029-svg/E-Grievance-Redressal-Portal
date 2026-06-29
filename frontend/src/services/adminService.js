const loadComplaints = () => {
  const stored = localStorage.getItem('egp-complaints');
  return stored ? JSON.parse(stored) : [];
};

const loadUsers = () => {
  const stored = localStorage.getItem('egp-users');
  return stored ? JSON.parse(stored) : [];
};

export const adminService = {
  getUsers: async () => loadUsers(),
  getComplaints: async () => loadComplaints(),
  getDepartments: async () => [
    { id: 'department-1', name: 'Public Works', description: 'Roads, streetlights, civic maintenance' },
    { id: 'department-2', name: 'Health', description: 'Public health, sanitation, safety' },
    { id: 'department-3', name: 'Traffic', description: 'Traffic control and road safety' },
  ],
  createDepartment: async (payload) => ({ id: `department-${Date.now()}`, ...payload }),
  deleteDepartment: async () => true,
};

export default adminService;
