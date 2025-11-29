import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import moduleRoutes from "./routes/modules.js";
import vendorRoutes from "./routes/vendors.js";
import categoryRoutes from "./routes/categories.js";
import productRoutes from "./routes/products.js";
import { authMiddleware, adminOnly } from "./middleware/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;

// Check Mongo URI
if (!MONGO) {
  console.error("❌ ERROR: MONGO_URI is missing in .env");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("✅ MongoDB connected");

    // ROUTES
    app.use("/api/auth", authRoutes);
    app.use("/api/modules", moduleRoutes);
    app.use("/api/vendors", vendorRoutes);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/products", productRoutes);

    // Default route
    app.get("/", (req, res) => {
      res.send("🎉 Smart Backend API Running Successfully");
    });

    // Start server
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
