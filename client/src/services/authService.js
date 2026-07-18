import api from "./api";

// Register user
export const register = async (name, email, password) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
};

// Login user
export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

// Logout user
export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  localStorage.removeItem("token");
  return data;
};

// Get user profile
export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

// Update user profile
export const updateProfile = async (profileData) => {
  const { data } = await api.put("/users/profile", profileData);
  return data;
};

// Change password
export const changePassword = async (currentPassword, newPassword) => {
  const { data } = await api.put("/users/change-password", {
    currentPassword,
    newPassword,
  });
  return data;
};
