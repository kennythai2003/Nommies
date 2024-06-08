const express = require("express")
const { checkEmailExists } = require("../controllers/userController")
const router = express.Router()

router.get("/check-email", checkEmailExists)

module.exports = router
