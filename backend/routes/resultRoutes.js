const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getMyResults } = require("../controllers/resultController");

router.get("/my", authMiddleware, getMyResults);

module.exports = router;