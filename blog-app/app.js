const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

//mongodb connection
connectDB();

const app = express();
//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//routes
app.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome to the API",
    })
});

const PORT = process.env.PORT || 5000;
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} http://localhost:${PORT}`
  );
});
