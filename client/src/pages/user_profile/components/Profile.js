import React, { useState, useEffect } from "react"
import Banner from "./Banner"
import ProfileImage from "./ProfileImage"
import Name from "./Name"
import Quote from "./Quote"
import EditProfileModal from "./EditProfileModal"
import "../styles/profile.css"
import LogOutBtn from "./LogOutButton"
import axios from "axios"

const Profile = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [userData, setUserData] = useState({
		firstname: "",
		lastname: "",
		profileImage: "",
		bannerImage: "",
		quote: "",
		followers: "0",
	})

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/auth/profile",
					{
						withCredentials: true,
					}
				)
				setUserData(response.data)
			} catch (error) {
				console.error("Error fetching profile data", error)
			}
		}

		fetchProfile()
	}, [])

	const handleOpenModal = () => setIsModalOpen(true)
	const handleCloseModal = () => setIsModalOpen(false)

	const handleSaveChanges = async (formData) => {
		try {
			const response = await axios.put(
				"http://localhost:8080/auth/profile",
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
					withCredentials: true,
				}
			)
			setUserData(response.data)
			handleCloseModal()
		} catch (error) {
			console.error("Error updating profile", error)
		}
	}

	return (
		<div className="profile-container">
			<Banner
				src={
					userData.bannerImage ||
					"https://www.notion.so/image/https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fae%2F52%2Fd9%2Fae52d968e7d8117170d2eeff6245ca5c.gif"
				}
			>
				<ProfileImage src={userData.profileImage || "explore.gif"} />
			</Banner>
			<div className="profile-info">
				<div className="name-and-friends">
					<Name name={`${userData.firstname} ${userData.lastname}`} />
					<h3 className="friends-count">{`${
						userData.followers.length
					} ${
						userData.followers.length === 1
							? "follower"
							: "followers"
					}`}</h3>
				</div>
				<div className="editing-buttons">
					<LogOutBtn />
					<button
						className="edit-profile-button"
						onClick={handleOpenModal}
					>
						Edit Profile
					</button>
					<button className="edit-profile-button">
						Add an Album
					</button>
				</div>
			</div>
			<Quote
				text={
					userData.quote ||
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				}
			/>
			<EditProfileModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onSave={handleSaveChanges}
				initialData={userData}
			/>
		</div>
	)
}

export default Profile
