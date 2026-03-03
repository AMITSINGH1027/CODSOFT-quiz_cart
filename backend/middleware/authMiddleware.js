const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;   // ✅ FIXED HERE
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(400).json({ message: "Invalid token" });
  }
};