import React from "react";
import AlbumCarousel from "./AlbumCarousel";
import "../styles/album.css";

const Album = () => {
  const foodImages = [
    { src: "explore.gif" },
    { src: "cake.gif" },
    { src: "hotpot.gif" },
    //add more here dynamically
  ];

  const menuImages = [
    { src: "steak.gif" },
    { src: "coffee.gif" },
    { src: "hotpot.gif" },
  ];

  const insideOutsideImages = [{ src: "cake.gif" }, { src: "steak.gif" }];

  return (
    <section className="albums">
      <AlbumCarousel albumName="food" images={foodImages} />
      <AlbumCarousel albumName="menu" images={menuImages} />
      <AlbumCarousel albumName="inside/outside" images={insideOutsideImages} />
    </section>
  );
};

export default Album;
