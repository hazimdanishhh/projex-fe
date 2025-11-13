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
  CircleNotch,
  ListChecks,
  Megaphone,
  SquaresFour,
  Users,
} from "phosphor-react";
import { motion } from "framer-motion";

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showUserModal, setShowUserModal] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const { darkMode, toggleMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [usersIsLoading, setUsersIsLoading] = useState(false);

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

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <CardSection>
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
            </CardSection>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
