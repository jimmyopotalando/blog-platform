import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile, updateProfile, changePassword } from "../services/authService";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(user || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Failed to load profile";
        setError(errorMsg);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      setSuccess("Profile updated successfully");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Update failed";
      setError(errorMsg);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    try {
      await changePassword(currentPassword, newPassword);
      setSuccess("Password changed successfully");
      e.target.reset();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Password change failed";
      setError(errorMsg);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      {/* Profile update form */}
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={profile.name || ""}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full border rounded px-3 py-2"
          placeholder="Name"
        />
        <input
          type="email"
          value={profile.email || ""}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
        />
        <input
          type="text"
          value={profile.profilePicUrl || ""}
          onChange={(e) => setProfile({ ...profile, profilePicUrl: e.target.value })}
          className="w-full border rounded px-3 py-2"
          placeholder="Profile Picture URL"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>

      {/* Password change form */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Change Password</h3>
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Change Password
        </button>
      </form>

      {/* Logout button */}
      <button
        onClick={logout}
        className="w-full mt-6 bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
