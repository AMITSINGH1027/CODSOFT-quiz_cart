const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    console.log("Admin check user:", user.email, user.role);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admins only.",
      });
    }

    next();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};