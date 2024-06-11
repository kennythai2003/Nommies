const mongoose = require("mongoose")
const User = require("../dataModels/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const sharp = require("sharp")
const fs = require("fs")

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

const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"]

const fileFilter = (req, file, cb) => {
	if (allowedFileTypes.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb(
			new Error(
				"Invalid file type. Only JPEG, PNG, and GIF file types are allowed."
			),
			false
		)
	}
}

const sanitizeFilename = (filename) => {
	return filename.replace(/[^a-zA-Z0-9.-]/g, "_")
}

const ensureUploadsDirectory = () => {
	const dir = "uploads"
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true })
	}
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		ensureUploadsDirectory()
		cb(null, "uploads/")
	},
	filename: function (req, file, cb) {
		const sanitizedFilename = sanitizeFilename(file.originalname)
		cb(null, Date.now() + path.extname(sanitizedFilename))
	},
})

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 },
})

async function getSelfProfile(req, res) {
	try {
		const user = await User.findById(req.user).select("-password")

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}
		res.json(user)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Error fetching user profile" })
	}
}

async function getUserProfile(req, res) {
	try {
		const users = await User.find(
			{},
			"firstname lastname followers quote profileImage"
		)
		res.json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

async function updateProfile(req, res) {
	try {
		const userId = req.user
		const { firstname, lastname, quote } = req.body

		const updatedFields = {
			firstname,
			lastname,
			quote,
		}

		if (req.files) {
			if (req.files.profileImage) {
				updatedFields.profileImage = `/uploads/${req.files.profileImage[0].filename}`
				await sharp(req.files.profileImage[0].path)
					.resize(200, 200)
					.toFormat("jpeg")
					.jpeg({ quality: 80 })
					.toFile(profileImagePath)

				fs.unlinkSync(req.files.profileImage[0].path)
				updatedFields.profileImage = `/${profileImagePath}`
			}
			if (req.files.bannerImage) {
				updatedFields.bannerImage = `/uploads/${req.files.bannerImage[0].filename}`
				await sharp(req.files.bannerImage[0].path)
					.resize(1000, 300)
					.toFormat("jpeg")
					.jpeg({ quality: 80 })
					.toFile(bannerImagePath)

				fs.unlinkSync(req.files.bannerImage[0].path)
				updatedFields.bannerImage = `/${bannerImagePath}`
			}
		}

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			updatedFields,
			{ new: true }
		)
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" })
		}

		res.json(updatedUser)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Error updating user profile" })
	}
}

async function getUsers(req, res) {
	try {
		const userId = req.user
		const users = await User.find(
			{ _id: { $ne: userId } },
			"firstname lastname followers quote profileImage"
		)

		res.json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const followUser = async (req, res) => {
	const { followedId } = req.params
	const { followingId } = req.body

	try {
		const user = await User.findById(followedId)
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}
		if (!Array.isArray(user.followers)) {
			user.followers = []
		}

		if (user.followers.includes(followingId)) {
			return res.status(400).json({ message: "Already following" })
		}
		user.followers.push(followingId)
		await user.save()
		res.status(200).json({ message: "Followed successfully" })
	} catch (error) {
		console.error("Error following user:", error)
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	signUp,
	logIn,
	logOut,
	loggedIn,
	googleLogin,
	getSelfProfile,
	getUserProfile,
	updateProfile,
	upload,
	getUsers,
	followUser,
}
