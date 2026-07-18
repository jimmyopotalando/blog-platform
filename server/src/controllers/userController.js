const bcrypt = require("bcryptjs");
const User = require("../models/User");

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, profilePicUrl } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.profilePicUrl = profilePicUrl || user.profilePicUrl;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicUrl: updatedUser.profilePicUrl,
      role: updatedUser.role,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Change user password
// @route PUT /api/users/change-password
// @access Private
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
};
