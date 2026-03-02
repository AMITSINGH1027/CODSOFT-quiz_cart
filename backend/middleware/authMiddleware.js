const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  console.log("Header Received:", authHeader);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  if (!authHeader) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  const token = authHeader.replace("Bearer ", "");

  console.log("Token Extracted:", token);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified:", verified);
    req.user = verified;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(400).json({ message: "Invalid token" });
  }
};