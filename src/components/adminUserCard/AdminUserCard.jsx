import { useState } from "react";
import { updateUserByIdAsAdmin } from "../../api/admin.api";
import Button from "../buttons/button/Button";
import MessageUI from "../messageUI/MessageUI";
import { PencilSimple, Check, X, Trash } from "phosphor-react";
import "./AdminUserCard.scss";
import { deleteUserById } from "../../api/user.api";
import CardLayout from "../cardLayout/CardLayout";

export default function AdminUserCard({ user, onUserUpdated, onUserDeleted }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username || "",
    email: user.email,
    role: user.role,
    status: user.status,
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.role) {
      setMessage({ text: "Name, email, and role are required", type: "error" });
      return;
    }

    setMessage({ text: "Saving changes...", type: "loading" });
    try {
      const updated = await updateUserByIdAsAdmin(user.id, formData);
      onUserUpdated(updated.user); // update parent state
      setEditing(false);
      setMessage({ text: "User updated successfully", type: "success" });
    } catch (err) {
      console.error(err);
      setMessage({
        text: err?.response?.data?.message || "Update failed",
        type: "error",
      });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setMessage({ text: "Deleting user...", type: "loading" });
    try {
      await deleteUserById(user.id);
      onUserDeleted(user.id); // notify parent to remove user from state
      setMessage({ text: "User deleted successfully", type: "success" });
    } catch (err) {
      console.error(err);
      setMessage({
        text: err?.response?.data?.message || "Delete failed",
        type: "error",
      });
    }
  };

  return (
    <div className="adminUserCard">
      <MessageUI message={message} setMessage={setMessage} />

      {editing ? (
        <div className="userForm">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <label htmlFor="role">Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <label htmlFor="status">Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <div className="buttons">
            <Button
              icon={Check}
              name="Save"
              style="button buttonType2"
              onClick={handleSave}
            />
            <Button
              icon={X}
              name="Cancel"
              style="button buttonType2-1"
              onClick={() => setEditing(false)}
            />
          </div>
        </div>
      ) : (
        <div className="userDetails">
          <CardLayout style="cardLayout1">
            <p className="textS textBold userDetailsHeading">
              Name: {user.name}
            </p>
            <p className="textS textBold userDetailsHeading">
              Username: {user.username || "-"}
            </p>
          </CardLayout>
          <CardLayout style="cardLayout4">
            <p className="textXXS">
              <span className="textRegular textS">ID</span>
              {user.id}
            </p>

            <p className="textXXS">
              <span className="textRegular textS">Email</span>
              {user.email}
            </p>
            <p className="textXXS">
              <span className="textRegular textS">Role</span>
              {user.role}
            </p>
            <p className="textXXS">
              <span className="textRegular textS">Status</span>
              {user.status}
            </p>
          </CardLayout>
          <CardLayout style="cardLayout3">
            <p className="textXXS userDetailsDate">
              <span className="textRegular textS">Last Login:</span>{" "}
              {user.lastLoginAt
                ? new Date(user.lastLoginAt).toLocaleString("en-MY", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "Never"}
            </p>

            <p className="textXXS userDetailsDate">
              <span className="textRegular textS">Created At:</span>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleString("en-MY", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "N/A"}
            </p>

            <p className="textXXS userDetailsDate">
              <span className="textRegular textS">Updated At:</span>{" "}
              {user.updatedAt
                ? new Date(user.updatedAt).toLocaleString("en-MY", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "N/A"}
            </p>
          </CardLayout>
          <div className="buttons">
            <Button
              icon={PencilSimple}
              style="button buttonType2"
              onClick={() => setEditing(true)}
            />
            <Button
              icon={Trash}
              style="button buttonType2-1"
              onClick={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
