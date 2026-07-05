const { adminOnly } = require("../middleware/roleMiddleware");
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  assignOfficer,
  getAllComplaints,
  getAllUsers,
  createOfficer,
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  createUser,
  updateUser,
  deleteUser,
  getDepartments,
} = require("../controllers/adminController");

router.get("/complaints", protect, adminOnly, getAllComplaints);

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/departments", protect,  getDepartments);
router.post("/users", protect, adminOnly, createUser);

router.put("/users/:id", protect, adminOnly, updateUser);

router.delete("/users/:id", protect, adminOnly, deleteUser);

router.post("/officers", protect, adminOnly, createOfficer);

router.put("/assign-officer", protect, adminOnly, assignOfficer);

// Announcement Routes
router.post("/announcements", protect, adminOnly, createAnnouncement);

router.get("/announcements", protect, adminOnly, getAnnouncements);

router.put("/announcements/:id", protect, adminOnly, updateAnnouncement);

router.delete("/announcements/:id", protect, adminOnly, deleteAnnouncement);

module.exports = router;