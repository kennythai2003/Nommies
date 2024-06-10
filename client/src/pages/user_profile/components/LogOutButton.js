import axios from "axios"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../../context/AuthContext"
import "../styles/profile.css"

function LogOutBtn() {
	const { getLoggedIn } = useContext(AuthContext)
	const navigate = useNavigate()

	async function logOut() {
		try {
			await axios.get("http://localhost:8080/auth/logOut")
			await getLoggedIn()
			navigate("/")
		} catch (err) {
			console.error(err)
			alert("Error logging out.")
		}
	}

	return (
		<div className="edit-profile-button" onClick={logOut}>
			log out
		</div>
	)
}

export default LogOutBtn
