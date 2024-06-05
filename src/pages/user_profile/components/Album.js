// Album.js
import React from "react";
import AlbumCarousel from "./AlbumCarousel";
import Slide from "./Slide";
import "../styles/album.css";

const Album = () => {
  const slides1 = [
    { src: "explore.gif", alt: "Slide 1" },
    { src: "steak.gif", alt: "Slide 2" },
    { src: "hotpot.gif", alt: "Slide 3" },
    { src: "coffee.gif", alt: "Slide 4" },
  ];

  const slides2 = [
    { src: "coffee.gif", alt: "Slide 1" },
    { src: "cake.gif", alt: "Slide 2" },
    { src: "pancakes.gif", alt: "Slide 3" },
  ];

  const slides3 = [
    { src: "steak.gif", alt: "Slide 1" },
    { src: "explore.gif", alt: "Slide 2" },
    { src: "hotpot.gif", alt: "Slide 3" },
  ];
  const slides4 = [
    { src: "steak.gif", alt: "Slide 1" },
    { src: "explore.gif", alt: "Slide 2" },
    { src: "hotpot.gif", alt: "Slide 3" },
  ];

  return (
    <section className="albums user-profile-albums">
      <AlbumCarousel albumName="favorites" slides={slides1} />
      <AlbumCarousel albumName="matcha" slides={slides2} />
      <AlbumCarousel albumName="late night eats" slides={slides3} />
      <AlbumCarousel albumName="testtest" slides={slides4} />
    </section>
  );
};

export default Album;
