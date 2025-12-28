import express from "express";
import { protect } from "../middleware/auth.js";
import { createPost, deletePost, editPost, getPublicPosts, getSinglePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/", protect, createPost);

router.get("/", getPublicPosts)

router.get("/:id", getSinglePost)

router.delete("/:id", protect, deletePost)

router.put("/:id", protect, editPost)

export default router;
