import axios from "axios";

// Create Axios instance with base URL from environment or fallback
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor → handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Handle unauthorized / expired token
    if (status === 401) {
      console.warn("Unauthorized or expired token. Logging out...");
      localStorage.removeItem("token");
      // Redirect to login page (SPA-friendly if using React Router)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Log other errors for debugging
    if (status) {
      console.error(
        `API Error [${status}]:`,
        error.response?.data?.message || error.message
      );
    } else {
      console.error("Network/Unknown API error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
