import axios from "axios";

const API = "http://localhost:5000/api/admin/departments";

const getToken = () => {
  return localStorage.getItem("egp-token");
};

const departmentService = {
  getDepartments: async () => {
    const response = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  },
};

export default departmentService;