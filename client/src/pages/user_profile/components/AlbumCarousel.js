// AlbumCarousel.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Slide from "./Slide";
import "../styles/albumCarousel.css";

const AlbumCarousel = ({ albumName, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="album user-profile-album">
      <p className="albumname">{albumName}</p>
      <div className="user-carousel">
        <div
          className="user-carousel-container"
          style={{
            transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`,
            width: `${totalSlides * 100}%`,
            "--total-slides": totalSlides,
          }}
        >
          {slides.map((slide, index) => (
            <Slide key={index} src={slide.src} alt={slide.alt} />
          ))}
        </div>
        <button className="left" onClick={previousSlide}>
          &#9664;
        </button>
        <button className="right" onClick={nextSlide}>
          &#9654;
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default AlbumCarousel;
