const mongoose = require("mongoose")
const User = require("../dataModels/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client(
	"679532241648-krbdoaos47u3u8t0go37b3865mn7q2k9.apps.googleusercontent.com"
)

async function signUp(req, res) {
	try {
		const { email, password, firstname, lastname } = req.body
		let userCheck = await User.findOne({ email })
		if (userCheck) {
			return res.status(400).json({ message: "Email already exists" })
		}

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		let user = new User({
			email,
			password: hashedPassword,
			firstname,
			lastname,
		})

		const savedUser = await user.save()

		const token = jwt.sign(
			{
				user: savedUser._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		)

		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
		})
			.status(201)
			.json({ message: "User registered successfully!" })
	} catch (error) {
		res.status(500).json({ message: "Error registering user" })
	}
}

async function logIn(req, res) {
	try {
		const { email, password } = req.body
		const existingUser = await User.findOne({ email })
		if (!existingUser) {
			return res
				.status(401)
				.json({ message: "Invalid email or password" })
		}

		const isMatch = await bcrypt.compare(password, existingUser.password)
		if (!isMatch) {
			return res
				.status(401)
				.json({ message: "Invalid email or password" })
		}

		const token = jwt.sign(
			{
				user: existingUser._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		)

		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
		})
			.status(200)
			.json({ message: "Log in successful!" })
	} catch (error) {
		res.status(500).json({ message: "Error logging in" })
	}
}

async function loggedIn(req, res) {
	try {
		const token = req.cookies.token
		if (!token) return res.json(false)

		jwt.verify(token, process.env.JWT_SECRET)

		res.send(true)
	} catch (err) {
		res.json(false)
	}
}

async function logOut(req, res) {
	try {
		res.cookie("token", "", {
			httpOnly: true,
			expires: new Date(0),
			secure: true,
			sameSite: "none",
		})
			.status(200)
			.json({ message: "Log out successful!" })
	} catch (error) {
		res.status(500).json({ message: "Log out failed." })
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
		if (!user) {
			user = new User({
				email,
				firstname: payload.given_name,
				lastname: payload.family_name,
				googleId: payload.sub,
			})
			user = await user.save()
		}

		const jwtToken = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		})

		res.cookie("token", jwtToken, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		})
			.status(200)
			.json({ message: "User logged in successfully!" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Error logging in with Google" })
	}
}

module.exports = {
	signUp,
	logIn,
	logOut,
	loggedIn,
	googleLogin,
}
