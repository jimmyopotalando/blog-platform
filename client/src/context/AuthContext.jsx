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
    return null; // success → no error
  } catch (err) {
    // Capture backend error message
    const errorMsg = err.response?.data?.message || "Invalid credentials. Please try again.";
    console.error("Login failed:", errorMsg);
    return errorMsg; // return the backend message
  }
};


  // Register function
const register = async (name, email, password) => {
  try {
    const { data } = await axios.post("/auth/register", { name, email, password });
    setToken(data.token);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return null; // no error
  } catch (err) {
    // Capture backend error message
    const errorMsg = err.response?.data?.message || "Registration failed. Try again.";
    console.error("Registration failed:", errorMsg);
    return errorMsg;
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
