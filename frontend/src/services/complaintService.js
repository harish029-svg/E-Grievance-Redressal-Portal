const COMPLAINTS_KEY = 'egp-complaints';

const getCurrentUser = () => {
  const user = localStorage.getItem('egp-user');
  return user ? JSON.parse(user) : null;
};

const loadComplaints = () => {
  const stored = localStorage.getItem(COMPLAINTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveComplaints = (complaints) => {
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
};

export const complaintService = {
  createComplaint: async (payload) => {
    const user = getCurrentUser();
    if (!user) throw new Error('Authentication required');
    const complaints = loadComplaints();
    const newComplaint = {
      id: `complaint-${Date.now()}`,
      userId: user.id,
      title: payload.title,
      department: payload.department,
      description: payload.description,
      priority: payload.priority,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    complaints.unshift(newComplaint);
    saveComplaints(complaints);
    return newComplaint;
  },
  getUserComplaints: async () => {
    const user = getCurrentUser();
    if (!user) throw new Error('Authentication required');
    return loadComplaints().filter((complaint) => complaint.userId === user.id);
  },
  getComplaintById: async (id) => {
    return loadComplaints().find((complaint) => complaint.id === id) || null;
  },
};

export default complaintService;
