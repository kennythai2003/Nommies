const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const connectDB = require("./database")
const { signUp, logIn, googleLogin } = require("./handlers/users")

connectDB()

app.use(express.json({ extended: false }))

const cors = require("cors")
app.use(cors())

app.post("/signUp", signUp)
app.post("/logIn", logIn)
app.post("/googleLogin", googleLogin)

const port = process.env.PORT || 5002
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
