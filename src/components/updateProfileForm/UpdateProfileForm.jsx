// src/components/updateProfileForm/UpdateProfileForm.jsx
import "./UpdateProfileForm.scss";
import { useState, useEffect } from "react";
import { updateCurrentUser, deleteCurrentUser } from "../../api/user.api";

export default function UpdateProfileForm({
  profile,
  setIsEditing,
  setMessage,
}) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Populate form data from profile
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        username: profile.username || "",
        email: profile.email || "",
        password: "",
      });
    }
  }, [profile]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({ text: "Invalid email format.", type: "error" });
      return;
    }

    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] && formData[key] !== profile[key]) {
        updatedFields[key] = formData[key];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      setMessage({ text: "No changes made.", type: "info" });
      return;
    }

    try {
      setUpdating(true);
      await updateCurrentUser(updatedFields);
      setMessage({ text: "Profile updated successfully", type: "success" });

      // Refresh the page after saving
      window.location.reload();
    } catch (err) {
      setMessage({
        text: err?.response?.data?.message || "Update failed",
        type: "error",
      });
    } finally {
      setUpdating(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    )
      return;

    try {
      setDeleting(true);
      await deleteCurrentUser();
      setMessage({ text: "Account deleted successfully", type: "success" });

      // Redirect to login page after account deletion
      window.location.href = "/login";
    } catch (err) {
      setMessage({
        text: err?.response?.data?.message || "Delete failed",
        type: "error",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <div>
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Username</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>New Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Leave blank to keep current"
        />
      </div>

      <button type="submit" disabled={updating}>
        {updating ? "Updating..." : "Update Profile"}
      </button>
      <button
        type="button"
        disabled={updating}
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
      <button
        type="button"
        className="deleteButton"
        disabled={deleting}
        onClick={handleDelete}
      >
        {deleting ? "Deleting..." : "Delete Account"}
      </button>
    </form>
  );
}
