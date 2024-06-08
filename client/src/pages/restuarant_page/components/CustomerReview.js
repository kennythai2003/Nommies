// CustomerReview.js
import React from "react";
import "../styles/customerReview.css";

const CustomerReview = ({ name, visitDate, rating, reviewText, imgSrc }) => {
  return (
    <div className="client__card">
      <p className="review-text">{reviewText}</p>
      <div className="review-flexbox">
        <img className="review-pfp" src={imgSrc} alt="client" />
        <div className="reviewandvisitbox">
          <p className="review-by-text">review by: {name}</p>
          <p className="visit-date-text">visit date: {visitDate}</p>
          <p className="visit-date-text">rating: {rating}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
