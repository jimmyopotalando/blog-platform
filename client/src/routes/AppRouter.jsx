import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Pages
import Home from "../pages/Home";
import PostDetail from "../pages/PostDetail";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import MyPosts from "../pages/MyPosts";

import { AuthContext } from "../context/AuthContext";

// Private route wrapper (only logged-in users)
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

// Author-only route wrapper
const AuthorRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user && user.role === "author" ? children : <Navigate to="/" />;
};

function AppRouter() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<PostDetail />} />

            {/* Private routes */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* Author-only routes */}
            <Route
              path="/myposts"
              element={
                <AuthorRoute>
                  <MyPosts />
                </AuthorRoute>
              }
            />
            <Route
              path="/create"
              element={
                <AuthorRoute>
                  <CreatePost />
                </AuthorRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <AuthorRoute>
                  <EditPost />
                </AuthorRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default AppRouter;
