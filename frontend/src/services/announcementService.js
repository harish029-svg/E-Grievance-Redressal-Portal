import axios from "axios";

const API = "http://localhost:5000/api/announcements";

const getToken = () => {
  return localStorage.getItem("egp-token");
};

export const announcementService = {
  // Get all announcements
  getAnnouncements: async () => {
    const response = await axios.get(API);
    return response.data;
  },

  // Delete announcement
  deleteAnnouncement: async (id) => {
    const response = await axios.delete(`${API}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  },
};

export default announcementService;