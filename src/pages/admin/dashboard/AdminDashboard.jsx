import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import MessageUI from "../../../components/messageUI/MessageUI";
import Navbar from "../../../components/navbar/Navbar";
import { useTheme } from "../../../context/ThemeContext";

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", type: "" });
  const { darkMode, toggleMode } = useTheme();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/unauthorized"); // Redirect non-admins
    }
  }, [user, navigate]);
  return (
    <>
      <MessageUI message={message} setMessage={setMessage} />

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <h1>Admin Dashboard</h1>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
