import { Router } from "express";
const router = Router();
import multer from "multer";
import {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
} from "../controllers/music.controller.js";
import {
  artistMiddleware,
  userMiddleware,
} from "../middleware/auth.middleware.js";

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/upload", artistMiddleware, upload.single("music"), createMusic);
router.post("/create", artistMiddleware, createAlbum);
router.get("/", userMiddleware, getAllMusics);
router.get("/albums", userMiddleware, getAllAlbums);
router.get("/albums/:albumId", userMiddleware, getAlbumById);
export default router;
