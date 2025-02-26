// routes/aboutFoodRoutes.js
const express = require("express");
const AboutFood = require("../Models/AboutFood");
const router = express.Router();

// 👉 API to add food details
router.post("/add", async (req, res) => {
  try {
    const { donorName, phoneNumber, address, items } = req.body;

    if (!donorName || !phoneNumber || !address || !items.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAboutFood = new AboutFood({ donorName, phoneNumber, address, items });
    await newAboutFood.save();

    res.status(201).json({ message: "Food details added successfully" });
  } catch (error) {
    console.error("Error saving food details:", error.message);
    res.status(500).json({ message: "Server Error. Could not save food details." });
  }
});

// 👉 API to fetch all food details
router.get("/all", async (req, res) => {
  try {
    const foodDetails = await AboutFood.find();
    res.status(200).json(foodDetails);
  } catch (error) {
    console.error("Error fetching food details:", error.message);
    res.status(500).json({ message: "Server Error. Could not fetch food details." });
  }
});

// 👉 API to fetch specific food details by ID (Optional)
router.get("/:id", async (req, res) => {
  try {
    const foodDetail = await AboutFood.findById(req.params.id);
    if (!foodDetail) return res.status(404).json({ message: "Food detail not found" });

    res.status(200).json(foodDetail);
  } catch (error) {
    console.error("Error fetching food detail:", error.message);
    res.status(500).json({ message: "Server Error. Could not fetch food detail." });
  }
});

module.exports = router;
