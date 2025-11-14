import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import MessageUI from "../../../components/messageUI/MessageUI";
import CreateUserForm from "../../../components/createUserForm/CreateUserForm";
import { useTheme } from "../../../context/ThemeContext";

export default function AdminCreateUser() {
  const { user } = useAuth();
  const { darkMode, toggleMode } = useTheme();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", type: "" });

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
            <CreateUserForm setMessage={setMessage} />
          </div>
        </div>
      </section>
    </>
  );
}
