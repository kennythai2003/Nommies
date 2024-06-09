const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const connectDB = require("./database")
const { signUp, logIn, googleLogin } = require("./handlers/users")
const bodyParser = require('body-parser')

connectDB()

const reviewsHandler = require('./handlers/review');
const restaurantHandler = require('./handlers/restaurant'); 
const imageHandler = require('./handlers/images');
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

const cors = require("cors")
app.use(cors())

app.post("/signUp", signUp)
app.post("/logIn", logIn)
app.post("/googleLogin", googleLogin)

app.get('/getReviews', reviewsHandler.getReviews);
app.post('/writeReview', reviewsHandler.writeReview);
app.get('/getRestaurants', restaurantHandler.getRestaurants);
app.get('/getImages', imageHandler.getImages);
app.post('/uploadImage', imageHandler.uploadImage);

const port = 8080;
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

