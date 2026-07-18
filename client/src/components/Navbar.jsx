import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:text-blue-400">
        BlogPlatform
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        {user && user.role === "author" && (
          <>
            <Link to="/create" className="hover:text-blue-400">Create Post</Link>
            <Link to="/myposts" className="hover:text-blue-400">My Posts</Link>
          </>
        )}
        {user ? (
          <>
            <Link to="/profile" className="hover:text-blue-400">Profile</Link>
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-400">Login</Link>
            <Link to="/register" className="hover:text-blue-400">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
