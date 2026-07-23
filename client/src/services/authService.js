import api from "./api";

// Helper to handle errors consistently
const handleError = (err, defaultMsg) => {
  return err.response?.data?.message || defaultMsg;
};

// Register user
export const register = async (name, email, password) => {
  try {
    const { data } = await api.post("/auth/register", { name, email, password });
    return data;
  } catch (err) {
    throw new Error(handleError(err, "Registration failed. Try again."));
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  } catch (err) {
    throw new Error(handleError(err, "Invalid credentials. Please try again."));
  }
};

// Logout user
export const logout = async () => {
  try {
    const { data } = await api.post("/auth/logout");
    localStorage.removeItem("token");
    return data;
  } catch (err) {
    throw new Error(handleError(err, "Logout failed."));
  }
};

// Get user profile
export const getProfile = async () => {
  try {
    const { data } = await api.get("/users/profile");
    return data;
  } catch (err) {
    throw new Error(handleError(err, "Failed to load profile."));
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  try {
    const { data } = await api.put("/users/profile", profileData);
    return data;
  } catch (err) {
    throw new Error(handleError(err, "Profile update failed."));
  }
};

// Change password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const { data } = await api.put("/users/change-password", {
      currentPassword,
      newPassword,
    });
    return data;
  } catch (err) {
    throw new Error(handleError(err, "Password change failed."));
  }
};
