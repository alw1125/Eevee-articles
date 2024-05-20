import express from "express";

const router = express.Router();

// import child routes
import userRoutes from "./api-users.js";
router.use("/users", userRoutes);

import articleRoutes from "./api-articles.js";
router.use("/articles", articleRoutes);

import searchRoutes from "./api-search.js";
router.use("/search", searchRoutes);

export default router;
