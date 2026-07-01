const mongoose = require("mongoose");
const User = require("../models/User");
const Department = require("../models/Department");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const getDepartmentId = async (departmentValue) => {
  if (!departmentValue) return null;

  if (mongoose.isValidObjectId(departmentValue)) {
    return departmentValue;
  }

  if (typeof departmentValue === 'object' && departmentValue._id) {
    return departmentValue._id;
  }

  if (typeof departmentValue !== 'string') {
    return null;
  }

  const trimmed = departmentValue.trim();
  if (!trimmed) return null;

  const escapedName = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let department = await Department.findOne({
    departmentName: { $regex: `^${escapedName}$`, $options: 'i' },
  });

  if (!department) {
    department = await Department.create({ departmentName: trimmed });
  }
  return department._id;
};

const formatDepartmentResponse = async (departmentId) => {
  if (!departmentId) return null;
  const department = await Department.findById(departmentId);
  return department ? department.departmentName : null;
};

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, role, department } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const departmentId = await getDepartmentId(department);
    const safeRole = role === 'client' ? 'client' : role || 'client';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: address || '',
      role: safeRole,
      department: departmentId,
    });

    const departmentName = await formatDepartmentResponse(user.department);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: departmentName,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('department', 'departmentName');

    if (user && (await bcrypt.compare(password, user.password))) {
      if (req.body.role) {
        const requestedRole = req.body.role === 'client' ? 'client' : req.body.role;
        const actualRole = user.role === 'citizen' ? 'client' : user.role;
        if (requestedRole !== actualRole) {
          return res.status(401).json({
            message: 'Invalid email, password, or role',
          });
        }
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role === 'citizen' ? 'client' : user.role,
        department: user.department ? user.department.departmentName : null,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};