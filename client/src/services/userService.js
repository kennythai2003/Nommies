import axios from "axios"

export const checkEmailExists = async (email) => {
	try {
		const response = await axios.get(`/api/users/check-email`, {
			params: { email },
		})
		return response.data.exists
	} catch (error) {
		console.error("There was an error checking the email!", error)
		return false
	}
}
