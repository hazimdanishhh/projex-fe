import { useState, useEffect } from "react";
import { getProjects } from "../../../../api/project.api";
import ProjectCard from "../../../../components/projectCard.jsx/ProjectCard";
import { useTheme } from "../../../../context/ThemeContext";
import MessageUI from "../../../../components/messageUI/MessageUI";
import CardSection from "../../../../components/cardSection/CardSection";
import SectionHeader from "../../../../components/sectionHeader/SectionHeader";
import CardLayout from "../../../../components/cardLayout/CardLayout";
import { Plus, SquaresFour } from "phosphor-react";
import QuickActions from "../../../../components/quickActions/QuickActions";
import Button from "../../../../components/buttons/button/Button";
import ProjectForm from "../../../../components/projectForm/ProjectForm";

export default function Projects() {
  const { darkMode } = useTheme();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const fetchProjects = async () => {
    setMessage({ text: "Loading Projects", type: "loading" });
    const res = await getProjects();
    setProjects(res.data);
    setMessage({ text: "Projects loaded", type: "success" });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
    setShowProjectModal(false);
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
            <CardLayout style="cardLayout5">
              <button
                className="quickActionsCard"
                onClick={() => setShowProjectModal(true)}
              >
                <div className="quickActionsCardTitle">
                  <SquaresFour size="18" />
                  <p className="textRegular textXXXS">Create Project</p>
                </div>
                <div className="quickActionsPlusIcon">
                  <Plus />
                </div>
              </button>
            </CardLayout>
          </div>
        </div>
      </section>

      {showProjectModal && (
        <ProjectForm
          onProjectCreated={handleProjectCreated}
          setMessage={setMessage}
          onClose={() => setShowProjectModal(false)}
        />
      )}

      <div className="sectionHalf">
        <section className={darkMode ? "sectionDark" : "sectionLight"}>
          <div className="sectionWrapper">
            <div className="sectionContent">
              <CardSection>
                <SectionHeader icon={SquaresFour} title="ALL PROJECTS" />
                {projects.length === 0 && <p>You have no projects</p>}
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
