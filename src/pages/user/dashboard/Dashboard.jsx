import { useEffect, useState } from "react";
import MessageUI from "../../../components/messageUI/MessageUI";
import PageTransition from "../../../components/pageTransition/PageTransition";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import QuickActions from "../../../components/quickActions/QuickActions";
import SectionHeader from "../../../components/sectionHeader/SectionHeader";
import { CaretRight, ListChecks, Megaphone, SquaresFour } from "phosphor-react";
import CardSection from "../../../components/cardSection/CardSection";
import CardLayout from "../../../components/cardLayout/CardLayout";
import { Link } from "react-router";
import { getProjects } from "../../../api/project.api";
import ProjectCard from "../../../components/projectCard.jsx/ProjectCard";
import TasksTable from "../../../components/tasksTable/TasksTable";
import { getTasks } from "../../../api/task.api";
import TaskCard from "../../../components/taskCard/TaskCard";

function Dashboard() {
  const { user } = useAuth();
  const { darkMode, toggleMode } = useTheme();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showExitTransition, setShowExitTransition] = useState(true);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

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
    const tasksRes = await getTasks();
    setTasks(tasksRes.data);

    const projectsRes = await getProjects();
    setProjects(projectsRes.data);
    setMessage({ text: "Tasks & Projects loaded", type: "success" });
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

  return (
    <>
      <PageTransition isVisible={showExitTransition} mode="exit" />
      <MessageUI message={message} setMessage={setMessage} />

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <QuickActions />
          </div>
        </div>
      </section>

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <CardSection>
              <SectionHeader icon={SquaresFour} title="LATEST PROJECTS" />
              {projects.length === 0 && <p>You have no projects</p>}
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
                {tasks.length === 0 && <p>You have no tasks</p>}
                <CardLayout style="cardLayout2">
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
