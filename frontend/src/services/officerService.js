const loadComplaints = () => {
  const stored = localStorage.getItem('egp-complaints');
  return stored ? JSON.parse(stored) : [];
};

export const officerService = {
  getAssignedComplaints: async () => {
    return loadComplaints()
      .filter((_, index) => index % 2 === 0)
      .map((complaint) => ({
        ...complaint,
        assignedOfficer: 'Ravi Officer',
      }));
  },
  updateAssignedComplaint: async (id, payload) => {
    const complaints = loadComplaints();
    const index = complaints.findIndex((complaint) => complaint.id === id);
    if (index === -1) throw new Error('Complaint not found');
    complaints[index] = { ...complaints[index], ...payload };
    localStorage.setItem('egp-complaints', JSON.stringify(complaints));
    return complaints[index];
  },
};

export default officerService;
