import axios from "axios";

const API = "http://localhost:5000/api/complaints";

const getToken = () => {
  return localStorage.getItem("egp-token");
};

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const complaintService = {
  createComplaint: async (payload) => {
    const response = await axios.post(
      API,
      payload,
      authConfig()
    );

    return response.data;
  },

  getUserComplaints: async () => {
    const response = await axios.get(
      `${API}/my`,
      authConfig()
    );

    return response.data;
  },

  getComplaintById: async (id) => {
    const response = await axios.get(
      `${API}/${id}`,
      authConfig()
    );

    return response.data;
  },

  deleteComplaint: async (id) => {
    const response = await axios.delete(
      `${API}/${id}`,
      authConfig()
    );

    return response.data;
  },
};

export default complaintService;