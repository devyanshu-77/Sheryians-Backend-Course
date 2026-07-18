import cookieParser from "cookie-parser";
import express from "express";
const app = express();
import authRoutes from "./routes/auth.routes.js";
import musicRouter from "./routes/musics.routes.js";

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRouter);

export default app;
