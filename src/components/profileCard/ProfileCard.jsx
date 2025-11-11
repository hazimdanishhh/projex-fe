// components/ProfileCard.jsx

import "./ProfileCard.scss";

export default function ProfileCard({ profile }) {
  if (!profile) return null;

  return (
    <div className="profileCard">
      <div className="profilePhoto">
        <img
          src={
            profile?.avatarUrl
              ? `/${profile?.avatarUrl}`
              : `/profilePhoto/default.webp`
          }
          alt={profile?.name}
        />
      </div>

      <div className="profileSection">
        <h2 className="textRegular textS">Personalization</h2>

        <div className="profileDetails">
          <p className="profileLabel textRegular textXXS">
            <strong>Name: </strong>
            {profile?.name}
          </p>
          <p className="profileLabel textRegular textXXS">
            <strong>Username: </strong>
            {profile?.username ? profile?.username : "No username"}
          </p>
          <p className="profileLabel textRegular textXXS">
            <strong>Email: </strong> {profile?.email}
          </p>
        </div>
      </div>

      <hr />

      <div className="profileSection">
        <h2 className="textRegular textS">Security</h2>

        <div className="profileDetails">
          <p className="profileLabel textRegular textXXS">
            <strong>Password: </strong>
            ******
          </p>
        </div>
      </div>

      <hr />

      <div className="profileSection">
        <h2 className="textRegular textS">System Settings</h2>

        <div className="profileDetails">
          <p className="profileLabel textRegular textXXS">
            <strong>Role: </strong>
            {profile?.role}
          </p>
          <p className="profileLabel textRegular textXXS">
            <strong>User ID: </strong>
            {profile?.id}
          </p>
        </div>
      </div>

      <hr />
    </div>
  );
}

// Loading Card UI
export function ProfileCardLoading() {
  return (
    <div className="profileCard">
      <div className="profilePhoto" />

      <div className="profileSection">
        <h2 className="textRegular textS">Personalization</h2>

        <div className="profileDetails">
          <p className="profileLabel textRegular textXXS">
            <strong>Name: </strong>
          </p>
          <p className="profileLabel textRegular textXXS">
            <strong>Username: </strong>
          </p>
          <p className="profileLabel textRegular textXXS">
            <strong>Email: </strong>
          </p>
        </div>
      </div>

      <hr />

      <div className="profileSection">
        <h2 className="textRegular textS">Security</h2>

        <div className="profileDetails">
          <p className="profileLabel textRegular textXXS">
            <strong>Password: </strong>
          </p>
        </div>
      </div>

      <hr />

      <div className="profileSection">
        <h2 className="textRegular textS">System Settings</h2>

        <div className="profileDetails">
          <p className="profileLabel textRegular textXXS">
            <strong>Role: </strong>
          </p>
          <p className="profileLabel textRegular textXXS">
            <strong>User ID: </strong>
          </p>
        </div>
      </div>

      <hr />
    </div>
  );
}
