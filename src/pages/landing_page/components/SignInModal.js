import React, { useState } from "react"
import "../styles/signinmodal.css"
import { GoogleLogin } from "@react-oauth/google"

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

  const handleSubmitLogIn = (e) => {
    e.preventDefault()
    console.log("Email:", emailLogIn)
    console.log("Password:", passwordLogIn)
  }

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailSignUp, setEmailSignUp] = useState("")
  const [passwordSignUp, setPasswordSignUp] = useState("")

  const handleSubmitSignUp = (e) => {
    e.preventDefault()
    console.log("First Name:", firstName)
    console.log("Last Name:", lastName)
    console.log("Email:", emailSignUp)
    console.log("Password:", passwordSignUp)
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
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
            By proceeding, you agree to Nommies' Terms of Service and
            acknowledge Nommies' Privacy Policy.
          </div>
          <div className="sign-in-col">
            {isOriginalState && (
              <div className="google-sign-in-option">
                <GoogleLogin className="sign-in-option" />
              </div>
            )}
            {!isModalAlternate && !isEmailAlternate && (
              <div className="email-sign-in-option" onClick={setEmailAlternate}>
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
                    {/* <div className="form-group"> */}
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      required
                    />
                    {/* </div> */}
                    <div className="spacer"></div>
                    {/* <div className="form-group"> */}
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      required
                    />
                    {/* </div> */}
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      value={emailSignUp}
                      onChange={(e) => setEmailSignUp(e.target.value)}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      id="password"
                      value={passwordSignUp}
                      onChange={(e) => setPasswordSignUp(e.target.value)}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button type="submit" className="submit-button">
                    Register
                  </button>
                </form>
              </div>
            )}
            {isModalAlternate && !isEmailAlternate && (
              <div>
                <div class="line-container">
                  <span class="line"></span>
                  <span class="or-text">or</span>
                  <span class="line"></span>
                </div>
                <div className="form-container">
                  <form onSubmit={handleSubmitLogIn} className="login-form">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        value={emailLogIn}
                        d
                        onChange={(e) => setEmailLogIn(e.target.value)}
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        id="password"
                        value={passwordLogIn}
                        onChange={(e) => setPasswordLogIn(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <button type="submit" className="submit-button">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
          {!isModalAlternate && (
            <div className="log-in-option">
              Already on Nommies? <b onClick={setModalAlternate}>Log in</b>
            </div>
          )}
          {isModalAlternate && (
            <div>
              <div class="line-container">
                <span class="line"></span>
              </div>
              <div className="log-in-option">
                New to Nommies? <b onClick={revertModalAlternate}>Sign up</b>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignInModal
