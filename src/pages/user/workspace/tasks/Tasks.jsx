// src/components/tasks/Tasks.jsx
import { useState, useEffect } from "react";
import { getProjects } from "../../../../api/project.api";
import { createTask, getTasks } from "../../../../api/task.api";
import TasksTable from "../../../../components/tasksTable/TasksTable";
import { useTheme } from "../../../../context/ThemeContext";
import MessageUI from "../../../../components/messageUI/MessageUI";
import CardSection from "../../../../components/cardSection/CardSection";
import SectionHeader from "../../../../components/sectionHeader/SectionHeader";
import CardLayout from "../../../../components/cardLayout/CardLayout";
import {
  CaretRight,
  ChartBar,
  Check,
  CircleNotch,
  Hourglass,
  ListChecks,
  ListDashes,
  Megaphone,
  Plus,
} from "phosphor-react";
import QuickActions from "../../../../components/quickActions/QuickActions";
import Button from "../../../../components/buttons/button/Button";
import TaskForm from "../../../../components/taskForm/TaskForm";
import { motion } from "framer-motion";
import ProjectForm from "../../../../components/projectForm/ProjectForm";
import TaskCard from "../../../../components/taskCard/TaskCard";
import TaskCardLong from "../../../../components/taskCardLong/TaskCardLong";
import { Link } from "react-router";

export default function Tasks() {
  const { darkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Dashboard Analytics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "in_progress"
  ).length;

  const fetchData = async () => {
    setMessage({ text: "Loading Tasks & Projects...", type: "loading" });
    setIsLoading(true);
    const tasksRes = await getTasks();
    setTasks(tasksRes.data);

    const projectsRes = await getProjects();
    setProjects(projectsRes.data);
    setMessage({ text: "Tasks & Projects loaded", type: "success" });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
    setShowProjectModal(false);
  };

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
              <SectionHeader icon={ChartBar} title="TASKS OVERVIEW" />

              <CardLayout style="cardLayout1">
                {/* ⭐ Combined Task Status */}
                <div className="analyticsCard">
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
                        width: `${(inProgressTasks / totalTasks) * 100 || 0}%`,
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
                <div className="analyticsCard analyticsCard2">
                  <div className="analyticsCardTitle">
                    <ListDashes size={16} />
                    <h3 className="textRegular textXXS">Total Tasks</h3>
                  </div>

                  <p className="analyticsNumber">{totalTasks}</p>
                </div>

                {/* Completed */}
                <div className="analyticsCard analyticsCard2">
                  <div className="analyticsCardTitle">
                    <Check size={16} />
                    <h3 className="textRegular textXXS">Completed Tasks</h3>
                  </div>

                  <p className="analyticsNumber">{completedTasks}</p>
                </div>

                {/* In Progress */}
                <div className="analyticsCard analyticsCard2">
                  <div className="analyticsCardTitle">
                    <Hourglass size={16} />
                    <h3 className="textRegular textXXS">Tasks In Progress</h3>
                  </div>

                  <p className="analyticsNumber">{inProgressTasks}</p>
                </div>
              </CardLayout>
            </CardSection>
          </div>
        </div>
      </section>

      <div className="sectionHalf">
        <section className={darkMode ? "sectionDark" : "sectionLight"}>
          <div className="sectionWrapper">
            <div className="sectionContent">
              {/* TASKS TABLE */}
              <div className="sectionContent" style={{ gap: "1rem" }}>
                <SectionHeader icon={ListChecks} title="LATEST TASKS" />
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
                ) : tasks.length === 0 ? (
                  <p>You have no tasks</p>
                ) : null}

                <CardLayout style="cardLayout1">
                  <TaskCardLong
                    projects={projects}
                    tasks={tasks}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                  />
                </CardLayout>
                {/* CREATE PROJECT BUTTON */}
                <Button
                  name="Create Task"
                  icon={Plus}
                  style="button buttonType2"
                  onClick={() => setShowTaskModal(true)}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
