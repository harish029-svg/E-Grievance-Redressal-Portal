const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }
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

const clientOnly = (req, res, next) => {
  if (req.user && (req.user.role === "client" || req.user.role === "citizen")) {
    next();
  } else {
    res.status(403).json({
      message: "Access denied. Client only.",
    });
  }
};

module.exports = {
  adminOnly,
  officerOnly,
  clientOnly,
};