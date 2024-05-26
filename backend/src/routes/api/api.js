import express from "express";

const router = express.Router();

// import child routes
import authRoutes from "./api-auth.js";
router.use("/auth", authRoutes);
import userRoutes from "./api-users.js";
router.use("/users", userRoutes);
import artRoutes from "./api-articles.js";
router.use("/articles", artRoutes);
import upload from "./api-upload.js";
router.use("/upload", upload);
import commentsRoutes from "./api-comments.js";
router.use("/comments", commentsRoutes);

export default router;
