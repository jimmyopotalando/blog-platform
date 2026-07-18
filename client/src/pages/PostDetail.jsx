import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import CommentThread from "../components/CommentThread";

function PostDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        setError("Failed to load post");
      }
    };

    const fetchComments = async () => {
      try {
        const { data } = await api.get(`/posts/${id}/comments`);
        setComments(data);
      } catch (err) {
        console.error("Failed to load comments");
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data } = await api.post(`/posts/${id}/comments`, { content: newComment });
      setComments([data, ...comments]);
      setNewComment("");
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  if (!post) return <p className="text-center mt-10">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.coverImageUrl && (
        <img src={post.coverImageUrl} alt={post.title} className="w-full rounded mb-6" />
      )}
      <p className="text-gray-700 mb-6">{post.content}</p>
      <p className="text-sm text-gray-500 mb-6">
        By {post.authorId?.name} • {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
      {user ? (
        <form onSubmit={handleAddComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border rounded px-3 py-2 mb-2"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Comment
          </button>
        </form>
      ) : (
        <p className="text-gray-600 mb-4">Login to add a comment.</p>
      )}

      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <CommentThread comments={comments} />
      )}
    </div>
  );
}

export default PostDetail;
