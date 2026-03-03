const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// REGISTER
console.log("Register API called");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password, // ✅ no manual hashing
      verificationToken,
      isVerified: false,
    });

   const verificationLink =
`${process.env.CLIENT_URL}/verify/${verificationToken}`;

console.log("About to send email...");
console.log("Sending email to:", email);

    await sendEmail({
      to: email,
      subject: "Verify Your Email",
      text: `Click to verify: ${verificationLink}`,
    });

    res.status(201).json({
      message: "Verification email sent",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
    email: user.email
  },
  process.env.JWT_SECRET,
  { expiresIn: "365d" }
);

res.json({
  token,
  role: user.role,
  email: user.email
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const resetUrl =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password:\n\n${resetUrl}\n\nThis link expires in 10 minutes.`,
    });

    res.json({
      message: "Reset email sent successfully",
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    user.password = password; // model auto-hash karega

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      message: "Password reset successful",
    });

  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};