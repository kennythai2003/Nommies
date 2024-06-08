// Comments.js
import React from "react";
import "../styles/comments.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import CustomerReview from "./CustomerReview";
import { useState, useEffect } from "react";

const Comments = () => {
  const [commentsData, setCommentsData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:8080/getReviews');
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      const formattedData = data.map((review) => ({
        ...review,
        dateOfVisit: new Date(review.dateOfVisit).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      }));
      setCommentsData(formattedData);
      calculateAverageRating(formattedData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      setAverageRating(0);
      return;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRating / reviews.length;
    setAverageRating(average);
  };
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const starsArray = Array.from({ length: 5 }, (_, index) => 
      index < fullStars ? '★' : '☆'
    );
    return starsArray.join('');
  };

  return (
    <section className="section__container client__container" id="client">
      <p className="client__text">
        <span className="swipe-text">←hold & swipe→</span> <br></br>{" "}
        <span className="make-grey">to see what our customers are saying</span>
        <br></br> <br></br>
        <span className="rating-text">✧ restaurant average rating ✧</span>{" "}
        <br></br> <span className="make-grey">{renderStars(averageRating)}</span>
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
                name={comment.userName}
                visitDate={comment.dateOfVisit}
                rating={comment.rating}
                reviewText={comment.reviewText}
                imgSrc={"coffee.gif"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};


export default Comments;
