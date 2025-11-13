// src/components/tasks/TaskCard.jsx
import { useState } from "react";
import { updateTaskById, deleteTaskById } from "../../api/task.api";
import Button from "../buttons/button/Button";
import MessageUI from "../messageUI/MessageUI";
import "./TaskCardLong.scss";
import { PencilSimple, Trash } from "phosphor-react";

export default function TaskCardLong({
  projects,
  tasks,
  onTaskUpdated,
  onTaskDeleted,
  dashboard,
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

        return (
          <div key={project.id} className="taskGroupWrapper">
            <h3 className="projectTitle textBold textS">{project.name}</h3>

            <div className="taskGroupCards">
              {projectTasks.length > 0 ? (
                projectTasks.map((task) => (
                  <div key={task.id} className="taskCardLong">
                    {editingId === task.id ? (
                      <div className="taskCardContent form">
                        <input
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Task Title"
                          required
                        />
                        <textarea
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
                            onClick={() => handleUpdate(task.id)}
                          />
                          <Button
                            name="Cancel"
                            style="button buttonType2-1"
                            onClick={() => setEditingId(null)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="taskCardContent">
                        <h4 className="textBold textS title">{task.title}</h4>
                        <p className="textRegular textXS description">
                          {task.description}
                        </p>
                        <p className="textLight textXS dueDate">
                          <span className="textLight textXXS">Due: </span>
                          {task.dueDate ? task.dueDate.split("T")[0] : "N/A"}
                        </p>
                        <p
                          className={`textLight textXXS taskCardStatus ${task.status}`}
                        >
                          ◉ {task.status.replace("_", " ")}
                        </p>
                        <p
                          className={`textLight textXXS taskCardPriority ${task.priority}`}
                        >
                          ⚑{" "}
                          {task.priority.charAt(0).toUpperCase() +
                            task.priority.slice(1)}
                        </p>

                        {!dashboard && (
                          <div className="taskCardButtons">
                            <Button
                              icon={PencilSimple}
                              style="button buttonType1"
                              onClick={() => handleEditClick(task)}
                            />
                            <Button
                              icon={Trash}
                              style="button buttonType1-1"
                              onClick={() => handleDelete(task.id)}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="noTasksText">No tasks for this project</p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
