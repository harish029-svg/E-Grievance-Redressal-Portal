const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

router.post("/", protect, adminOnly, createAnnouncement);

router.get("/", getAnnouncements);

router.put("/:id", protect, adminOnly, updateAnnouncement);

router.delete("/:id", protect, adminOnly, deleteAnnouncement);

module.exports = router;