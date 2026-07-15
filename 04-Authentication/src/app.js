import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

export default app;
