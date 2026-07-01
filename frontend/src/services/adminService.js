import api from '../utils/api';

export const adminService = {
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  getComplaints: async () => {
    const response = await api.get('/admin/complaints');
    return response.data;
  },
  getDepartments: async () => {
    const response = await api.get('/admin/departments');
    return response.data;
  },
  createDepartment: async (payload) => {
    const response = await api.post('/admin/departments', payload);
    return response.data;
  },
  deleteDepartment: async (departmentId) => {
    const response = await api.delete(`/admin/departments/${departmentId}`);
    return response.data;
  },
  updateComplaint: async (complaintId, payload) => {
    const response = await api.put(`/admin/complaints/${complaintId}`, payload);
    return response.data;
  },
};

export default adminService;
