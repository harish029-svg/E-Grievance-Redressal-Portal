const express = require("express");
const router = express.Router();

const { citizenOnly } = require("../middleware/roleMiddleware");
const { submitComplaint, getMyComplaints, getComplaintById, deleteComplaint,} = require("../controllers/complaintController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, citizenOnly, submitComplaint);
router.get("/my", protect, citizenOnly, getMyComplaints);
router.get("/:id", protect, citizenOnly, getComplaintById);
router.delete("/:id", protect, citizenOnly, deleteComplaint);

module.exports = router;