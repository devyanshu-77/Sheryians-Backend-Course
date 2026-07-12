// Simple in memory notes app
import express from "express";

const app = express() // creates an instance of a server and it get stored in app variable
app.use(express.json({ limit: "16kb" }))

const notes = [];

app.get("/notes", (req, res) => {
    res.status(200).json({ success: true, message: "sent all notes", data: [...notes] })
})
app.post("/notes", (req, res) => {
    notes.push(req.body)
    res.status(201).json({ success: true, message: "created new note" })
})
app.delete("/notes/:index", (req, res) => {
    const index = req.params.index;
    delete notes[index]
    res.status(200).json({ success: true, message: "notes deleted successfully" })
})
app.patch("/notes/:index", (req, res) => {
    const index = req.params.index;
    const description = req.body.description;
    notes[index].description = description;
    res.status(200).json({
        message: "note updated successfully"
    })
})
export default app;
