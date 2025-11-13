// src/components/tasks/TasksTable.jsx
import { useState } from "react";
import { updateTaskById, deleteTaskById } from "../../api/task.api";
import Button from "../buttons/button/Button";
import MessageUI from "../messageUI/MessageUI";
import "./TasksTable.scss";
import { PencilSimple, Trash } from "phosphor-react";

export default function TasksTable({
  projects,
  tasks,
  onTaskUpdated,
  onTaskDeleted,
}) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setFormData({
      title: task.title,
      description: task.description || "",
      priority: task.priority || "medium",
      status: task.status || "pending",
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (taskId) => {
    if (!formData.title.trim()) return alert("Task title is required");
    setMessage({ text: "Saving edits...", type: "loading" });
    const updatedTask = await updateTaskById(taskId, formData);
    onTaskUpdated(updatedTask.data);
    setEditingId(null);
    setMessage({ text: "Edits saved", type: "success" });
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTaskById(taskId);
      onTaskDeleted(taskId);
    }
  };

  return (
    <>
      <MessageUI message={message} setMessage={setMessage} />
      {projects.map((project) => {
        const projectTasks = tasks.filter((t) => t.projectId === project.id);
        if (projectTasks.length === 0) return null;

        return (
          <div key={project.id} className="tasksTableWrapper">
            <h3 className="projectTitle">{project.name}</h3>
            <table className="tasksTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projectTasks.map((task) => (
                  <tr key={task.id} className="textLight textXXS">
                    {editingId === task.id ? (
                      <>
                        <td>
                          <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </td>
                        <td>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <Button
                            name="Save"
                            style="button buttonType2"
                            onClick={() => handleUpdate(task.id)}
                          />
                          <Button
                            name="Cancel"
                            style="button buttonType2-1"
                            onClick={() => setEditingId(null)}
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <span className={`taskPriority ${task.priority}`}>
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </span>
                        </td>
                        <td>
                          <span className={`taskStatus ${task.status}`}>
                            {task.status.replace("_", " ")}
                          </span>
                        </td>
                        <td>
                          {task.dueDate ? task.dueDate.split("T")[0] : "N/A"}
                        </td>
                        <td className="taskTableButtons">
                          <Button
                            icon={PencilSimple}
                            style="button buttonType2"
                            onClick={() => handleEditClick(task)}
                          />
                          <Button
                            icon={Trash}
                            style="button buttonType2-1"
                            onClick={() => handleDelete(task.id)}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}
