import "./CreateUserForm.scss";
import { useState } from "react";
import { createUserAsAdmin } from "../../api/admin.api";
import { useTheme } from "../../context/ThemeContext";

function CreateUserForm({ setMessage }) {
  const { darkMode, toggleMode } = useTheme();

  const [form, setForm] = useState({
    name: "",
    username: "", // <-- add this
    email: "",
    password: "",
    role: "user",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //   API Post req to /api/admin/create-user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!form.name.trim()) {
      return setMessage({ text: "Name is required", type: "error" });
    }

    if (!form.username.trim()) {
      return setMessage({ text: "Username is required", type: "error" });
    }

    if (!form.email.trim()) {
      return setMessage({ text: "Email is required", type: "error" });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      return setMessage({
        text: "Please enter a valid email address",
        type: "error",
      });
    }

    if (!form.password || form.password.length < 6) {
      return setMessage({
        text: "Password must be at least 6 characters",
        type: "error",
      });
    }

    try {
      const { data } = await createUserAsAdmin(form);

      setMessage({ text: "User Created successfully!", type: "success" });

      setForm({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      console.error(err);

      const errorMessage =
        err?.response?.data?.error || "Failed to create user.";

      setMessage({ text: errorMessage, type: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={darkMode ? "userForm sectionDark" : "userForm sectionLight"}
    >
      <h2>Create New User</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        autoComplete="name"
      />

      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        autoComplete="username"
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@example.com"
        autoComplete="email"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        autoComplete="current-password"
      />

      <label htmlFor="role">User Role</label>
      <select id="role" name="role" value={form.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" className="button buttonType2">
        Create User
      </button>
    </form>
  );
}

export default CreateUserForm;
