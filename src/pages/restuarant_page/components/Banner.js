// Banner.js
import React from "react";

const Banner = ({ imageSrc, restaurantName, children }) => {
  return (
    <div className="banner">
      <img className="banner-image" src={imageSrc} alt="Banner Image" />
      <div className="profile">
        <p className="restaurant_name">{restaurantName}</p>
        <div className="editing-buttons">{children}</div>
      </div>
    </div>
  );
};

export default Banner;
