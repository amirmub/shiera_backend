import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    description: { type: String, required: true },
    author: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
