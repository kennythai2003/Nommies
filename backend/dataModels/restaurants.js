const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = mongoose.model("Restaurant", restaurantSchema, "restaurants");