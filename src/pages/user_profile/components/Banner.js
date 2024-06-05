// Banner.js
import React from "react";
import "../styles/banner.css";

function Banner({ src, children }) {
  return (
    <div className="banner">
      <img className="banner-image" src={src} alt="Banner Image" />
      {children}
    </div>
  );
}

export default Banner;
