// import "./user.css"
import Profile from "./components/Profile"
import Navigation from "../common_components/Navigation"
import Album from "./components/Album"
import React from "react"

function App() {
	return (
		<body>
			<Navigation></Navigation>
			<Profile></Profile>
			<Album></Album>
		</body>
	)
}

export default App
