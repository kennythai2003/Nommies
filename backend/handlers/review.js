const mongoose = require("mongoose");
const Review = require("../dataModels/reviews");

async function getReviews(req, res) {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    }
    catch {
        res.json({message: "Error getting reviews"});
    }
}

async function writeReview(req, res) {
    try {
        const review = new Review({
            userName: req.body.userName,
            dateOfVisit: req.body.dateOfVisit,
            rating: req.body.rating,
            reviewText: req.body.reviewText,
        });
        await review.save();
        res.json({message: "Review saved!"});
    }
    catch {
        res.json({message: "Error saving review"});
    }
}

module.exports = { 
    getReviews, 
    writeReview 
};
