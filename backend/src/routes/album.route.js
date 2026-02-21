import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";

const router = Router();

// Define your user-related routes here
router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);

export default router;
