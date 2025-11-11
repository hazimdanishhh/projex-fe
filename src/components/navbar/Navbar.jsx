import "./Navbar.scss";
import { Link } from "react-router";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "/src/assets/favicon.svg";
import { Bell, CaretRight, SidebarSimple, X } from "phosphor-react";
import { AnimatePresence, motion } from "framer-motion";
import { navModalVariant } from "../../functions/motionUtils";
import useUserProfile from "../../hooks/useUserProfile";
import useClickOutside from "../../hooks/useClickOutside";
import { useTheme } from "../../context/ThemeContext";
import NotificationCard from "../notifications/notificationCard/NotificationCard";
import MobileNav from "../mobileNav/MobileNav";
import useMediaQuery from "../../functions/mediaQuery";
import ThemeButton from "../buttons/themeButton/ThemeButton";

function Navbar() {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const navModalRef = useRef(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const notificationRef = useRef();
  useClickOutside(notificationRef, () => setNotificationIsOpen(false));
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  // Fetch User Profile Data
  const { profile, loading } = useUserProfile({ setMessage });

  // Close navbar when clicked outside
  useClickOutside(navModalRef, () => setMobileNavIsOpen(false));

  return (
    <>
      <nav className={darkMode ? "navbar sectionDark" : "navbar sectionLight"}>
        {/* LOGO & HEADER */}
        <div className="navbarSegment navbarLogoContainer">
          <button
            onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
            className="navButtonType1 mobileNavIcon"
          >
            <SidebarSimple size="24" />
          </button>

          <Link
            to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
            className="textRegular textXS navbarLogo"
          >
            <img src={logo} alt="Logo" style={{ width: "40px" }} />
            Dashboard
          </Link>
        </div>

        {/* NAVBAR BUTTONS */}
        <div className="navbarSegment">
          {/* USER PROFILE */}
          {loading ? (
            <div className="textOverflow navbarProfile">
              <div className="navbarProfileCardLoading" />
              <div className="navbarProfileCardLoading" />
            </div>
          ) : (
            <div className="textOverflow navbarProfile">
              <p className="textRegular textXS">{profile?.name || null}</p>
              <p className="textLight textXXXS">
                <strong className="textRegular">Last Login:</strong>{" "}
                {profile?.lastLoginAt
                  ? new Date(profile?.lastLoginAt).toLocaleString("en-MY", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Never"}
              </p>
            </div>
          )}

          <Link className="profilePhoto" to="/user/profile">
            <img
              src={
                profile?.avatarUrl
                  ? `/${profile?.avatarUrl}`
                  : `/profilePhoto/default.webp`
              }
              alt={profile?.name}
            />
          </Link>
        </div>

        <MobileNav
          onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
          mobileNavIsOpen={mobileNavIsOpen}
        />
      </nav>
    </>
  );
}

export default Navbar;
