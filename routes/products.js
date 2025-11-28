import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// List all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("vendorId").populate("categoryId");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
