import mongoose, { mongo } from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    selectedFile: String,
    tags: {
        type: ['String']
    }
})

export default mongoose.model("Blog", blogSchema)