// src/components/tasks/TaskCard.jsx
import { useState } from "react";
import { updateTaskById, deleteTaskById } from "../../api/task.api";
import Button from "../buttons/button/Button";
import MessageUI from "../messageUI/MessageUI";
import "./TaskCard.scss";
import { PencilSimple, Trash } from "phosphor-react";

export default function TaskCard({
  task,
  onTaskUpdated,
  onTaskDeleted,
  dashboard,
}) {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    priority: task.priority || "medium",
    status: task.status || "pending",
    dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!formData.title.trim()) return alert("Task title is required");
    setMessage({ text: "Saving edits...", type: "loading" });
    const updatedTask = await updateTaskById(task.id, formData);
    onTaskUpdated(updatedTask.data);
    setEditing(false);
    setMessage({ text: "Edits saved", type: "success" });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTaskById(task.id);
      onTaskDeleted(task.id);
    }
  };

  return (
    <>
      <MessageUI message={message} setMessage={setMessage} />

      <div className="taskCard">
        {editing ? (
          <div className="taskCardContent form">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task Title"
              required
            />
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <input
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
            />
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <div className="taskCardButtons">
              <Button
                name="Save"
                style="button buttonType2"
                onClick={handleUpdate}
              />
              <Button
                name="Cancel"
                style="button buttonType2-1"
                onClick={() => setEditing(false)}
              />
            </div>
          </div>
        ) : (
          <div className="taskCardContent">
            <p className={`textLight textXXS taskCardStatus ${task.status}`}>
              ◉ {task.status.replace("_", " ")}
            </p>
            <p
              className={`textLight textXXS taskCardPriority ${task.priority}`}
            >
              ⚑ {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </p>
            <h4 className="textBold textS">{task.title}</h4>
            <p className="textRegular textXS">{task.description}</p>
            <p className="textLight textXS">
              <span className="textLight textXXS">Due: </span>
              {task.dueDate ? task.dueDate.split("T")[0] : "N/A"}
            </p>
            {!dashboard && (
              <div className="taskCardButtons">
                <Button
                  icon={PencilSimple}
                  style="button buttonType1"
                  onClick={() => setEditing(true)}
                />
                <Button
                  icon={Trash}
                  style="button buttonType1-1"
                  onClick={handleDelete}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
