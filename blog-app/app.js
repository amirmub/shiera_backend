import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/connectionDB.js";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

dotenv.config();

const app = express();

// Allow Netlify frontend CORS
app.use(cors({
  origin: "https://bllog-app.netlify.app", // your frontend domain
  credentials: true,
}));

// Accept preflight requests
app.options("*", cors());

// Middlewares
app.use(express.json());

// Static and API routes
app.use("/images", express.static("uploads"));
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Server start (Render sets PORT automatically)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
