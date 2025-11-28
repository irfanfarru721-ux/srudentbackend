import express from "express";
import { getVendors, getVendorsByModule } from "../controllers/vendors.js";

const router = express.Router();

// Get all vendors
router.get("/", getVendors);

// Get vendors by moduleId
router.get("/module/:moduleId", getVendorsByModule);

export default router;
