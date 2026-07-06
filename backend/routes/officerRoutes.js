const express = require("express");
const router = express.Router();
const { officerOnly } = require("../middleware/roleMiddleware");

const { protect } = require("../middleware/authMiddleware");

const {
  getAssignedComplaints,
  updateComplaintStatus,
  getAssignedComplaintById,
} = require("../controllers/officerController");

router.get("/complaints", protect, officerOnly, getAssignedComplaints);
router.put("/complaints/:id", protect, officerOnly, updateComplaintStatus);
router.get(
  "/complaint/:id",
  protect,
  officerOnly,
  getAssignedComplaintById
);

module.exports = router;