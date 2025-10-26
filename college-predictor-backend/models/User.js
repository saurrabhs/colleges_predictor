const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "avatar1.png" },
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model("User", userSchema);
