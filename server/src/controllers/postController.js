const Post = require("../models/Post");

// @desc Create new post
// @route POST /api/posts
// @access Private (Author only)
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, category, tags, coverImageUrl, status } = req.body;

    const post = await Post.create({
      authorId: req.user._id,
      title,
      content,
      category,
      tags,
      coverImageUrl,
      status: status || "draft",
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// @desc Get all posts (published only for public)
// @route GET /api/posts
// @access Public
exports.getPosts = async (req, res, next) => {
  try {
    const { search, category, tag, sort } = req.query;

    let query = { status: "published" };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }
    if (tag) {
      query.tags = tag;
    }

    let postsQuery = Post.find(query).populate("authorId", "name profilePicUrl");

    // Sorting
    if (sort === "newest") {
      postsQuery = postsQuery.sort({ createdAt: -1 });
    } else if (sort === "mostViewed") {
      postsQuery = postsQuery.sort({ viewCount: -1 });
    } else if (sort === "mostLiked") {
      postsQuery = postsQuery.sort({ likeCount: -1 });
    }

    const posts = await postsQuery.exec();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// @desc Get single post
// @route GET /api/posts/:id
// @access Public
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("authorId", "name profilePicUrl");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only allow draft visibility to author
    if (post.status === "draft" && post.authorId._id.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Increment view count
    post.viewCount += 1;
    await post.save();

    res.json(post);
  } catch (err) {
    next(err);
  }
};

// @desc Update post
// @route PUT /api/posts/:id
// @access Private (Author only, own posts)
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this post" });
    }

    const { title, content, category, tags, coverImageUrl, status } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    post.tags = tags || post.tags;
    post.coverImageUrl = coverImageUrl || post.coverImageUrl;
    post.status = status || post.status;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
};

// @desc Delete post
// @route DELETE /api/posts/:id
// @access Private (Author only, own posts)
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.remove();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};
