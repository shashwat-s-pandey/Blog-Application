import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Unique constraint added
    password: { type: String, required: true },
    // Removed id field as Mongoose automatically handles the _id field
}, { timestamps: true }); // Timestamps added

export default mongoose.model("User", userSchema)