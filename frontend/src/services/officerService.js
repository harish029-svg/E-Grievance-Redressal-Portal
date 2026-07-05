import axios from "axios";

const API = "http://localhost:5000/api/officer";

const getToken = () => {
  return localStorage.getItem("egp-token");
};

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const officerService = {
  // Get complaints assigned to the logged-in officer
  getAssignedComplaints: async () => {
    const response = await axios.get(
      `${API}/complaints`,
      authConfig()
    );

    return response.data;
  },

  // Update complaint status
  updateAssignedComplaint: async (id, payload) => {
    const response = await axios.put(
      `${API}/complaints/${id}`,
      payload,
      authConfig()
    );

    return response.data;
  },
  getComplaintById: async (id) => {
  const response = await axios.get(
    `${API}/complaint/${id}`,
    authConfig()
  );

  return response.data;
},
};

export default officerService;
