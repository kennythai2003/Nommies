const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//Importing models
const connectDB = require('./database');

//Connecting to database
connectDB();

//importing handlers
const reviewsHandler = require('./handlers/review');

app.use(express.json({extended: false})); //body parser

const cors = require('cors'); //Cross-Origin Resource Sharing. Pretty much allows us to make requests to our server from our client-side code
app.use(cors());


//endpoints
app.get('/getReviews', reviewsHandler.getReviews);
app.post('/writeReview', reviewsHandler.writeReview);


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})