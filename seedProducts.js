import mongoose from "mongoose";
import dotenv from "dotenv";

import Vendor from "./models/Vendor.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

dotenv.config();

const seedProducts = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  // Clear old products
  await Product.deleteMany();
  console.log("Old products cleared");

  // Get any vendor and category from DB
  const vendors = await Vendor.find();
  const categories = await Category.find();

  if (vendors.length === 0 || categories.length === 0) {
    console.log("❌ ERROR: Vendors or Categories missing");
    process.exit();
  }

  const vendor1 = vendors[0];     // first vendor
  const category1 = categories[0]; // first category

  const sampleProducts = [
    {
      vendorId: vendor1._id,
      categoryId: category1._id,
      name: "Fresh Tomato",
      image: "tomato.jpg",
      price: 40,
      description: "Farm fresh organic tomatoes"
    },
    {
      vendorId: vendor1._id,
      categoryId: category1._id,
      name: "Potato",
      image: "potato.jpg",
      price: 30,
      description: "Good quality potatoes"
    }
  ];

  await Product.insertMany(sampleProducts);

  console.log("Products Seeded Successfully!");
  process.exit();
};

seedProducts();
