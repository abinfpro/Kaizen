const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;


    // Check if user already exists
    let user = await User.findOne({ email });

    

    if (!user) {
      // Create new user
      user = await User.create({ password, email });
    }

    // Create JWT payload (only id + email is safer)
    const payload = { id: user._id, email: user.email };

    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
