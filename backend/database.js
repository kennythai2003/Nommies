require("dotenv").config()
const mongoose = require("mongoose")

const uri = process.env.MONGODB_URI

const connectDB = async () => {
	try {
		await mongoose.connect(uri, {})
		await mongoose.connection.db.admin().command({ ping: 1 })
		console.log("MongoDB connected")
	} catch (error) {
		console.log("MongoDB connection failed")
		console.log(error)
	}
}
module.exports = connectDB
