import express from "express";
import Team from "../models/Event.js"; // Create a new Team model

const erouter = express.Router();

// Register Team for Tournament
erouter.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      teamName,
      teamMembers,
      collegeName,
      playerClass,
      playedValorant,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !mobile ||
      !teamName ||
      !collegeName ||
      !playerClass ||
      teamMembers.length !== 5
    ) {
      return res.status(400).json({
        error: "All fields are required and team must have 5 members.",
      });
    }

    // Create a new team entry
    const newTeam = new Team({
      name,
      email,
      mobile,
      teamName,
      teamMembers,
      collegeName,
      playerClass,
      playedValorant,
    });

    await newTeam.save(); // Save to MongoDB

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
});

export default erouter;
