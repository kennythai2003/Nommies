const mongoose = require("mongoose");
const Restaurant = require("../dataModels/restaurants");

async function getRestaurants(req, res) {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    }
    catch {
        res.json({message: "Error getting restaurants"});
    }
}

module.exports = {
    getRestaurants
};