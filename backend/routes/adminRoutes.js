const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const {
  assignOfficer,
  getAllComplaints,
  getAllUsers,
  createOfficer,
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,

} = require("../controllers/adminController");

router.get("/complaints", protect, adminOnly, getAllComplaints);

router.get("/users", protect, adminOnly, getAllUsers);

router.post("/officers", protect, adminOnly, createOfficer);

router.put("/assign-officer", protect, adminOnly, assignOfficer);

// Announcement Routes
router.post("/announcements", protect, adminOnly, createAnnouncement);

router.get("/announcements", getAnnouncements);

router.put("/announcements/:id", protect, adminOnly, updateAnnouncement);

router.delete("/announcements/:id", protect, adminOnly, deleteAnnouncement);

module.exports = router;