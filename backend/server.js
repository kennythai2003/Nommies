const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const connectDB = require("./database")
const { signUp, logIn, googleLogin } = require("./handlers/users")

connectDB()

const reviewsHandler = require('./handlers/review');
app.use(express.json({ extended: false }))

const cors = require("cors")
app.use(cors())

app.post("/signUp", signUp)
app.post("/logIn", logIn)
app.post("/googleLogin", googleLogin)

app.get('/getReviews', reviewsHandler.getReviews);
app.post('/writeReview', reviewsHandler.writeReview);

const port = process.env.PORT || 8081
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})