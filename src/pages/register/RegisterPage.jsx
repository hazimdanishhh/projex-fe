import { useEffect, useState } from "react";
import RegisterForm from "../../components/registerForm/RegisterForm";
import MessageUI from "../../components/messageUI/MessageUI";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect logged-in users
  useEffect(() => {
    if (user && user?.id) {
      setMessage({
        text: "Already logged in, redirecting...",
        type: "loading",
      });

      const timeout = setTimeout(() => {
        if (user.role === "admin") navigate("/admin/dashboard");
        else navigate("/user/dashboard");
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [user, navigate]);

  return (
    <>
      <MessageUI message={message} setMessage={setMessage} timeout="6000" />
      <RegisterForm setMessage={setMessage} />
    </>
  );
}
