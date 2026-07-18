const express = require("express");
const { getProfile, updateProfile, changePassword } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get profile
router.get("/profile", protect, getProfile);

// Update profile
router.put("/profile", protect, updateProfile);

// Change password
router.put("/change-password", protect, changePassword);

module.exports = router;
