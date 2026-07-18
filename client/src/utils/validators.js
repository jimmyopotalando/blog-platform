// src/utils/validators.js

// ✅ Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ✅ Password strength (min 6 chars, at least one number)
export const validatePassword = (password) => {
  const regex = /^(?=.*\d).{6,}$/;
  return regex.test(password);
};

// ✅ Required field check
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

// ✅ Post form validation
export const validatePost = (post) => {
  if (!validateRequired(post.title)) return "Title is required";
  if (!validateRequired(post.content)) return "Content is required";
  return null; // No errors
};

// ✅ Registration form validation
export const validateRegister = (formData) => {
  if (!validateRequired(formData.name)) return "Name is required";
  if (!validateEmail(formData.email)) return "Invalid email format";
  if (!validatePassword(formData.password))
    return "Password must be at least 6 characters and include a number";
  if (formData.password !== formData.confirmPassword)
    return "Passwords do not match";
  return null;
};

// ✅ Login form validation
export const validateLogin = (formData) => {
  if (!validateEmail(formData.email)) return "Invalid email format";
  if (!validateRequired(formData.password)) return "Password is required";
  return null;
};

// ✅ Profile update validation
export const validateProfile = (profileData) => {
  if (!validateRequired(profileData.name)) return "Name is required";
  if (!validateEmail(profileData.email)) return "Invalid email format";
  return null;
};
