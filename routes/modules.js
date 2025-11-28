import express from "express";
import { getModules } from "../controllers/modules.js";
const router = express.Router();

router.get("/", getModules);

export default router;
