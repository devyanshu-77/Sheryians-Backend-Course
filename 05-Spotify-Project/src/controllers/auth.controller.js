import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExist) {
    return res
      .status(409)
      .json({ success: false, message: "User already exist!" });
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    username,
    email,
    password: hash,
    role,
  });
  const token = jwt.sign(
    {
      id: newUser._id,
      role: newUser.role,
    },
    JWT_SECRET,
  );
  res.cookie("token", token);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  });
}
async function loginUser(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    JWT_SECRET,
  );

  res.cookie("token", token);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}
async function logOutUser(req, res) {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
}

export { registerUser, loginUser, logOutUser };
