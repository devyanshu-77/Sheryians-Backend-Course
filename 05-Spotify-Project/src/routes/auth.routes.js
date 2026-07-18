import { Router } from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/auth.controller.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOutUser);

export default router;
