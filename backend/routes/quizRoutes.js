const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { createQuiz, getAllQuizzes, getQuizById, submitQuiz } =
  require("../controllers/quizController");

router.post("/", authMiddleware, createQuiz);

router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/:id/submit", authMiddleware, submitQuiz);
module.exports = router;