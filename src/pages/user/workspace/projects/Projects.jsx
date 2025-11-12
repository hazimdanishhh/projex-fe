// src/components/projects/Projects.jsx
import { useState, useEffect } from "react";
import { createProject, getProjects } from "../../../../api/project.api";
import ProjectCard from "../../../../components/projectCard.jsx/ProjectCard";
import { useTheme } from "../../../../context/ThemeContext";
import MessageUI from "../../../../components/messageUI/MessageUI";
import CardSection from "../../../../components/cardSection/CardSection";
import SectionHeader from "../../../../components/sectionHeader/SectionHeader";
import CardLayout from "../../../../components/cardLayout/CardLayout";
import { SquaresFour } from "phosphor-react";
import QuickActions from "../../../../components/quickActions/QuickActions";

export default function Projects() {
  const { darkMode, toggleMode } = useTheme();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "active",
    dueDate: "",
  });

  const fetchProjects = async () => {
    setMessage({ text: "Loading Projects", type: "loading" });
    const res = await getProjects();
    setProjects(res.data);
    setMessage({ text: "Projects loaded", type: "success" });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    if (!newProject.name.trim()) return alert("Project name is required");
    const res = await createProject(newProject);
    setProjects((prev) => [...prev, res.data]);
    setNewProject({ name: "", description: "", status: "", dueDate: "" });
  };

  const handleProjectUpdated = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const handleProjectDeleted = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <MessageUI message={message} setMessage={setMessage} />

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <QuickActions />
          </div>
        </div>
      </section>

      <div className="sectionHalf">
        <section className={darkMode ? "sectionDark" : "sectionLight"}>
          <div className="sectionWrapper">
            <div className="sectionContent">
              <h2>Your Projects</h2>
              {/* PROJECTS FORM */}
              <div>
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
                <select
                  name="status"
                  value={newProject.status || "active"}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on_hold">On Hold</option>
                  <option value="archived">Archived</option>
                </select>
                <button onClick={handleCreate}>Add Project</button>
              </div>

              <CardSection>
                <SectionHeader icon={SquaresFour} title="ALL PROJECTS" />
                <CardLayout style="cardLayout2">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onProjectUpdated={handleProjectUpdated}
                      onProjectDeleted={handleProjectDeleted}
                    />
                  ))}
                </CardLayout>
              </CardSection>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
