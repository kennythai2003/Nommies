const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    dateOfVisit: {
        type: Date,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    reviewText: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Review", reviewSchema, "reviews");
