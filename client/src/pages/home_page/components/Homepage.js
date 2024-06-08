import React from "react";
import "../styles/homepage.css";
import ReviewItem from "./ReviewItem";

const reviews = [
  {
    name: "Mokoji Shabu Shabu",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    image: "hotpot.gif",
  },
  {
    name: "Aquarela Coffee - DTLA",
    stars: "⭐️⭐️⭐️⭐️",
    image: "coffee.gif",
  },
  {
    name: "Seaside Bakery",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    image: "cake.gif",
  },
];

function Homepage() {
  return (
    <div className="homepage">
      <div className="feedbox">
        <div className="your-feed-container">
          <h2>your feed</h2>
          <ul>
            <li>🤵 dilan g. liked _____</li>
            <li>🍣 try _____ near you!</li>
            <li>🧑‍🦱 lauren t. has recently trie...</li>
            <li>🙋‍♂️ davis k. sent you a message...</li>
            <li>🙋‍♂️ kenny t. wrote a review...</li>
            <li>...</li>
            <li>👨‍👩‍👧 your mother!</li>
          </ul>
        </div>
      </div>
      <div className="reviewbox">
        <div className="reviews-container">
          <h2>review recent places</h2>
          {reviews.map((review, index) => (
            <ReviewItem
              key={index}
              name={review.name}
              stars={review.stars}
              image={review.image}
            />
          ))}
          <div className="new-review">
            <p>+new</p>
          </div>
        </div>
      </div>
      <div className="explorebox">
        <h2 className="nommiestag">explore nommies</h2>
        <div className="explore-container">
          {/* <h2 className="nommiestag">explore nommies</h2> */}
          <div className="explore-item">
            <img src="explore.gif" alt="Trending" />
            <p>‼️ trending</p>
          </div>
          <div className="explore-item">
            <img src="cake.gif" alt="Near You" />
            <p>📌 near you</p>
          </div>
          <div class="explore-item">
            <img src="hotpot.gif" alt="Top Rated" />
            <p>💯 top rated</p>
          </div>
          <div className="explore-item">
            <img src="steak.gif" alt="Dinner" />
            <p>🍽️ dinner</p>
          </div>
          <div className="explore-item">
            <img src="coffee.gif" alt="Drinks" />
            <p>🥤 drinks</p>
          </div>
          <div className="explore-item">
            <img src="cake.gif" alt="Desserts" />
            <p>🍰 desserts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
