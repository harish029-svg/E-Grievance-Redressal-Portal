import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const authService = {

  login: async ({ email, password }) => {

    const response = await axios.post(`${API}/login`, {
      email,
      password,
    });

    localStorage.setItem("egp-token", response.data.token);

    return response.data;
  },

  register: async ({ name, email, password, phone, address }) => {

    const response = await axios.post(`${API}/register`, {
      name,
      email,
      password,
      phone,
      address,
    });

    localStorage.setItem("egp-token", response.data.token);

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("egp-token");
  },
};

export default authService;
