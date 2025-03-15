import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPasswordPromise = bcrypt.hash(password, 8);
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await hashedPasswordPromise;
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
