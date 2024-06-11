import React, { useEffect, useState } from "react"
import Profile from "../../user_profile/components/Profile"
import axios from "axios"

const ViewUserProfile = ({ userToViewId }) => {
	const [userToViewData, setUserToViewData] = useState(null)

	useEffect(() => {
		const fetchViewedUserData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/auth/profile/${userToViewId}`,
					{
						withCredentials: true,
					}
				)
				setUserToViewData(response.data)
			} catch (error) {
				console.error("Error fetching user profile:", error)
			}
		}

		if (userToViewId) {
			fetchViewedUserData()
		}
	}, [userToViewId])

	if (!userToViewData) {
		return <div>Loading...</div>
	}

	console.log("VUP", userToViewData)

	return (
		<Profile
			viewedUserId={userToViewData._id}
			viewedUserData={userToViewData}
		/>
	)
}

export default ViewUserProfile
