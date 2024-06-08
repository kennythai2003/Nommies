// Comments.js
import React from "react";
import "../styles/comments.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import CustomerReview from "./CustomerReview";

const commentsData = [
  {
    name: "kenny thai",
    visitDate: "01/01/2000",
    rating: "★★",
    reviewText: "the food at ______ was so good, and service was great",
    imgSrc: "coffee.gif",
  },
  {
    name: "davis kim",
    visitDate: "01/01/2000",
    rating: "★★★★★",
    reviewText: "cool beans",
    imgSrc: "explore.gif",
  },
  {
    name: "dilan guerrero",
    visitDate: "01/01/2000",
    rating: "★★★★★",
    reviewText: "swag.",
    imgSrc: "hotpot.gif",
  },
  {
    name: "lauren tomasi",
    visitDate: "01/01/2000",
    rating: "★★★★★",
    reviewText: "swag.",
    imgSrc: "cake.gif",
  },
];

const Comments = () => {
  return (
    <section className="section__container client__container" id="client">
      <p className="client__text">
        <span className="swipe-text">←hold & swipe→</span> <br></br>{" "}
        <span className="make-grey">to see what our customers are saying</span>
        <br></br> <br></br>
        <span className="rating-text">✧ restaurant average rating ✧</span>{" "}
        <br></br> <span className="make-grey">★★★★</span>
      </p>
      <div className="client__swiper">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {commentsData.map((comment, index) => (
            <SwiperSlide key={index}>
              <CustomerReview
                name={comment.name}
                visitDate={comment.visitDate}
                rating={comment.rating}
                reviewText={comment.reviewText}
                imgSrc={comment.imgSrc}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Comments;
