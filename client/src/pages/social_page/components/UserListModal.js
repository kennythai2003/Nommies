import React, { useState, useEffect } from "react"
import axios from "axios"
import { Modal, List, ListItem, ListItemText, Typography } from "@mui/material"
import "../styles/UserListModal.css"

const UserListModal = ({ open, onClose, onSelectUser }) => {
	const [users, setUsers] = useState([])

	const fetchUsers = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8080/auth/users",
				{ withCredentials: true }
			)
			setUsers(response.data)
		} catch (error) {
			console.error("Error fetching users:", error)
		}
	}

	useEffect(() => {
		if (open) {
			fetchUsers()
		}
	}, [open])

	return (
		<Modal open={open} onClose={onClose}>
			<div className="modal-content">
				<Typography variant="h6" className="modal-title">
					Select a User
				</Typography>
				<List className="user-list">
					{users.map((user) => (
						<ListItem
							key={user._id}
							onClick={() => onSelectUser(user._id)}
						>
							{user._id}
							<ListItemText
								primary={`${user.firstname} ${user.lastname}`}
							/>
						</ListItem>
					))}
				</List>
			</div>
		</Modal>
	)
}

export default UserListModal
