import express from "express";
import Team from "../models/Event.js"; // Create a new Team model

const erouter = express.Router();

// Register Team for Tournament
// Backend Code (event route)
erouter.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      teamName,
      teamMembers,
      collegeName,
      // Remove playerClass here
      playedValorant,
    } = req.body;

    // Remove playerClass from validation
    if (
      !name ||
      !email ||
      !mobile ||
      !teamName ||
      !collegeName ||
      !teamMembers ||
      teamMembers.length !== 5
    ) {
      return res.status(400).json({
        error: "All fields are required and team must have 5 members.",
      });
    }

    const newTeam = new Team({
      name,
      email,
      mobile,
      teamName,
      teamMembers,
      collegeName,
      // Remove playerClass here
      playedValorant,
    });

    await newTeam.save();
    res.status(201).json({ message: "Registration successful!", newTeam });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
});

export default erouter;
