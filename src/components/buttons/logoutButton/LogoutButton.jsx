import "../button/Button.scss";
import { useNavigate } from "react-router";
import { useState } from "react";
import { SignOut } from "phosphor-react";
import { logoutUser } from "../../../api/auth.api";
import { useAuth } from "../../../context/AuthContext";

function LogoutButton({ setMessage, navIsOpen, style }) {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // LOGOUT HANDLING: POST req to /api/auth/logout
  const handleLogout = async () => {
    setLoading(true);
    setMessage({ text: "Logging out...", type: "loading" });

    try {
      const res = await logoutUser();

      // Use AuthContext  handling function
      logout();

      setMessage({ text: "Logged out successfully", type: "success" }); // UI message

      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error("Logout error:", err);
      setMessage({ text: "Failed to logout", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} className={style}>
      {navIsOpen ? "Logout" : null}
      <SignOut size={navIsOpen ? "20" : "24"} />
    </button>
  );
}

export default LogoutButton;
