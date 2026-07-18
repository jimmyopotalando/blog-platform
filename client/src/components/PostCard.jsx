import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="bg-white shadow-md rounded overflow-hidden">
      {post.coverImageUrl && (
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">
          <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-700 mb-3 line-clamp-3">{post.content}</p>
        <p className="text-sm text-gray-500">
          By {post.authorId?.name || "Unknown"} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="mt-3 flex space-x-4 text-sm text-gray-600">
          <span>{post.viewCount} views</span>
          <span>{post.likeCount} likes</span>
          {post.tags?.length > 0 && (
            <span>Tags: {post.tags.join(", ")}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
