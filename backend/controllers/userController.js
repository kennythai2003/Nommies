const User = require("../dataModels/User")

const checkEmailExists = async (req, res) => {
	try {
		const { email } = req.query
		const user = await User.findOne({ email })
		if (user) {
			return res.status(200).json({ exists: true })
		} else {
			return res.status(200).json({ exists: false })
		}
	} catch (error) {
		return res.status(500).json({ message: "Server error" })
	}
}

module.exports = { checkEmailExists }
