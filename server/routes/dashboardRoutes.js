const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  adminOnly,
  officerOnly,
  citizenOnly,
} = require("../middleware/roleMiddleware");

const {
  citizenDashboard,
  officerDashboard,
  adminDashboard,
} = require("../controllers/dashboardController");

// Citizen Dashboard
router.get(
  "/citizen",
  protect,
  citizenOnly,
  citizenDashboard
);

// Officer Dashboard
router.get(
  "/officer",
  protect,
  officerOnly,
  officerDashboard
);

// Admin Dashboard
router.get(
  "/admin",
  protect,
  adminOnly,
  adminDashboard
);

module.exports = router;