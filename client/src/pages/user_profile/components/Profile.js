// Profile.js
import React from "react";
import Banner from "./Banner";
import ProfileImage from "./ProfileImage";
import Name from "./Name";
import Quote from "./Quote";
import "../styles/profile.css";
import LogOutBtn from "./LogOutButton";

function Profile() {
  return (
    <div className="profile-container">
      <Banner src="https://www.notion.so/image/https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fae%2F52%2Fd9%2Fae52d968e7d8117170d2eeff6245ca5c.gif">
        <ProfileImage src="explore.gif" />
      </Banner>
      <div className="profile-info">
        <div className="name-and-friends">
          <Name name="kenny thai" />
          <h3 className="friends-count">789 followers</h3>
        </div>
        <div className="editing-buttons">
          <LogOutBtn></LogOutBtn>
          <button className="edit-profile-button">edit profile</button>
          <button className="edit-profile-button">add an album</button>
        </div>
      </div>
      <Quote text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
    </div>
  );
}

export default Profile;
