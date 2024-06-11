import React, { useEffect, useState } from "react"
import axios from "axios"
import "../styles/UserCarousel.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"

import { Carousel } from "react-responsive-carousel"

const UserCarousel = () => {
	const [users, setUsers] = useState([])
	const [userId, setUserId] = useState(null)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/auth/users"
				)
				setUsers(response.data)
			} catch (error) {
				console.error("Error fetching users:", error)
			}
		}

		const loggedInUserId = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/auth/profile",
					{
						withCredentials: true,
					}
				)
				setUserId(response.data._id)
				console.log(response.data._id)
			} catch (error) {
				console.error("Error fetching profile data", error)
			}
		}

		fetchUsers()
		loggedInUserId()
	}, [])

	// const followUser = async (followedUserId) => {
	// 	try {
	// 		const response = await axios.post(
	// 			`http://localhost:8080/auth/users/${followedUserId}/follow`,
	// 			{ followingId: userId }
	// 		)
	// 		console.log("Followed user successfully:", response.data)
	// 	} catch (error) {rs
	// 		console.error("Error following user:", error)
	// 	}
	// }

    const followUser = async (followedUserId) => {
		try {
			const response = await axios.post(
				`http://localhost:8080/auth/users/${followedUserId}/follow`,
				{ followingId: userId } // Pass the userId in the request body
			)
			console.log("Followed user successfully:", response.data)
			// Optionally update the local state to reflect the follow
		} catch (error) {
			console.error(
				"Error following user:",
				error.response?.data || error.message
			)
		}
	}



	return (
		<div className="carousel-container">
			<Carousel autoPlay>
				{users.map((user) => (
					<div key={user._id} className="user-card">
						<div className="info-container">
							{/* <img
								src={user.profileImage}
								alt={`${user.firstname} ${user.lastname}`}
								className="profile-image"
							/> */}
							<h3>{`${user.firstname} ${user.lastname}`}</h3>
							<p>{user.quote}</p>
							<p>
								{user.followers.length} follower
								{user.followers.length === 1 ? "" : "s"}
							</p>
							{userId && (
								<div
									className="follow-button"
									onClick={() => followUser(user._id)}
								>
									Follow
								</div>
							)}
						</div>
					</div>
				))}
			</Carousel>
		</div>
	)
}

export default UserCarousel
