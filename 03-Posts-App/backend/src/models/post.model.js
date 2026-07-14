import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    caption: String,
    image: String,
})

const postModel = mongoose.model("post", postSchema)
export default postModel;
