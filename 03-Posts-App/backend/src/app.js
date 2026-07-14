import express from "express";
const app = express();
import multer from "multer";
import cors from "cors";
import postModel from "./models/post.model.js";
import uploadFile from "./services/storage.services.js";

express.json({ limit: "16kb" });
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/create-post", upload.single("image"), async (req, res) => {
  const result = await uploadFile(req.file.buffer);
  const post = await postModel.create({
    image: result.url,
    caption: req.body.caption,
  });

  res
    .status(201)
    .json({ success: true, message: "Post created successfully", data: post });
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find();
  res
    .status(200)
    .json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
    });
});

export default app;
