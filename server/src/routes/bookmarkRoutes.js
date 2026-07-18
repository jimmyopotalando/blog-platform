import express from "express";
import { addBookmark, getBookmarks, removeBookmark } from "../controllers/bookmarkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/bookmarks → add bookmark
router.post("/", protect, addBookmark);

// GET /api/bookmarks → get all bookmarks for user
router.get("/", protect, getBookmarks);

// DELETE /api/bookmarks/:id → remove bookmark
router.delete("/:id", protect, removeBookmark);

export default router;
