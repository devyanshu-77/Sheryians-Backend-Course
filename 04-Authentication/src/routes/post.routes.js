import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

router.post("/create", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decoded.id });
    console.log(user);
  } catch (err) {
    console.log("Token generation error ", err);
    res.status(500).json({ success: false, message: "Token invalid" });
  }
  res.send("Post created successfully");
});

export default router;
