import React, { useEffect, useState } from "react"
import Profile from "./Profile"
import axios from "axios"

const ViewMyProfile = () => {
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/auth/profile`,
					{
						withCredentials: true,
					}
				)
				setUserData(response.data)
			} catch (error) {
				console.error("Error fetching user profile:", error)
			}
		}

		fetchUserData()
	}, [])

	if (!userData) {
		return <div>Loading...</div>
	}

	return (
		<Profile
			userId={userData._id}
			userData={userData}
			setUserData={setUserData}
		/>
	)
}

export default ViewMyProfile