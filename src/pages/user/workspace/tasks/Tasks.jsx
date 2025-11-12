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
import { ListChecks } from "phosphor-react";
import QuickActions from "../../../../components/quickActions/QuickActions";
import Button from "../../../../components/buttons/button/Button";
import TaskForm from "../../../../components/taskForm/TaskForm";

export default function Tasks() {
  const { darkMode } = useTheme();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

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
            <QuickActions />
          </div>
        </div>
      </section>

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <Button
              name="Create New Task"
              style="button buttonType2"
              onClick={() => setShowTaskModal(true)}
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

      <div className="sectionHalf">
        <section className={darkMode ? "sectionDark" : "sectionLight"}>
          <div className="sectionWrapper">
            <div className="sectionContent">
              {/* TASKS TABLE */}
              <CardSection>
                <SectionHeader icon={ListChecks} title="ALL TASKS" />
                <CardLayout style="cardLayout1">
                  <TasksTable
                    projects={projects}
                    tasks={tasks}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                  />
                </CardLayout>
              </CardSection>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
