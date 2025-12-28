import express from "express";
import { protect } from "../middleware/auth.js";
import { createPost, getPublicPosts } from "../controllers/postController.js";

const router = express.Router();

router.post("/", protect, createPost);

router.get("/", getPublicPosts)

export default router;
