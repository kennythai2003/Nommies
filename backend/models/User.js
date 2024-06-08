// const mongoose = require("mongoose")

// const UserSchema = new mongoose.Schema({
// 	email: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 	},
// 	firstName: {
// 		type: String,
// 		require: true,
// 		unique: false,
// 	},
//     lastName: {
//         type: String,
// 		require: true,
// 		unique: false,
//     },
// 	password: {
// 		type: String,
// 		require: true,
// 		unique: false,
// 	},
// })

// module.exports = mongoose.model("User", UserSchema, "users")

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
			return !this.googleId // Password is required if not a Google user
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
