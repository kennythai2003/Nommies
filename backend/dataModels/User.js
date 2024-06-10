const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: false,
	},
	lastname: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: function () {
			return !this.googleId
		},
	},
	googleId: {
		type: String,
		unique: true,
		sparse: true,
	},
	picture: {
		type: String,
		required: false,
	},
})

module.exports = mongoose.model("User", UserSchema)
