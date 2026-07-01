import api from '../utils/api';

export const complaintService = {
  createComplaint: async (payload) => {
    const response = await api.post('/complaints', payload);
    return response.data;
  },
  getUserComplaints: async () => {
    const response = await api.get('/complaints/my');
    return response.data;
  },
  getComplaintById: async (id) => {
    const response = await api.get(`/complaints/${id}`);
    return response.data;
  },
};

export default complaintService;
