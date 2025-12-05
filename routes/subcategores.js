import express from "express";
import Subcategory from "../models/Subcategory.js";

const router = express.Router();

// List all subcategories
router.get("/", async (req, res) => {
  try {
    const subcategories = await Subcategory.find()
      .populate("categoryId", "name")
      .populate("moduleId", "name");
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new subcategory
router.post("/", async (req, res) => {
  try {
    const subcategory = new Subcategory(req.body);
    await subcategory.save();
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
