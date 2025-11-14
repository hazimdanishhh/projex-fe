import { useEffect, useState } from "react";
import MessageUI from "../../../components/messageUI/MessageUI";
import { fetchAllUsers } from "../../../api/admin.api";
import { useTheme } from "../../../context/ThemeContext";
import SectionHeader from "../../../components/sectionHeader/SectionHeader";
import CardLayout from "../../../components/cardLayout/CardLayout";
import CardSection from "../../../components/cardSection/CardSection";
import { Users } from "phosphor-react";
import AdminUserCard from "../../../components/adminUserCard/AdminUserCard";

function AdminUsers() {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [users, setUsers] = useState([]);
  const { darkMode, toggleMode } = useTheme();
  const [usersIsLoading, setUsersIsLoading] = useState(false);

  //   Get All Users on page load
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setMessage({ text: "Successfully fetched all users", type: "success" });
        setUsers(data);
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

export default AdminUsers;
