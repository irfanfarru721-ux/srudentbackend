import mongoose from "mongoose";
import dotenv from "dotenv";

import Module from "../models/Module.js";
import Vendor from "../models/Vendor.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Module.deleteMany();
  await Vendor.deleteMany();
  await Category.deleteMany();
  await Product.deleteMany();

  const modules = await Module.insertMany([
    { name: "Grocery", image: "grocery.jpg" },
    { name: "Restaurants", image: "restaurant.jpg" }
  ]);

  const vendors = await Vendor.insertMany([
    { moduleId: modules[0]._id, name: "Fresh Market", image: "market.jpg" },
    { moduleId: modules[1]._id, name: "Pizza House", image: "pizza.jpg" }
  ]);

  const categories = await Category.insertMany([
    { vendorId: vendors[0]._id, name: "Vegetables", image: "veg.jpg" },
    { vendorId: vendors[1]._id, name: "Fast Food", image: "fast.jpg" }
  ]);

  await Product.insertMany([
    { categoryId: categories[0]._id, name: "Potato", price: 40, image: "potato.jpg" },
    { categoryId: categories[1]._id, name: "Burger", price: 120, image: "burger.jpg" }
  ]);

  console.log("Seed completed");
  process.exit();
};

seed();
