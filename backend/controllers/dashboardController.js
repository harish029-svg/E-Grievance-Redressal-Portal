const Complaint = require("../models/Complaint");
const User = require("../models/User");
const Department = require("../models/Department");

// Citizen Dashboard
const citizenDashboard = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments({
      citizen: req.user._id,
    });

    const pending = await Complaint.countDocuments({
      citizen: req.user._id,
      status: "Pending",
    });

    const assigned = await Complaint.countDocuments({
      citizen: req.user._id,
      status: "Assigned",
    });

    const resolved = await Complaint.countDocuments({
      citizen: req.user._id,
      status: "Resolved",
    });

    res.json({
      totalComplaints,
      pending,
      assigned,
      resolved,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Officer Dashboard
const officerDashboard = async (req, res) => {
  try {
    const assigned = await Complaint.countDocuments({
      assignedOfficer: req.user._id,
    });

    const resolved = await Complaint.countDocuments({
      assignedOfficer: req.user._id,
      status: "Resolved",
    });

    const pending = assigned - resolved;

    res.json({
      assigned,
      resolved,
      pending,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin Dashboard
const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalComplaints = await Complaint.countDocuments();

    const departments = await Department.countDocuments();

    const resolved = await Complaint.countDocuments({
      status: "Resolved",
    });

    const pending = await Complaint.countDocuments({
      status: "Pending",
    });

    res.json({
      totalUsers,
      totalComplaints,
      departments,
      resolved,
      pending,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  citizenDashboard,
  officerDashboard,
  adminDashboard,
};