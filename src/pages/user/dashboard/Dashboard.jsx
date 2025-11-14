import "./Dashboard.scss";
import { useEffect, useState } from "react";
import MessageUI from "../../../components/messageUI/MessageUI";
import PageTransition from "../../../components/pageTransition/PageTransition";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import QuickActions from "../../../components/quickActions/QuickActions";
import SectionHeader from "../../../components/sectionHeader/SectionHeader";
import {
  CaretRight,
  ChartBar,
  Check,
  CircleNotch,
  Hourglass,
  ListChecks,
  ListDashes,
  Megaphone,
  SquaresFour,
} from "phosphor-react";
import CardSection from "../../../components/cardSection/CardSection";
import CardLayout from "../../../components/cardLayout/CardLayout";
import { Link } from "react-router";
import { getProjects } from "../../../api/project.api";
import ProjectCard from "../../../components/projectCard.jsx/ProjectCard";
import TasksTable from "../../../components/tasksTable/TasksTable";
import { getTasks } from "../../../api/task.api";
import TaskCard from "../../../components/taskCard/TaskCard";
import TaskForm from "../../../components/taskForm/TaskForm";
import ProjectForm from "../../../components/projectForm/ProjectForm";
import { motion } from "framer-motion";

function Dashboard() {
  const { user } = useAuth();
  const { darkMode, toggleMode } = useTheme();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showExitTransition, setShowExitTransition] = useState(true);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [tasksIsLoading, setTasksIsLoading] = useState(false);
  const [projectsIsLoading, setProjectsIsLoading] = useState(false);

  // Dashboard Stats
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter(
    (p) => p.status === "completed"
  ).length;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "in_progress"
  ).length;

  // Page Transition Animation + Message
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExitTransition(false);
    }, 800); // Shorter duration to hide the circle

    setMessage({ text: `Welcome back ${user.name}`, type: "success" });

    return () => clearTimeout(timer);
  }, []);

  const fetchData = async () => {
    setMessage({ text: "Loading Tasks & Projects...", type: "loading" });
    setTasksIsLoading(true);
    setProjectsIsLoading(true);
    const tasksRes = await getTasks();
    setTasks(tasksRes.data);

    const projectsRes = await getProjects();
    setProjects(projectsRes.data);
    setMessage({ text: "Tasks & Projects loaded", type: "success" });
    setTasksIsLoading(false);
    setProjectsIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleTaskDeleted = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

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
      <PageTransition isVisible={showExitTransition} mode="exit" />
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

      {/* Modal TaskForm */}
      {showTaskModal && (
        <TaskForm
          projects={projects}
          onTaskCreated={handleTaskCreated}
          setMessage={setMessage}
          onClose={() => setShowTaskModal(false)}
        />
      )}

      {showProjectModal && (
        <ProjectForm
          onProjectCreated={handleProjectCreated}
          setMessage={setMessage}
          onClose={() => setShowProjectModal(false)}
        />
      )}

      {/* ANALYTICS DASHBOARD */}
      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <CardSection>
              <SectionHeader icon={ChartBar} title="DASHBOARD OVERVIEW" />

              {/* PROJECTS SUMMARY */}
              <CardSection>
                <CardLayout style="cardLayout1">
                  {/* ⭐ Combined Project Status Bar */}
                  <div className="analyticsCard">
                    <h3 className="textM">Project Status Overview</h3>

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
                  <Link
                    className="analyticsCard analyticsCard2"
                    to="/user/workspace/projects"
                  >
                    <div className="analyticsCardTitle">
                      <SquaresFour size={16} />
                      <h3 className="textRegular textXXS">Total Projects</h3>
                    </div>
                    <p className="analyticsNumber">{totalProjects}</p>
                  </Link>

                  {/* Completed */}
                  <Link
                    className="analyticsCard analyticsCard2"
                    to="/user/workspace/projects"
                  >
                    <div className="analyticsCardTitle">
                      <Check size={16} />
                      <h3 className="textRegular textXXS">
                        Completed Projects
                      </h3>
                    </div>

                    <p className="analyticsNumber">{completedProjects}</p>
                  </Link>

                  {/* Active */}
                  <Link
                    className="analyticsCard analyticsCard2"
                    to="/user/workspace/projects"
                  >
                    <div className="analyticsCardTitle">
                      <Hourglass size={16} />
                      <h3 className="textRegular textXXS">Active Projects</h3>
                    </div>

                    <p className="analyticsNumber">{activeProjects}</p>
                  </Link>
                </CardLayout>
              </CardSection>

              {/* TASKS SUMMARY */}
              <CardSection>
                <CardLayout style="cardLayout1">
                  {/* ⭐ Combined Task Status */}
                  <div className="analyticsCard">
                    <h3 className="textM">Task Status Overview</h3>

                    <div className="statusBar">
                      <div
                        className="statusSegment completed"
                        style={{
                          width: `${(completedTasks / totalTasks) * 100 || 0}%`,
                        }}
                      />
                      <div
                        className="statusSegment progress"
                        style={{
                          width: `${
                            (inProgressTasks / totalTasks) * 100 || 0
                          }%`,
                        }}
                      />
                    </div>

                    <div className="statusLabels">
                      <span className="completed">
                        Completed: {completedTasks}
                      </span>
                      <span className="progress">
                        In Progress: {inProgressTasks}
                      </span>
                    </div>
                  </div>
                </CardLayout>

                {/* TASKS SUMMARY */}
                <CardLayout style="cardLayout3">
                  {/* Total Tasks */}
                  <Link
                    className="analyticsCard analyticsCard2"
                    to="/user/workspace/tasks"
                  >
                    <div className="analyticsCardTitle">
                      <ListDashes size={16} />
                      <h3 className="textRegular textXXS">Total Tasks</h3>
                    </div>

                    <p className="analyticsNumber">{totalTasks}</p>
                  </Link>

                  {/* Completed */}
                  <Link
                    className="analyticsCard analyticsCard2"
                    to="/user/workspace/tasks"
                  >
                    <div className="analyticsCardTitle">
                      <Check size={16} />
                      <h3 className="textRegular textXXS">Completed Tasks</h3>
                    </div>

                    <p className="analyticsNumber">{completedTasks}</p>
                  </Link>

                  {/* In Progress */}
                  <Link
                    className="analyticsCard analyticsCard2"
                    to="/user/workspace/tasks"
                  >
                    <div className="analyticsCardTitle">
                      <Hourglass size={16} />
                      <h3 className="textRegular textXXS">Tasks In Progress</h3>
                    </div>

                    <p className="analyticsNumber">{inProgressTasks}</p>
                  </Link>
                </CardLayout>
              </CardSection>
            </CardSection>
          </div>
        </div>
      </section>

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <CardSection>
              <SectionHeader icon={SquaresFour} title="LATEST PROJECTS" />
              {projectsIsLoading ? (
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

              <CardLayout style="cardLayout1">
                {projects
                  .slice() // create a shallow copy so we don't mutate the original
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
                  .slice(0, 2)
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} dashboard />
                  ))}
              </CardLayout>
              <Link
                to="/user/workspace/projects"
                className="button buttonType2"
              >
                View All
                <CaretRight weight="bold" />
              </Link>
            </CardSection>
          </div>
        </div>
      </section>

      <div className="sectionHalf">
        <section className={darkMode ? "sectionDark" : "sectionLight"}>
          <div className="sectionWrapper">
            <div className="sectionContent">
              {/* TASKS TABLE */}
              <CardSection>
                <SectionHeader icon={ListChecks} title="LATEST TASKS" />
                {tasksIsLoading ? (
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
                ) : tasks.length === 0 ? (
                  <p>You have no tasks</p>
                ) : null}
                <CardLayout style="cardLayout3">
                  {tasks
                    .slice()
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .slice(0, 7)
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onTaskUpdated={handleTaskUpdated}
                        onTaskDeleted={handleTaskDeleted}
                      />
                    ))}
                </CardLayout>
                <Link to="/user/workspace/tasks" className="button buttonType2">
                  View All
                  <CaretRight weight="bold" />
                </Link>
              </CardSection>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
