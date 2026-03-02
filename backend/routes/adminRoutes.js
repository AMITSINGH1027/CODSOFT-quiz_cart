const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Quiz = require("../models/Quiz");
const Result = require("../models/Result");
const AppSettings = require("../models/AppSettings");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// =====================================================
// 📊 DASHBOARD STATS
// =====================================================
router.get("/stats", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalAttempts = await Result.countDocuments();

    const results = await Result.find();

    const avgPercentage =
      results.length > 0
        ? (
            results.reduce(
              (sum, r) => sum + parseFloat(r.percentage),
              0
            ) / results.length
          ).toFixed(2)
        : 0;

    res.json({
      totalUsers,
      totalQuizzes,
      totalAttempts,
      avgPercentage,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =====================================================
// 👥 USER MANAGEMENT
// =====================================================

// GET ALL USERS
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE USER
router.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CHANGE USER ROLE
router.put("/users/:id/role", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =====================================================
// 📊 QUIZ ANALYTICS (Per Quiz)
// =====================================================
router.get("/quiz-analytics", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    const results = await Result.find();

    const quizStats = quizzes.map((quiz) => {
      const quizResults = results.filter(
        (r) => r.quizId.toString() === quiz._id.toString()
      );

      const totalAttempts = quizResults.length;

      const avgScore =
        totalAttempts > 0
          ? (
              quizResults.reduce(
                (sum, r) => sum + parseFloat(r.percentage),
                0
              ) / totalAttempts
            ).toFixed(2)
          : 0;

      return {
        _id: quiz._id,
        title: quiz.title,
        questions: quiz.questions.length,
        totalAttempts,
        avgScore,
      };
    });

    res.json(quizStats);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =====================================================
// 📈 GLOBAL ANALYTICS
// =====================================================
router.get("/analytics", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalAttempts = await Result.countDocuments();

    const results = await Result.find();

    const avgScore =
      results.length > 0
        ? (
            results.reduce(
              (sum, r) => sum + parseFloat(r.percentage),
              0
            ) / results.length
          ).toFixed(2)
        : 0;

    const topUsersRaw = await Result.aggregate([
      {
        $group: {
          _id: "$userId",
          avgScore: { $avg: "$percentage" },
        },
      },
      { $sort: { avgScore: -1 } },
      { $limit: 5 },
    ]);

    const topUsers = await Promise.all(
      topUsersRaw.map(async (u) => {
        const user = await User.findById(u._id);

        return {
          name: user ? user.name : "Deleted User",
          email: user ? user.email : "N/A",
          avgScore: u.avgScore || 0,
        };
      })
    );

    res.json({
      totalUsers,
      totalQuizzes,
      totalAttempts,
      avgScore,
      topUsers,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================================================
// ⚙ SETTINGS
// =====================================================

// GET SETTINGS
router.get("/settings", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    let settings = await AppSettings.findOne();

    if (!settings) {
      settings = await AppSettings.create({});
    }

    res.json(settings);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE SETTINGS
router.put("/settings", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { defaultQuizTime, maxAttempts } = req.body;

    let settings = await AppSettings.findOne();

    if (!settings) {
      settings = await AppSettings.create({});
    }

    settings.defaultQuizTime = defaultQuizTime;
    settings.maxAttempts = maxAttempts;

    await settings.save();

    res.json(settings);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;