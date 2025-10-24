const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const {
  getRegistrationOTPTemplate,
  getForgotPasswordOTPTemplate,
  getWelcomeEmailTemplate,
  getPasswordResetSuccessTemplate
} = require("../utils/emailTemplates");
const auth = require("../middleware/auth");
const rateLimit = require("express-rate-limit");

// Rate limiters
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many registration attempts. Please try again later.",
  },
});

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 7,
  message: { message: "Too many OTP attempts. Please try again later." },
});

// Password strength pattern
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ✅ Register a new user
router.post("/register", registerLimiter, async (req, res) => {
  const { username, email, phone, password, avatar } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 number, and 1 special character.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      avatar,
      isVerified: false,
    });

    await newUser.save();

    const otpCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await Otp.create({ email, otp: otpCode, expiresAt });

    // Send beautiful HTML email
    const htmlContent = getRegistrationOTPTemplate(username, otpCode);
    const textContent = `Hi ${username},

Thank you for registering with CollegePredictor!

Your verification OTP is: ${otpCode}

This OTP is valid for 10 minutes.

Best regards,
CollegePredictor Team`;
    
    await sendEmail(
      email, 
      "Verify Your Email - CollegePredictor", 
      textContent,
      htmlContent
    );

    res.status(201).json({ message: "OTP sent to email for verification" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Forgot Password - Send OTP
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User with this email does not exist." });
    }

    // Generate and send OTP
    const otpCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await Otp.create({ email, otp: otpCode, expiresAt });
    
    // Send beautiful HTML email
    const htmlContent = getForgotPasswordOTPTemplate(otpCode);
    const textContent = `Password Reset Request

Your password reset OTP is: ${otpCode}

This OTP is valid for 10 minutes.

If you didn't request this, please ignore this email.

CollegePredictor Security Team`;
    
    await sendEmail(
      email, 
      "Password Reset - CollegePredictor", 
      textContent,
      htmlContent
    );

    res.status(200).json({ message: "OTP sent to your email for password reset." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Reset Password with OTP
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Verify OTP
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid OTP." });
    }
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: "OTP has expired." });
    }

    // Check password strength
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 number, and 1 special character.",
      });
    }

    // Hash new password and update user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.updateOne({ email }, { $set: { password: hashedPassword } });
    await Otp.deleteMany({ email }); // Clean up OTPs

    // Send password reset success email
    const user = await User.findOne({ email });
    const htmlContent = getPasswordResetSuccessTemplate(user?.username);
    const textContent = `Hi ${user?.username || 'there'},

Your password has been successfully reset.

You can now log in with your new password.

If you didn't make this change, please contact support immediately.

CollegePredictor Security Team`;
    
    await sendEmail(
      email,
      "Password Reset Successful - CollegePredictor",
      textContent,
      htmlContent
    );

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) return res.status(400).json({ error: "Invalid OTP" });

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: "OTP expired" });
    }

    await User.updateOne({ email }, { $set: { isVerified: true } });
    await Otp.deleteMany({ email }); // cleanup

    // Send welcome email after successful verification
    const user = await User.findOne({ email });
    const htmlContent = getWelcomeEmailTemplate(user?.username);
    const textContent = `Hi ${user?.username},

Welcome to CollegePredictor!

Your email has been successfully verified and your account is now active.

You now have access to all our features including college predictions, AI counselling, and more.

Get started: http://localhost:5173/dashboard

Best regards,
The CollegePredictor Team`;
    
    // Send welcome email (don't wait for it)
    sendEmail(
      email,
      "Welcome to CollegePredictor!",
      textContent,
      htmlContent
    ).catch(err => console.error('Failed to send welcome email:', err));

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(400).json({ error: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // ✅ Generate JWT Token
    const secret = (process.env.JWT_SECRET || "").toString().trim();
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      secret,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Protected route: Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile fetched successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Logout
router.post("/logout", auth, (req, res) => {
  // This assumes the token is stored on the client (e.g. localStorage or cookies)
  res.json({ message: "Logged out successfully." });
});

module.exports = router;
