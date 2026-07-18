import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
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
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (!post.title || !post.content) {
      setError("Title and content are required");
      return;
    }

    try {
      await api.put(`/posts/${id}`, {
        title: post.title,
        content: post.content,
        category: post.category,
        tags: post.tags,
        coverImageUrl: post.coverImageUrl,
        status: post.status,
      });
      navigate("/myposts");
    } catch (err) {
      setError("Failed to update post");
    }
  };

  if (!post) return <p className="text-center mt-10">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="w-full border rounded px-3 py-2 h-40"
        />
        <input
          type="text"
          value={post.category || ""}
          onChange={(e) => setPost({ ...post, category: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          value={post.tags?.join(", ") || ""}
          onChange={(e) => setPost({ ...post, tags: e.target.value.split(",").map((t) => t.trim()) })}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          value={post.coverImageUrl || ""}
          onChange={(e) => setPost({ ...post, coverImageUrl: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <select
          value={post.status}
          onChange={(e) => setPost({ ...post, status: e.target.value })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
