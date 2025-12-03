import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import moduleRoutes from "./routes/modules.js";
import vendorRoutes from "./routes/vendors.js";
import categoryRoutes from "./routes/categories.js";
import productRoutes from "./routes/products.js";

import adminAuthRoutes from "./routes/admin/auth.js";
import adminModuleRoutes from "./routes/admin/modules.js";
import adminVendorRoutes from "./routes/admin/vendors.js";
import adminCategoryRoutes from "./routes/admin/categories.js";
import adminProductRoutes from "./routes/admin/products.js";
import adminUserRoutes from "./routes/admin/users.js";

dotenv.config();
const app = express();

// CORS
app.use(
  cors({
    origin: [
      "https://frontend-frontend-wcvf.onrender.com",
      "https://frontend-admin-lhhq.onrender.com",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ENV
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;

// MongoDB
mongoose
  .connect(MONGO)
  .then(() => console.log("MongoDB Connected ✔"))
  .catch((err) => console.error("Mongo Error:", err));

// USER ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// ADMIN ROUTES
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/modules", adminModuleRoutes);
app.use("/api/admin/vendors", adminVendorRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/users", adminUserRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Unified Backend Running ✔");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
