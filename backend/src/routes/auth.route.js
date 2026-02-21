import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";
const router = Router();

// Define your user-related routes here
router.post("/callback", authCallback);

export default router;
