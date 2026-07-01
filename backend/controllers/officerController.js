const Complaint = require("../models/Complaint");

// View Assigned Complaints
const getAssignedComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedOfficer: req.user._id,
    })
      .populate("citizen", "name email")
      .populate("department", "departmentName");

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Complaint Status
const updateComplaintStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;

const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.status = status;
    complaint.remarks = remarks;

    await complaint.save();

    res.status(200).json({
      message: "Complaint updated successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAssignedComplaints,
  updateComplaintStatus,
};