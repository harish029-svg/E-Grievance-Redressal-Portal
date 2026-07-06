const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

router.post("/", protect, createDepartment);
router.get("/", getDepartments);
router.put("/:id", protect, updateDepartment);
router.delete("/:id", protect, deleteDepartment);

module.exports = router;