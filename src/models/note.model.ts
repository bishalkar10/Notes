import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const noteSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4(),
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    public: {
        type: Boolean,
        default: false,
    },
    user: {
        type: String,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

noteSchema.index({ user: 1 });

export const Note = mongoose.model("Note", noteSchema);