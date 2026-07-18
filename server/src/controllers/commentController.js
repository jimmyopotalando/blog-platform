const Comment = require("../models/Comment");

// @desc Add a comment to a post
// @route POST /api/posts/:id/comments
// @access Private (any authenticated user)
exports.addComment = async (req, res, next) => {
  try {
    const { content, parentCommentId } = req.body;

    const comment = await Comment.create({
      postId: req.params.id,
      userId: req.user._id,
      content,
      parentCommentId: parentCommentId || null,
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

// @desc Get all comments for a post
// @route GET /api/posts/:id/comments
// @access Public
exports.getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.id })
      .populate("userId", "name profilePicUrl")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// @desc Update a comment
// @route PUT /api/comments/:id
// @access Private (owner only)
exports.updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this comment" });
    }

    comment.content = req.body.content || comment.content;
    const updatedComment = await comment.save();

    res.json(updatedComment);
  } catch (err) {
    next(err);
  }
};

// @desc Delete a comment
// @route DELETE /api/comments/:id
// @access Private (owner only)
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.remove();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};
