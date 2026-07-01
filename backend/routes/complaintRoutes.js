const express = require("express");
const router = express.Router();

const { clientOnly } = require("../middleware/roleMiddleware");
const { submitComplaint, getMyComplaints, getComplaintById, deleteComplaint } = require("../controllers/complaintController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, clientOnly, submitComplaint);
router.get("/my", protect, clientOnly, getMyComplaints);
router.get("/:id", protect, clientOnly, getComplaintById);
router.delete("/:id", protect, clientOnly, deleteComplaint);

module.exports = router;