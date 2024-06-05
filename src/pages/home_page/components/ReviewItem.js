import React from "react";
import "../styles/reviewItem.css";

function ReviewItem({ name, stars, image }) {
  return (
    <div className="review-item">
      <img src={image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>Do you recommend this business?</p>
        <div className="stars">{stars}</div>
      </div>
    </div>
  );
}

export default ReviewItem;
