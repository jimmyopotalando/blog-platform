import React, { useState, useEffect } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get("/posts", { params: { sort: "newest" } });
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {posts.length === 0 ? (
        <p>No posts available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
