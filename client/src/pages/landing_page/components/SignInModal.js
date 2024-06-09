import React, { useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import "../styles/signinmodal.css"
import axios from "axios"

const SignInModal = ({ setIsModalVisible }) => {
	const closeModal = () => {
		setIsModalVisible(false)
		revertToOriginal()
	}

	const [isOriginalState, setIsOriginalState] = useState(true)

	const [isEmailAlternate, setIsEmailAlternate] = useState(false)

	const [isModalAlternate, setIsModalAlternate] = useState(false)

	const setEmailAlternate = () => {
		setIsEmailAlternate(true)
		setIsOriginalState(false)
	}

	const revertToOriginal = () => {
		setIsModalAlternate(false)
		setIsOriginalState(true)
		setIsEmailAlternate(false)
	}

	const setModalAlternate = () => {
		setIsModalAlternate(true)
		setIsOriginalState(true)
		setIsEmailAlternate(false)
	}

	const revertModalAlternate = () => {
		setIsModalAlternate(false)
		setIsOriginalState(true)
	}

	const [emailLogIn, setEmailLogIn] = useState("")
	const [passwordLogIn, setPasswordLogIn] = useState("")

	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [emailSignUp, setEmailSignUp] = useState("")
	const [passwordSignUp, setPasswordSignUp] = useState("")

	const handleSubmitSignUp = async (e) => {
		e.preventDefault()

		try {
			const response = await axios.post("http://localhost:5001/signUp", {
				email: emailSignUp,
				password: passwordSignUp,
				firstname: firstName,
				lastname: lastName,
			})
			console.log(response.data)
			if (response.data.message === "User registered successfully!") {
				alert("Registration successful!")
				closeModal()
			} else if (response.data.message === "Email already exists") {
				alert("Registration error: Email occupied by another user.")
			} else {
				alert(response.data.message)
			}
		} catch (err) {
			console.error(err)
			alert("Error signing up")
		}
	}

	const handleSubmitLogIn = async (e) => {
		e.preventDefault()

		try {
			const response = await axios.post("http://localhost:5001/logIn", {
				email: emailLogIn,
				password: passwordLogIn,
			})
			console.log(response.data)
			if (response.data.message === "Log in successful!") {
				alert("Login successful!")
				closeModal()
			} else {
				alert(response.data.message)
			}
		} catch (err) {
			console.error(err)
			alert("Error logging in")
		}
	}

	const handleGoogleSuccess = async (response) => {
		try {
			const googleToken = response.credential
			const result = await axios.post(
				"http://localhost:5001/googleLogin",
				{
					token: googleToken,
				}
			)

			if (result.data.message === "User logged in successfully!") {
				alert("Login successful!")
				closeModal()
			} else if (result.data.message === "Email not recognized") {
				alert("Email not recognized. Please sign up.")
			} else {
				alert(result.data.message)
			}
		} catch (error) {
			console.error("Error logging in with Google", error)
			alert("Error logging in with Google")
		}
	}

	return (
		<div className="modal-overlay1" onClick={closeModal}>
			<div className="modal2" onClick={(e) => e.stopPropagation()}>
				<div className="top-bar">
					<img
						className="exit-button"
						src="Close.png"
						alt="X button to close sign in modal"
						onClick={closeModal}
					></img>
				</div>
				<div className="sign-in">
					<img
						className="profile-pic"
						src="Avatar.svg"
						alt="Empty Profile Pic"
					></img>
					<div className="sign-up-text">Sign up for Nommies</div>
					<div className="connect-text">
						Connect with other food enthusiasts
					</div>
					<div className="terms-of-service">
						By proceeding, you agree to Nommies' Terms of Service
						and acknowledge Nommies' Privacy Policy.
					</div>
					<div className="sign-in-col">
						{isOriginalState && (
							<div className="google-sign-in-option">
								<GoogleLogin
									className="sign-in-option"
									onSuccess={handleGoogleSuccess}
									onError={() => {
										alert(
											"Google Sign In was unsuccessful. Try again later"
										)
									}}
								/>
							</div>
						)}
						{!isModalAlternate && !isEmailAlternate && (
							<div
								className="email-sign-in-option"
								onClick={setEmailAlternate}
							>
								<img
									className="mail-icon"
									src="mail.png"
									alt="email icon"
								></img>
								Continue with email
							</div>
						)}
						{isEmailAlternate && (
							<div className="form-container">
								<form
									onSubmit={handleSubmitSignUp}
									className="registration-form"
								>
									<div className="name-group">
										<input
											type="text"
											id="firstName"
											value={firstName}
											onChange={(e) =>
												setFirstName(e.target.value)
											}
											placeholder="First name"
											required
										/>
										<div className="spacer"></div>
										<input
											type="text"
											id="lastName"
											value={lastName}
											onChange={(e) =>
												setLastName(e.target.value)
											}
											placeholder="Last name"
											required
										/>
									</div>
									<div className="form-group">
										<input
											type="email"
											id="email"
											value={emailSignUp}
											onChange={(e) =>
												setEmailSignUp(e.target.value)
											}
											placeholder="Email"
											required
										/>
									</div>
									<div className="form-group">
										<input
											type="password"
											id="password"
											value={passwordSignUp}
											onChange={(e) =>
												setPasswordSignUp(
													e.target.value
												)
											}
											placeholder="Password"
											required
										/>
									</div>
									<button
										type="submit"
										className="submit-button"
									>
										Register
									</button>
								</form>
							</div>
						)}
						{isModalAlternate && !isEmailAlternate && (
							<div>
								<div className="line-container">
									<span className="line"></span>
									<span className="or-text">or</span>
									<span className="line"></span>
								</div>
								<div className="form-container">
									<form
										onSubmit={handleSubmitLogIn}
										className="login-form"
									>
										<div className="form-group">
											<input
												type="email"
												id="email"
												value={emailLogIn}
												d
												onChange={(e) =>
													setEmailLogIn(
														e.target.value
													)
												}
												placeholder="Email"
												required
											/>
										</div>
										<div className="form-group">
											<input
												type="password"
												id="password"
												value={passwordLogIn}
												onChange={(e) =>
													setPasswordLogIn(
														e.target.value
													)
												}
												placeholder="Password"
												required
											/>
										</div>
										<button
											type="submit"
											className="submit-button"
										>
											Login
										</button>
									</form>
								</div>
							</div>
						)}
					</div>
					{!isModalAlternate && (
						<div className="log-in-option">
							Already on Nommies?{" "}
							<b onClick={setModalAlternate}>Log in</b>
						</div>
					)}
					{isModalAlternate && (
						<div>
							<div className="line-container">
								<span className="line"></span>
							</div>
							<div className="log-in-option">
								New to Nommies?{" "}
								<b onClick={revertModalAlternate}>Sign up</b>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default SignInModal
