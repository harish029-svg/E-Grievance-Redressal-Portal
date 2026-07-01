const Complaint = require("../models/Complaint");
const Department = require("../models/Department");

// Submit Complaint
const submitComplaint = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      department,
      location,
      priority,
    } = req.body;

    let departmentRecord = null;

    if (department) {
      departmentRecord = await Department.findOne({ departmentName: department });
      if (!departmentRecord) {
        departmentRecord = await Department.create({
          departmentName: department,
          description: `${department} services`,
        });
      }
    }

    const complaint = await Complaint.create({
      title,
      description,
      category: category || 'General',
      department: departmentRecord ? departmentRecord._id : null,
      location: location || 'Not specified',
      priority: priority || 'Medium',
      citizen: req.user._id,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Complaints
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      citizen: req.user._id,
    })
      .populate("department", "departmentName")
      .populate("assignedOfficer", "name email");

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Complaint By ID
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("citizen", "name email")
      .populate("department", "departmentName")
      .populate("assignedOfficer", "name email");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json(complaint);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Complaint
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    // Only the complaint owner can delete it
    if (complaint.citizen.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this complaint",
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  submitComplaint,
  getMyComplaints,
  getComplaintById,
  deleteComplaint,
};
  