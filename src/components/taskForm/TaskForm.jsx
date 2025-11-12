import { useState } from "react";
import { createTask } from "../../api/task.api";
import Button from "../buttons/button/Button";
import "./TaskForm.scss";
import { useTheme } from "../../context/ThemeContext";

export default function TaskForm({
  projects,
  onTaskCreated,
  setMessage,
  onClose,
}) {
  const { darkMode, toggleMode } = useTheme();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    projectId: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    if (!newTask.title.trim() || !newTask.projectId) {
      return alert("Task title and project are required");
    }

    setMessage?.({ text: "Creating task...", type: "loading" });
    const res = await createTask(newTask);
    onTaskCreated(res.data);

    setNewTask({
      title: "",
      description: "",
      projectId: "",
      priority: "medium",
      status: "pending",
      dueDate: "",
    });

    setMessage?.({ text: "Task created", type: "success" });
  };

  return (
    <div
      className={darkMode ? "taskForm sectionDark" : "taskForm sectionLight"}
    >
      <button onClick={onClose}>Close</button>
      <h2>Create a Task</h2>
      <select
        name="projectId"
        value={newTask.projectId}
        onChange={handleChange}
      >
        <option value="">Select Project</option>
        {(projects || []).map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        name="title"
        value={newTask.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <input
        name="description"
        value={newTask.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="dueDate"
        type="date"
        value={newTask.dueDate}
        onChange={handleChange}
      />
      <select name="priority" value={newTask.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select name="status" value={newTask.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <Button
        name="Add Task"
        style="button buttonType2"
        onClick={handleCreate}
      />
    </div>
  );
}
