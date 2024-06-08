import React, { useState } from "react";
import "../styles/album.css";

const CarouselSlide = ({ src, alt }) => (
  <img src={src} alt={alt} className="carousel-slide" />
);

const AlbumCarousel = ({ albumName, images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="album">
      <p className="albumname">
        <strong>{albumName}</strong>
      </p>
      <div className="carousel">
        <div
          className="carousel-container"
          style={{
            transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`,
          }}
        >
          {images.map((image, index) => (
            <CarouselSlide
              key={index}
              src={image.src}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <button className="left" onClick={previousSlide}>
          &#9664;
        </button>
        <button className="right" onClick={nextSlide}>
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default AlbumCarousel;
