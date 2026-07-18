const express = require("express");
const {
  addComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router({ mergeParams: true });

// Add comment to a post
router.post("/:id/comments", protect, addComment);

// Get comments for a post
router.get("/:id/comments", getCommentsByPost);

// Update comment (owner only)
router.put("/comments/:id", protect, updateComment);

// Delete comment (owner only)
router.delete("/comments/:id", protect, deleteComment);

module.exports = router;
