// src/components/projects/ProjectCard.jsx
import { useState } from "react";
import "./ProjectCard.scss";
import { updateProjectById, deleteProjectById } from "../../api/project.api";
import Button from "../buttons/button/Button";
import MessageUI from "../messageUI/MessageUI";
import { PencilSimple, Trash } from "phosphor-react";

export default function ProjectCard({
  project,
  onProjectUpdated,
  onProjectDeleted,
  dashboard,
}) {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description || "",
    status: project.status || "active",
    dueDate: project.dueDate ? project.dueDate.split("T")[0] : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!formData.name.trim()) return alert("Project name is required");
    setMessage({ text: "Saving edits...", type: "loading" });
    const updatedProject = await updateProjectById(project.id, formData);
    onProjectUpdated(updatedProject.data);
    setEditing(false);
    setMessage({ text: "Edits saved", type: "success" });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProjectById(project.id);
      onProjectDeleted(project.id);
    }
  };

  return (
    <>
      <MessageUI message={message} setMessage={setMessage} />

      <div className="projectCard">
        {editing ? (
          <>
            <div className="projectCardContent form">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.dueDate}
                onChange={handleChange}
                type="date"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="projectCardButtons">
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
          </>
        ) : (
          <>
            <div className="projectCardContent">
              <div className="projectCardHead">
                <p className="textLight textXS">
                  Due:{" "}
                  {project.dueDate ? `${project.dueDate.split("T")[0]}` : ""}
                </p>
                <p
                  className={`textLight textXXS projectCardStatus ${project.status}`}
                >
                  ◉ {project.status.replace("_", " ")}
                </p>
              </div>

              <h3 className="textBold textM">{project.name}</h3>
              <p className="textRegular textS">
                <span className="textLight textXXS">Description</span>{" "}
                {project.description}
              </p>
            </div>
            {!dashboard && (
              <div className="projectCardButtons">
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
            )}
          </>
        )}
      </div>
    </>
  );
}
