import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/connectionDB.js";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use("/images", express.static("uploads"));
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

// ===== 404 NOT FOUND Handler =====
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ===== GLOBAL ERROR HANDLER (optional) =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// Server start
const PORT = 4000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
