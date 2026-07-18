import Bookmark from "../models/Bookmark.js";
import Post from "../models/Post.js";

/**
 * Add a post to bookmarks
 */
export const addBookmark = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if already bookmarked
    const existing = await Bookmark.findOne({ userId, postId });
    if (existing) {
      return res.status(400).json({ message: "Already bookmarked" });
    }

    const bookmark = await Bookmark.create({ userId, postId });
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get all bookmarks for logged-in user
 */
export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarks = await Bookmark.find({ userId }).populate("postId");
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Remove a bookmark
 */
export const removeBookmark = async (req, res) => {
  try {
    const { id } = req.params; // bookmark ID
    const userId = req.user.id;

    const bookmark = await Bookmark.findOneAndDelete({ _id: id, userId });
    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json({ message: "Bookmark removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
