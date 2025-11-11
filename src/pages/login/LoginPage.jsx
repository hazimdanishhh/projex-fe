import { useEffect, useState } from "react";
import LoginForm from "../../components/loginForm/LoginForm";
import MessageUI from "../../components/messageUI/MessageUI";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user already logged in, redirect to dashboard
  useEffect(() => {
    if (user && user?.id) {
      setMessage({
        text: "Already logged in, redirecting...",
        type: "loading",
      });

      const timeout = setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }, 1500); // Short delay for user experience

      return () => clearTimeout(timeout);
    }
  }, [user, navigate]);

  // TODO:
  // Move PageTransition from loginForm to this LoginPage

  return (
    <>
      <MessageUI message={message} setMessage={setMessage} timeout="6000" />

      <LoginForm setMessage={setMessage} />
    </>
  );
}
