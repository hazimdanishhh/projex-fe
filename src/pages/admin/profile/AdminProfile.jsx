import "./AdminProfile.scss";
import { useState } from "react";
import MessageUI from "../../../components/messageUI/MessageUI";
import ProfileCard, {
  ProfileCardLoading,
} from "../../../components/profileCard/ProfileCard";
import { useTheme } from "../../../context/ThemeContext";
import useUserProfile from "../../../hooks/useUserProfile";
import UpdateProfileAsAdminForm from "../../../components/updateProfileAsAdminForm/UpdateProfileAsAdminForm";

export default function Profile() {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);

  const { darkMode, toggleMode } = useTheme();
  const { profile, loading } = useUserProfile({ setMessage });

  return (
    <>
      <MessageUI message={message} setMessage={setMessage} />

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <h1 className="textRegular textL">Your Profile</h1>

            {loading ? (
              // Loading Card UI
              <ProfileCardLoading />
            ) : profile ? (
              // Profile Card UI
              <ProfileCard profile={profile} />
            ) : (
              // No Profile UI
              <p>No profile data found.</p>
            )}

            {isEditing === false ? (
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="editProfileButton"
              >
                Edit Profile
              </button>
            ) : null}

            {isEditing && (
              <UpdateProfileAsAdminForm
                profile={profile}
                setIsEditing={setIsEditing}
                setMessage={setMessage}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
