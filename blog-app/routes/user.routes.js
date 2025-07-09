import express from "express";
import { login, register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);
export default router;
