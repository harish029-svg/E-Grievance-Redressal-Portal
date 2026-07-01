import api from '../utils/api';

export const authService = {
  login: async ({ email, password, role = 'client' }) => {
    const response = await api.post('/auth/login', { email, password, role });
    const user = response.data;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },
  register: async ({ name, email, password, department, role = 'client' }) => {
    const response = await api.post('/auth/register', { name, email, password, department, role });
    const user = response.data;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },
  logout: () => {
    localStorage.removeItem('currentUser');
  },
};

export default authService;
