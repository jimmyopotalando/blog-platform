import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import PostCard from "../components/PostCard";

function MyPosts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const { data } = await api.get("/posts", {
          params: { authorId: user.id },
        });
        setPosts(data);
      } catch (err) {
        setError("Failed to load your posts");
      }
    };
    if (user) fetchMyPosts();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Posts</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {posts.length === 0 ? (
        <p>You haven’t created any posts yet.</p>
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

export default MyPosts;
