import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: String,
    description: String,
})

const notesModel = mongoose.model("note", notesSchema)
export default notesModel;
