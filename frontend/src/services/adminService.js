import axios from "axios";

const API = "http://localhost:5000/api/admin";

const getToken = () => {
  return localStorage.getItem("egp-token");
};

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const adminService = {
  // Get all users
  getUsers: async () => {
    const response = await axios.get(`${API}/users`, authConfig());
    return response.data;
  },

  getDepartments: async () => {
  const response = await axios.get(
    `${API}/departments`,
    authConfig()
  );

  return response.data;
},

  // Create a new officer
  createOfficer: async (payload) => {
    const response = await axios.post(
      `${API}/officers`,
      payload,
      authConfig()
    );

    return response.data;
  },

  createUser: async (payload) => {
  const response = await axios.post(
    `${API}/users`,
    payload,
    authConfig()
  );

  return response.data;
},

  updateUser: async (id, payload) => {
  const response = await axios.put(
    `${API}/users/${id}`,
    payload,
    authConfig()
  );

  return response.data;
},

deleteUser: async (id) => {
  const response = await axios.delete(
    `${API}/users/${id}`,
    authConfig()
  );

  return response.data;
},

  // Get all complaints
  getComplaints: async () => {
    const response = await axios.get(`${API}/complaints`, authConfig());
    return response.data;
  },

  

  // Assign an officer to a complaint
  

  // Announcements
  getAnnouncements: async () => {
  const response = await axios.get(
    `${API}/announcements`,
    authConfig()
  );

  return response.data;
},
  createAnnouncement: async (payload) => {
    const response = await axios.post(
      `${API}/announcements`,
      payload,
      authConfig()
    );

    return response.data;
  },

  updateAnnouncement: async (id, payload) => {
    const response = await axios.put(
      `${API}/announcements/${id}`,
      payload,
      authConfig()
    );

    return response.data;
  },

  deleteAnnouncement: async (id) => {
    const response = await axios.delete(
      `${API}/announcements/${id}`,
      authConfig()
    );

    return response.data;
  },

  assignOfficer: async (complaintId, officerId) => {
  const response = await axios.put(
    `${API}/assign-officer`,
    {
      complaintId,
      officerId,
    },
    authConfig()
  );

  return response.data;
},
};

export default adminService;
