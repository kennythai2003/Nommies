const mongoose = require("mongoose")
const User = require("../models/User.js")
const bcrypt = require("bcryptjs")
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client(
	"679532241648-krbdoaos47u3u8t0go37b3865mn7q2k9.apps.googleusercontent.com"
)

async function signUp(req, res) {
	const { email, password, firstname, lastname } = req.body

	try {
		let user = await User.findOne({ email })
		if (user) {
			return res.status(400).json({ message: "Email already exists" })
		}

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		user = new User({
			email,
			password: hashedPassword,
			firstname,
			lastname,
		})

		await user.save()

        // Function for following: logInSuccessfull() and signUpSuccessfull()
        // Functionality needed: update profile on navBar, prompt for PFP; redirect to profile page?

		res.status(201).json({ message: "User registered successfully!" })
	} catch (error) {
		res.status(500).json({ message: "Error registering user" })
	}
}

async function logIn(req, res) {
	const { email, password } = req.body

	try {
		const user = await User.findOne({ email })
		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid email or password" })
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: "Invalid email or password" })
		}

		// Function for following: logInSuccessfull() and signUpSuccessfull()
		// Functionality needed: update profile on navBar, prompt for PFP; redirect to profile page?

		res.status(200).json({ message: "Log in successful!" })
	} catch (error) {
		res.status(500).json({ message: "Error logging in" })
	}
}

async function googleLogin(req, res) {
	const { token } = req.body

	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience:
				"679532241648-krbdoaos47u3u8t0go37b3865mn7q2k9.apps.googleusercontent.com",
		})
		const payload = ticket.getPayload()
		const email = payload.email

		let user = await User.findOne({ email })
		if (user) {
			return res
				.status(200)
				.json({ message: "User logged in successfully!" })
		} else {
			return res.status(400).json({ message: "Email not recognized" })
		}
	} catch (error) {
		res.status(500).json({ message: "Error logging in with Google" })
	}
}

module.exports = {
	signUp,
	logIn,
	googleLogin,
}
