import mongoose from "mongoose";
import { BlogInfo } from "../interfaces/blog/BlogInfo";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    writer: {
        name: { type: String },
        email: { type: String }
    }
});

export default mongoose.model<BlogInfo & mongoose.Document>("Blog", BlogSchema);