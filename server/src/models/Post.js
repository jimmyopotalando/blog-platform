const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImageUrl: { type: String, default: "" },
    category: { type: String, trim: true },
    tags: [{ type: String }],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    viewCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
