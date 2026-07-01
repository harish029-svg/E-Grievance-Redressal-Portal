import api from '../utils/api';

export const officerService = {
  getAssignedComplaints: async () => {
    const response = await api.get('/officer/complaints');
    return response.data;
  },
  updateAssignedComplaint: async (id, payload) => {
    const response = await api.put(`/officer/complaints/${id}`, payload);
    return response.data;
  },
};

export default officerService;
