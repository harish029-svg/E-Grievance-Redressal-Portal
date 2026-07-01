const bcrypt = require("bcryptjs");

const Complaint = require("../models/Complaint");
const User = require("../models/User");
const Announcement = require("../models/Announcement");

// ====================== Assign Officer ======================
const assignOfficer = async (req, res) => {
  try {
    const { complaintId, officerId } = req.body;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    const officer = await User.findById(officerId);

    if (!officer || officer.role !== "officer") {
      return res.status(400).json({
        message: "Invalid officer",
      });
    }

    complaint.assignedOfficer = officerId;
    complaint.status = "Assigned";

    await complaint.save();

    res.status(200).json({
      message: "Officer assigned successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ====================== Get All Complaints ======================
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("citizen", "name email")
      .populate("department", "departmentName")
      .populate("assignedOfficer", "name email");

    res.status(200).json(complaints);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ====================== Get All Users ======================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ====================== Create Officer ======================
const createOfficer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      department,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const officer = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      department,
      role: "officer",
    });

    res.status(201).json({
      message: "Officer created successfully",
      officer: {
        _id: officer._id,
        name: officer.name,
        email: officer.email,
        role: officer.role,
        department: officer.department,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ====================== Create Announcement ======================
const createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;

    const announcement = await Announcement.create({
      title,
      message,
      createdBy: req.user._id,
    });

    res.status(201).json(announcement);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ====================== Get Announcements ======================
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(announcements);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ====================== Update Announcement ======================
const updateAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;

    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    announcement.title = title || announcement.title;
    announcement.message = message || announcement.message;

    await announcement.save();

    res.status(200).json({
      message: "Announcement updated successfully",
      announcement,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ====================== Delete Announcement ======================
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    await announcement.deleteOne();

    res.status(200).json({
      message: "Announcement deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  assignOfficer,
  getAllComplaints,
  getAllUsers,
  createOfficer,
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};