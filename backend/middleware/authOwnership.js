const User = require("../dataModels/User")

async function checkOwnership(req, res, next) {
	try {
		const userId = req.user 

		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ errorMessage: "User not found" })
		}

		if (user._id.toString() !== userId) {
			return res.status(403).json({
				errorMessage:
					"Forbidden: You do not have permission to edit this resource",
			})
		}

		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({ errorMessage: "Internal Server Error" })
	}
}

module.exports = checkOwnership
