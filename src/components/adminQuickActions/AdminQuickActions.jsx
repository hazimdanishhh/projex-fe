import "./AdminQuickActions.scss";
import { CaretDown, CaretUp, Megaphone, Plus, Sparkle } from "phosphor-react";
import { Link } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMediaQuery from "../../functions/mediaQuery";
import AdminQuickActionsCard from "./adminQuickActionsCard/AdminQuickActionsCard";
import { adminQuickActionsHome } from "../../data/adminQuickActionsCardData";

function AdminQuickActions({ onClick }) {
  const { darkMode, toggleMode } = useTheme();
  const [quickActionsIsOpen, setQuickActionsIsOpen] = useState(true);

  const isDesktop = useMediaQuery("(min-width: 1025px)");

  useEffect(() => {
    if (!isDesktop) {
      setQuickActionsIsOpen(false);
    } else {
      setQuickActionsIsOpen(true);
    }
  }, [isDesktop]);

  function handleAction(actionType) {
    if (actionType === "project") {
      onClick("project");
    } else if (actionType === "task") {
      onClick("task");
    }
  }

  return (
    <div className="quickActionsSection">
      <button
        className="quickActionsHeader"
        onClick={() => setQuickActionsIsOpen(!quickActionsIsOpen)}
      >
        <Sparkle size="16" weight="bold" />
        <p className="textBold textXXS">QUICK ACTIONS</p>
        {quickActionsIsOpen ? (
          <CaretUp size="18" weight="bold" />
        ) : (
          <CaretDown size="18" weight="bold" />
        )}
      </button>

      <AnimatePresence mode="wait">
        {quickActionsIsOpen && (
          <motion.div
            className="quickActionsCardLayout"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {adminQuickActionsHome.map((action, index) => (
              <AdminQuickActionsCard
                key={index}
                icon={action.icon}
                name={action.name}
                onClick={() => handleAction(action.actionType)}
                path="/admin/create-user"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminQuickActions;
