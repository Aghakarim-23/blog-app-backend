import express from "express";
import { protect } from "../middleware/auth.js";
import { createPost, getPublicPosts, getSinglePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/", protect, createPost);

router.get("/", getPublicPosts)

router.get("/:id", getSinglePost)

export default router;
