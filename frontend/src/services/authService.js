const USERS_KEY = 'egp-users';
const TOKEN_KEY = 'egp-token';

const seedUsers = () => {
  const existing = localStorage.getItem(USERS_KEY);
  if (!existing) {
    const users = [
      { id: 'u-client', name: 'Ayesha User', email: 'client@example.com', password: 'client123', role: 'client', department: 'Public Works' },
      { id: 'u-officer', name: 'Ravi Officer', email: 'officer@example.com', password: 'officer123', role: 'officer', department: 'Traffic' },
      { id: 'u-admin', name: 'Neha Admin', email: 'admin@example.com', password: 'admin123', role: 'admin', department: 'Administration' },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

const loadUsers = () => {
  seedUsers();
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authService = {
  login: async ({ email, password, role }) => {
    const users = loadUsers();
    const user = users.find((item) => item.email === email && item.password === password && item.role === role);
    if (!user) {
      throw new Error('Invalid credentials or role');
    }
    const data = { ...user, token: `token-${user.id}` };
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },
  register: async ({ name, email, password, department, role }) => {
    const users = loadUsers();
    const existing = users.find((item) => item.email === email);
    if (existing) {
      throw new Error('Email already registered');
    }
    const newUser = {
      id: `u-${Date.now()}`,
      name,
      email,
      password,
      role,
      department,
    };
    users.push(newUser);
    saveUsers(users);
    const data = { ...newUser, token: `token-${newUser.id}` };
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export default authService;
