// Slide.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/slide.css";

const Slide = ({ src, alt }) => {
  return (
    <Link to="/restaurant" className="slide">
      <img src={src} alt={alt} />
    </Link>
  );
};

export default Slide;
