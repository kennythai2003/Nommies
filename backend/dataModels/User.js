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
		default: null,
	},
	profileImage: {
		type: String,
		default: "",
	},
	bannerImage: {
		type: String,
		default: "",
	},
	quote: {
		type: String,
		default: "",
	},
	followers: {
		type: [mongoose.Schema.Types.ObjectId], 
		default: [],
	},
})

module.exports = mongoose.model("User", UserSchema)
