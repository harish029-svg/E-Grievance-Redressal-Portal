

const jwt = require("jsonwebtoken");
const User = require("../models/User");



const protect = async (req, res, next) => {
let token;

// Check if token exists in headers
if (
req.headers.authorization &&
req.headers.authorization.startsWith("Bearer")
) {
try {
// Get token from header
token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  // Get user from database (without password)
  req.user = await User.findById(decoded.id)
    .select("-password");

    console.log("Authenticated User:", req.user.email);
console.log("Authenticated Role:", req.user.role);

  next();
} catch (error) {
  return res.status(401).json({
    message: "Not authorized, token failed",
  });
}

}

// No token found
if (!token) {
return res.status(401).json({
message: "Not authorized, no token",
});
}
};

// ======================================================
// ADMIN ONLY
// ======================================================

const adminOnly = (req, res, next) => {
if (req.user && req.user.role === "admin") {
next();
} else {
return res.status(403).json({
message: "Access denied. Admin only",
});
}
};

// ======================================================
// OFFICER ONLY
// ======================================================

const officerOnly = (req, res, next) => {
if (req.user && req.user.role === "officer") {
next();
} else {
return res.status(403).json({
message: "Access denied. Officer only",
});
}
};

// ======================================================
// CITIZEN ONLY
// ======================================================

const citizenOnly = (req, res, next) => {
if (req.user && req.user.role === "citizen") {
next();
} else {
return res.status(403).json({
message: "Access denied. Citizen only",
});
}
};

module.exports = { protect, adminOnly, officerOnly, citizenOnly };