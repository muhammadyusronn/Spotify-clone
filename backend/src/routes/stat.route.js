import { Router } from "express";
import { requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stats.controller.js";

const router = Router();

// Define your user-related routes here
router.get("/", requireAdmin, getStats);

export default router;
