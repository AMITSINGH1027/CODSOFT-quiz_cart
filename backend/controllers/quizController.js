const Quiz = require("../models/Quiz");
const Result = require("../models/Result");

// Create Quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const quiz = new Quiz({
      title,
      description,
      questions,
      createdBy: req.user.id
    });

    await quiz.save();

    res.status(201).json({ message: "Quiz created successfully", quiz });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Quizzes (Secure)
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .select("-questions.correctAnswer")
      .populate("createdBy", "name email");

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Quiz (Secure)
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .select("-questions.correctAnswer");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit Quiz
exports.submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const { answers } = req.body;

    if (!answers || answers.length !== quiz.questions.length) {
      return res.status(400).json({ message: "Invalid answers submitted" });
    }

    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });

    const percentage = ((score / quiz.questions.length) * 100).toFixed(2) + "%";

    // 🔥 Save result in DB
    const result = new Result({
      user: req.user.id,
      quiz: quiz._id,
      score,
      totalQuestions: quiz.questions.length,
      percentage
    });

    await result.save();

    res.json({
      message: "Quiz submitted successfully",
      totalQuestions: quiz.questions.length,
      score,
      percentage
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};