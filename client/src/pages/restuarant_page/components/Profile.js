// Profile.js
import React from "react";
import "../styles/profile.css";
import Banner from "./Banner";

const Profile = () => {
  return (
    <div className="profile-container">
      <Banner imageSrc="wingstop.jpeg" restaurantName="wingstop">
        <button className="edit-profile-button">add a review</button>
        <button className="edit-profile-button">add a photo</button>
        <button className="edit-profile-button">share</button>
      </Banner>
    </div>
  );
};

export default Profile;
