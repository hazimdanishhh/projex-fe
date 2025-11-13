// src/pages/user/Profile.jsx
import { useState } from "react";
import MessageUI from "../../../components/messageUI/MessageUI";
import ProfileCard, {
  ProfileCardLoading,
} from "../../../components/profileCard/ProfileCard";
import { useTheme } from "../../../context/ThemeContext";
import useUserProfile from "../../../hooks/useUserProfile";
import UpdateProfileForm from "../../../components/updateProfileForm/UpdateProfileForm";
import Button from "../../../components/buttons/button/Button";

export default function Profile() {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);

  const { darkMode } = useTheme();
  const { profile, loading } = useUserProfile({ setMessage });

  return (
    <>
      <MessageUI message={message} setMessage={setMessage} />

      <section className={darkMode ? "sectionDark" : "sectionLight"}>
        <div className="sectionWrapper">
          <div className="sectionContent">
            <h1 className="textRegular textL">Your Profile</h1>

            {loading ? (
              <ProfileCardLoading />
            ) : profile ? (
              <>
                <ProfileCard profile={profile} />

                {!isEditing ? (
                  <Button
                    name="Edit Profile"
                    style="button buttonType2"
                    onClick={() => setIsEditing(true)}
                  />
                ) : (
                  <UpdateProfileForm
                    profile={profile}
                    setIsEditing={setIsEditing}
                    setMessage={setMessage}
                  />
                )}
              </>
            ) : (
              <p>No profile data found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
