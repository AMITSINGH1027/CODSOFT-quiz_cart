const Result = require("../models/Result");

// Get My Results
exports.getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id })
      .populate("quiz", "title description")
      .sort({ createdAt: -1 });

    res.json(results);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};