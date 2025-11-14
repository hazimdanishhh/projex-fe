import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import MessageUI from "../../../components/messageUI/MessageUI";
import Navbar from "../../../components/navbar/Navbar";
import { useTheme } from "../../../context/ThemeContext";
import AdminQuickActions from "../../../components/adminQuickActions/AdminQuickActions";
import { fetchAllUsers } from "../../../api/admin.api";
import CardSection from "../../../components/cardSection/CardSection";
import CardLayout from "../../../components/cardLayout/CardLayout";
import SectionHeader from "../../../components/sectionHeader/SectionHeader";
import AdminUserCard from "../../../components/adminUserCard/AdminUserCard";
import {
  CaretRight,
  ChartBar,
  Check,
  CircleNotch,
  Hourglass,
  ListChecks,
  Megaphone,
  SquaresFour,
  Users,
  ListDashes,
  XCircle,
} from "phosphor-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { getTasks } from "../../../api/task.api";
import { getProjects } from "../../../api/project.api";

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showUserModal, setShowUserModal] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const { darkMode, toggleMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [usersIsLoading, setUsersIsLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tasksIsLoading, setTasksIsLoading] = useState(false);
  const [projectsIsLoading, setProjectsIsLoading] = useState(false);

  // Dashboard Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((p) => p.status === "active").length;
  const inactiveUsers = users.filter((p) => p.status === "inactive").length;
  const suspendedUsers = users.filter((p) => p.status === "suspended").length;

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

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/unauthorized"); // Redirect non-admins
    }
  }, [user, navigate]);

  //   Get All Users on page load
  useEffect(() => {
    const getUsers = async () => {
      try {
        setUsersIsLoading(true);
        const data = await fetchAllUsers();
        setMessage({ text: "Successfully fetched all users", type: "success" });
        setUsers(data);
        setUsersIsLoading(false);
      } catch (err) {
        console.error(err);
        setMessage({ text: "Failed to fetch users.", type: "error" });
      }
    };

    getUsers();
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

  return (
    <>
      <MessageUI message={message} setMessage={setMessage} />

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <AdminQuickActions
              onClick={(type) => {
                if (type === "user") setShowUserModal(true);
              }}
            />
          </div>
        </div>
      </section>

      {/* ANALYTICS DASHBOARD */}
      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <CardSection>
              <SectionHeader icon={ChartBar} title="ADMIN DASHBOARD OVERVIEW" />

              {/* USERS SUMMARY */}
              <CardSection>
                <CardLayout style="cardLayout1">
                  {/* ⭐ Combined User Status Bar */}
                  <div className="analyticsCard">
                    <h3 className="textM">User Status Overview</h3>

                    <div className="statusBar">
                      <div
                        className="statusSegment active"
                        style={{
                          width: `${(activeUsers / totalUsers) * 100 || 0}%`,
                        }}
                      />
                      <div
                        className="statusSegment inactive"
                        style={{
                          width: `${(inactiveUsers / totalUsers) * 100 || 0}%`,
                        }}
                      />
                      <div
                        className="statusSegment suspended"
                        style={{
                          width: `${(suspendedUsers / totalUsers) * 100 || 0}%`,
                        }}
                      />
                    </div>

                    <div className="statusLabels">
                      <span className="active">Active: {activeUsers}</span>
                      <span className="inactive">
                        Inactive: {inactiveUsers}
                      </span>
                      <span className="suspended">
                        Suspended: {suspendedUsers}
                      </span>
                    </div>
                  </div>
                </CardLayout>

                <CardLayout style="cardLayout2">
                  {/* Total Users */}
                  <div className="analyticsCard analyticsCard2">
                    <div className="analyticsCardTitle">
                      <Users size={16} />
                      <h3 className="textRegular textXXS">Total Users</h3>
                    </div>
                    <p className="analyticsNumber">{totalUsers}</p>
                  </div>

                  {/* Active Users */}
                  <div className="analyticsCard analyticsCard2">
                    <div className="analyticsCardTitle">
                      <Check size={16} />
                      <h3 className="textRegular textXXS">Active Users</h3>
                    </div>
                    <p className="analyticsNumber">{activeUsers}</p>
                  </div>

                  {/* Inactive Users */}
                  <div className="analyticsCard analyticsCard2">
                    <div className="analyticsCardTitle">
                      <Hourglass size={16} />
                      <h3 className="textRegular textXXS">Inactive Users</h3>
                    </div>
                    <p className="analyticsNumber">{inactiveUsers}</p>
                  </div>

                  {/* Suspended Users */}
                  <div className="analyticsCard analyticsCard2">
                    <div className="analyticsCardTitle">
                      <XCircle size={16} />
                      <h3 className="textRegular textXXS">Suspended Users</h3>
                    </div>
                    <p className="analyticsNumber">{suspendedUsers}</p>
                  </div>
                </CardLayout>
              </CardSection>

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
                  <div className="analyticsCard analyticsCard2">
                    <div className="analyticsCardTitle">
                      <SquaresFour size={16} />
                      <h3 className="textRegular textXXS">Total Projects</h3>
                    </div>
                    <p className="analyticsNumber">{totalProjects}</p>
                  </div>

                  {/* Completed */}
                  <div className="analyticsCard analyticsCard2">
                    <div className="analyticsCardTitle">
                      <Check size={16} />
                      <h3 className="textRegular textXXS">
                        Completed Projects
                      </h3>
                    </div>

                    <p className="analyticsNumber">{completedProjects}</p>
                  </div>

                  {/* Active */}
                  <div className="analyticsCard analyticsCard2">
                    <div className="analyticsCardTitle">
                      <Hourglass size={16} />
                      <h3 className="textRegular textXXS">Active Projects</h3>
                    </div>

                    <p className="analyticsNumber">{activeProjects}</p>
                  </div>
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
            </CardSection>
          </div>
        </div>
      </section>

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent" style={{ gap: "10px" }}>
            <SectionHeader icon={Users} title="USERS" />
            {usersIsLoading ? (
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
            ) : users.length === 0 ? (
              <p>There are no users available</p>
            ) : null}

            <CardLayout>
              {users.map((u) => (
                <AdminUserCard
                  key={u.id}
                  user={u}
                  onUserUpdated={(updatedUser) =>
                    setUsers((prev) =>
                      prev.map((usr) =>
                        usr.id === updatedUser.id ? updatedUser : usr
                      )
                    )
                  }
                  onUserDeleted={(deletedUserId) =>
                    setUsers((prev) =>
                      prev.filter((usr) => usr.id !== deletedUserId)
                    )
                  }
                />
              ))}
            </CardLayout>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
