const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const router = express.Router();

// ==========================
// Register
// ==========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📥 Register request:", req.body);

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ msg: "User already registered, please login" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log("✅ New user registered:", email);
    res.json({ msg: "✅ Registration successful" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ msg: "Registration failed" });
  }
});

// ==========================
// Login
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Login request:", req.body);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found with email:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Wrong password for:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login successful for:", email);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ msg: "Login failed" });
  }
});

module.exports = router;
