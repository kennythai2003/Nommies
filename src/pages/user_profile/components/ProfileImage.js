// ProfileImage.js
import React from "react";
import "../styles/profileImage.css";

function ProfileImage({ src }) {
  return (
    <div className="profile">
      <img className="profile-image" src={src} alt="Profile Image" />
    </div>
  );
}

export default ProfileImage;
