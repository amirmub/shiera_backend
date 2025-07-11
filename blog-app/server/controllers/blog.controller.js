import Blog from "../models/blog.model.js";
import fs from "fs";

export const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ blogs, success: true, message: "All blogs" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const createBlog = async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const { title, category, description } = req.body;

    const blog = await Blog.create({
      title,
      category,
      description,
      image: req.file.filename,
      author: {
        id: req.user._id,
        name: req.user.name,
        image: req.user.image,
      },
    });

    return res
      .status(201)
      .json({ message: "blog created", success: true, blog });
  } catch (error) {
    console.error("Create Blog Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found", success: false });
    }

    if (blog.author.id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized", success: false });
    }

    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.description = description || blog.description;

    if (req.file) {
      // delete old image file
      fs.unlink(`uploads/${blog.image}`, () => {});
      blog.image = req.file.filename;
    }

    await blog.save();
    return res.status(200).json({ message: "Blog updated successfully", success: true, blog });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};



export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  fs.unlink(`uploads/${blog.image}`, () => {});
  if (!blog) {
    return res.status(404).json({ message: "blog not found", success: false });
  }
  if (blog.author.id.toString() !== req.user.id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this blog", success: false });
  }
  await blog.deleteOne();
  return res
    .status(404)
    .json({ message: "blog deleted successfully", success: true });
};

export const singleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    return res
      .status(200)
      .json({ message: "blog  found", success: true, blog });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};

export const userBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ "author.id": req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(blogs);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};
