import React, {useState, useEffect} from "react";
import AlbumCarousel from "./AlbumCarousel";
import "../styles/album.css";

const Album = () => {
  const [foodImages, setFoodImages] = useState([]); 

  const menuImages = [
    { src: "steak.gif" },
    { src: "coffee.gif" },
    { src: "hotpot.gif" },
  ];

  const insideOutsideImages = [{ src: "cake.gif" }, { src: "steak.gif" }];

  useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await fetch("http://localhost:8080/getImages");
          const data = await response.json();
          const foodImageArray = data.map((image) => ({ src : image.myFile }));
          setFoodImages(foodImageArray);
        }
        catch (error) {
          console.error('Error fetching images', error);
        }
      };
      fetchImages();
  }, []);

  return (
    <section className="albums">
      <AlbumCarousel albumName="food" images={foodImages} />
      <AlbumCarousel albumName="menu" images={menuImages} />
      <AlbumCarousel albumName="inside/outside" images={insideOutsideImages} />
    </section>
  );
};

export default Album;
