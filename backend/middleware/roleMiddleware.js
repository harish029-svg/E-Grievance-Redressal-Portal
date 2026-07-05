const adminOnly = (req, res, next) => {
  console.log("Logged in user:", req.user);

  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Access denied. Admin only.",
  });
};

const officerOnly = (req, res, next) => {
  if (req.user && req.user.role === "officer") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied. Officer only.",
    });
  }
};

const citizenOnly = (req, res, next) => {
  if (req.user && req.user.role === "citizen") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied. Citizen only.",
    });
  }
};

module.exports = {
  adminOnly,
  officerOnly,
  citizenOnly,
};