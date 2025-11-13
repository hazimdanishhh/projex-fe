import { useState } from "react";
import { createProject } from "../../api/project.api";
import Button from "../buttons/button/Button";
import { X } from "phosphor-react";
import "./ProjectsForm.scss";
import { useTheme } from "../../context/ThemeContext";

export default function ProjectForm({ onProjectCreated, setMessage, onClose }) {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "active",
    dueDate: "",
  });
  const { darkMode, toggleMode } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    if (!newProject.name.trim()) {
      alert("Project name is required");
      return;
    }

    setMessage({ text: "Creating project...", type: "loading" });
    try {
      const res = await createProject(newProject);
      onProjectCreated(res.data);
      setMessage({ text: "Project created successfully", type: "success" });
      onClose(); // close modal
    } catch (error) {
      setMessage({ text: "Failed to create project", type: "error" });
      console.error(error);
    }
  };

  return (
    <div
      className={
        darkMode ? "projectForm sectionDark" : "projectForm sectionLight"
      }
    >
      <button onClick={onClose} className="closeButton">
        <X size={30} />
      </button>
      <h2>Create New Project</h2>
      <input
        name="name"
        value={newProject.name}
        onChange={handleChange}
        placeholder="Project Name"
        required
      />
      <input
        name="description"
        value={newProject.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="dueDate"
        value={newProject.dueDate}
        onChange={handleChange}
        type="date"
      />
      <select name="status" value={newProject.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="on_hold">On Hold</option>
        <option value="archived">Archived</option>
      </select>

      <div className="modalActions">
        <Button
          name="Create Project"
          style="button buttonType2"
          onClick={handleCreate}
        />
      </div>
    </div>
  );
}
