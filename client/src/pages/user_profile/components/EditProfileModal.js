import React, { useState, useEffect } from "react"
import "../styles/EditProfileModal.css"

const EditProfileModal = ({ isOpen, onClose, onSave, initialData }) => {
	const [firstname, setFirstname] = useState(initialData.firstname || "")
	const [lastname, setLastname] = useState(initialData.lastname || "")
	const [quote, setQuote] = useState(initialData.quote || "")
	const [profileImage, setProfileImage] = useState(null)
	const [bannerImage, setBannerImage] = useState(null)

	useEffect(() => {
		setFirstname(initialData.firstname || "")
		setLastname(initialData.lastname || "")
		setQuote(initialData.quote || "")
	}, [initialData])

	const handleFileChange = (e, setFile) => {
		setFile(e.target.files[0])
	}

	const handleSave = () => {
		const formData = new FormData()
		formData.append("firstname", firstname)
		formData.append("lastname", lastname)
		formData.append("quote", quote)
		if (profileImage) formData.append("profileImage", profileImage)
		if (bannerImage) formData.append("bannerImage", bannerImage)
		onSave(formData)
	}

	if (!isOpen) return null

	return (
		<div className="modal">
			<div className="modal-content">
				<span className="close" onClick={onClose}>
					&times;
				</span>
				<h2>Edit Profile</h2>
				<form>
					<div className="form-group">
						<label htmlFor="firstname">First Name</label>
						<input
							type="text"
							id="firstname"
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastname">Last Name</label>
						<input
							type="text"
							id="lastname"
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="quote">Quote</label>
						<textarea
							id="quote"
							value={quote}
							onChange={(e) => setQuote(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="profileImage">Profile Image</label>
						<input
							type="file"
							id="profileImage"
							onChange={(e) =>
								handleFileChange(e, setProfileImage)
							}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="bannerImage">Banner Image</label>
						<input
							type="file"
							id="bannerImage"
							onChange={(e) =>
								handleFileChange(e, setBannerImage)
							}
						/>
					</div>
					<div className="modal-actions">
						<button
							type="button"
							className="btn btn-close"
							onClick={onClose}
						>
							Close
						</button>
						<button
							type="button"
							className="btn btn-save"
							onClick={handleSave}
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default EditProfileModal
