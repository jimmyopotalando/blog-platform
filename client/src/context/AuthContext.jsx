import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Configure Axios interceptors
  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:5000/api"; // backend base URL
    axios.defaults.headers.common["Content-Type"] = "application/json";

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Load user profile if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const { data } = await axios.get("/users/profile");
          setUser(data);
        } catch (err) {
          console.error("Profile fetch failed:", err);
          logout();
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post("/auth/register", { name, email, password });
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      console.error("Registration failed:", err);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
