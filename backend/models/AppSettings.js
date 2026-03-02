const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  defaultQuizTime: {
    type: Number,
    default: 30,
  },
  maxAttempts: {
    type: Number,
    default: 3,
  },
});

module.exports = mongoose.model("AppSettings", settingsSchema);