const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

router.post("/", protect, createAnnouncement);

router.get("/", getAnnouncements);

router.put("/:id", protect, updateAnnouncement);

router.delete("/:id", protect, deleteAnnouncement);

module.exports = router;