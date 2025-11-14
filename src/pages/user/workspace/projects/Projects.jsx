import { useState, useEffect } from "react";
import { getProjects } from "../../../../api/project.api";
import ProjectCard from "../../../../components/projectCard.jsx/ProjectCard";
import { useTheme } from "../../../../context/ThemeContext";
import MessageUI from "../../../../components/messageUI/MessageUI";
import CardSection from "../../../../components/cardSection/CardSection";
import SectionHeader from "../../../../components/sectionHeader/SectionHeader";
import CardLayout from "../../../../components/cardLayout/CardLayout";
import {
  ChartBar,
  Check,
  CircleNotch,
  Hourglass,
  Megaphone,
  Plus,
  SquaresFour,
} from "phosphor-react";
import QuickActions from "../../../../components/quickActions/QuickActions";
import Button from "../../../../components/buttons/button/Button";
import ProjectForm from "../../../../components/projectForm/ProjectForm";
import TaskForm from "../../../../components/taskForm/TaskForm";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Projects() {
  const { darkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Dashboard Stats
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter(
    (p) => p.status === "completed"
  ).length;

  const fetchProjects = async () => {
    setMessage({ text: "Loading Projects", type: "loading" });
    setIsLoading(true);
    const res = await getProjects();
    setProjects(res.data);
    setMessage({ text: "Projects loaded", type: "success" });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setShowTaskModal(false); // close modal after creation
  };

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
            <QuickActions
              onClick={(type) => {
                if (type === "project") setShowProjectModal(true);
                if (type === "task") setShowTaskModal(true);
              }}
            />
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

      {/* Modal TaskForm */}
      {showTaskModal && (
        <TaskForm
          projects={projects}
          onTaskCreated={handleTaskCreated}
          setMessage={setMessage}
          onClose={() => setShowTaskModal(false)}
        />
      )}

      {/* ANALYTICS DASHBOARD */}
      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <CardSection>
              <SectionHeader icon={ChartBar} title="PROJECTS OVERVIEW" />

              {/* PROJECTS SUMMARY */}
              <CardLayout style="cardLayout1">
                {/* ⭐ Combined Project Status Bar */}
                <div className="analyticsCard">
                  <div className="statusBar">
                    <div
                      className="statusSegment completed"
                      style={{
                        width: `${
                          (completedProjects / totalProjects) * 100 || 0
                        }%`,
                      }}
                    />
                    <div
                      className="statusSegment active"
                      style={{
                        width: `${
                          (activeProjects / totalProjects) * 100 || 0
                        }%`,
                      }}
                    />
                  </div>

                  <div className="statusLabels">
                    <span className="completed">
                      Completed: {completedProjects}
                    </span>
                    <span className="active">Active: {activeProjects}</span>
                  </div>
                </div>
              </CardLayout>

              <CardLayout style="cardLayout3">
                {/* Total Projects */}
                <div className="analyticsCard">
                  <div className="analyticsCardTitle">
                    <SquaresFour size={24} />
                    <h3 className="textRegular textS">Total Projects</h3>
                  </div>
                  <p className="analyticsNumber">{totalProjects}</p>
                </div>

                {/* Completed */}
                <div className="analyticsCard">
                  <div className="analyticsCardTitle">
                    <Check size={24} />
                    <h3 className="textRegular textS">Completed Projects</h3>
                  </div>

                  <p className="analyticsNumber">{completedProjects}</p>
                </div>

                {/* Active */}
                <div className="analyticsCard">
                  <div className="analyticsCardTitle">
                    <Hourglass size={24} />
                    <h3 className="textRegular textS">Active Projects</h3>
                  </div>

                  <p className="analyticsNumber">{activeProjects}</p>
                </div>
              </CardLayout>
            </CardSection>
          </div>
        </div>
      </section>

      <div className="sectionHalf">
        <section className={darkMode ? "sectionDark" : "sectionLight"}>
          <div className="sectionWrapper">
            <div className="sectionContent" style={{ gap: "1rem" }}>
              <SectionHeader icon={SquaresFour} title="ALL PROJECTS" />
              {isLoading ? (
                <div className="loadingIcon">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 1,
                    }}
                  >
                    <CircleNotch />
                  </motion.div>
                </div>
              ) : projects.length === 0 ? (
                <p>You have no projects...</p>
              ) : null}

              <CardLayout style="cardLayout2">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onProjectUpdated={handleProjectUpdated}
                    onProjectDeleted={handleProjectDeleted}
                  />
                ))}

                {/* CREATE PROJECT BUTTON */}
                <Button
                  name="Create Project"
                  icon={Plus}
                  style="button buttonType2"
                  onClick={() => setShowProjectModal(true)}
                />
              </CardLayout>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
