import React, { useState, useEffect } from "react"
import axios from "axios"
import UserListModal from "./components/UserListModal"
import ViewUserProfile from "./components/ViewUserProfile"
import Navigation from "../common_components/Navigation"
import "./styles/Social.css"

const SocialPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(true)
	const [users, setUsers] = useState([])
	const [selectedUserId, setSelectedUserId] = useState("")

	const fetchUsers = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8080/auth/users",
				{ withCredentials: true }
			)
			setUsers(response.data)
			console.log(response.data)
		} catch (error) {
			console.error("Error fetching users:", error)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [selectedUserId])

	// useEffect(() => {
	// 	if (selectedUserId) {
	// 		console.log("Selected User ID:", selectedUserId)
	// 	}
	// }, [selectedUserId])

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	const handleSelectUser = (userId) => {
		setSelectedUserId(userId)
		console.log("User ID selected:", userId)
		setIsModalOpen(false)
	}

	return (
		<>
			<Navigation />
			<div className="social-page">
				{isModalOpen && (
					<UserListModal
						open={isModalOpen}
						users={users}
						onClose={handleCloseModal}
						onSelectUser={handleSelectUser}
					/>
				)}
				{selectedUserId && <ViewUserProfile userToViewId={selectedUserId} />}
			</div>
		</>
	)
}

export default SocialPage
