const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Create post (author only)
router.post("/", protect, authorize("author"), createPost);

// Get all published posts
router.get("/", getPosts);

// Get single post
router.get("/:id", protect, getPostById);

// Update post (author only, own posts)
router.put("/:id", protect, authorize("author"), updatePost);

// Delete post (author only, own posts)
router.delete("/:id", protect, authorize("author"), deletePost);

module.exports = router;
