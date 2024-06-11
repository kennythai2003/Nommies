const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const connectDB = require("./database")
const cookieparser = require("cookie-parser")
const authOwnership = require("./middleware/authOwnership")
const auth = require("./middleware/auth")
const multer = require("multer")

const {
	signUp,
	logIn,
	logOut,
	googleLogin,
	loggedIn,
	getSelfProfile,
	getUserProfile,
	updateProfile,
	getUsers,
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

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/")
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	},
})

const upload = multer({ storage: storage })

const authRouter = express.Router()

app.use("/auth", authRouter)
authRouter.post("/signUp", signUp)
authRouter.post("/logIn", logIn)
authRouter.post("/googleLogin", googleLogin)
authRouter.post("/logOut", logOut)
authRouter.get("/loggedIn", loggedIn)
authRouter.get("/users", getUsers)

authRouter.get("/profile", auth, authOwnership, getSelfProfile)
authRouter.put(
	"/profile",
	auth,
	authOwnership,
	upload.fields([{ name: "profileImage" }, { name: "bannerImage" }]),
	updateProfile
)

app.get('/getReviews', reviewsHandler.getReviews);
app.post('/writeReview', reviewsHandler.writeReview);
app.get('/getRestaurants', restaurantHandler.getRestaurants);
app.get('/getImages', imageHandler.getImages);
app.post('/uploadImage', imageHandler.uploadImage);
authRouter.get("/profile/:userId", auth, authOwnership, getUserProfile)

const port = 8080
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
