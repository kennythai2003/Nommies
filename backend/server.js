const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const connectDB = require("./database")
const cookieparser = require("cookie-parser")
const {
	signUp,
	logIn,
	logOut,
	googleLogin,
	loggedIn,
} = require("./handlers/users")

connectDB()

const reviewsHandler = require("./handlers/review")
const restaurantHandler = require("./handlers/restaurant")

app.use(cookieparser())
app.use(express.json({ extended: false }))

const cors = require("cors")
app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	})
)

// app.post("/signUp", signUp)
// app.post("/logIn", logIn)
// app.post("/googleLogin", googleLogin)
// app.post("/logOut", logOut)

const authRouter = express.Router()
authRouter.post("/signUp", signUp)
authRouter.post("/logIn", logIn)
authRouter.post("/googleLogin", googleLogin)
authRouter.get("/logOut", logOut)
authRouter.get("/loggedIn", loggedIn)
app.use("/auth", authRouter)

app.get("/getReviews", reviewsHandler.getReviews)
app.post("/writeReview", reviewsHandler.writeReview)
app.get("/getRestaurants", restaurantHandler.getRestaurants)

const port = 8080
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
