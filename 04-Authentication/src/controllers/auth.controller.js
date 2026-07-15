import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(409).json({
      success: false,
      message: "User already exist",
    });
  }
  const user = await userModel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
}

export { registerUser };
