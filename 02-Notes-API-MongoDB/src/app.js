import express from "express";
const app = express()
import notesModel from "./models/notesModel.js";

app.use(express.json({ limit: "16kb" }))

app.post("/notes", async (req, res) => {
    const { title, description } = req.body;
    const newNote = await notesModel.create({
        title,
        description,
    })
    res
        .status(201)
        .json({
            success: true,
            message: "Created new note",
        })
})

app.get("/notes", async (req, res) => {
    const allNotes = await notesModel.find()
    res.
        status(200).
        json({
            success: true,
            message: "Notes fetched successfully",
            data: allNotes,
        })
})

app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id
    await notesModel.findOneAndDelete({ _id: id })
    res
        .status(200)
        .json({
            success: true,
            message: "Note deleted successfully"
        })
})

app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id
    const description = req.body.description;
    await notesModel.findOneAndUpdate(
        { _id: id },
        { description }
    )
    res
        .status(200)
        .json({
            success: true,
            message: "Note deleted successfully"
        })
})

export default app;
