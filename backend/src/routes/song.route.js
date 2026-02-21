import { Router } from "express";
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrandingSongs,
} from "../controller/song.controller.js ";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// Define your user-related routes here
router.get("/", requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrandingSongs);

export default router;
