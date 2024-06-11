import "./navigation.css"
import { Outlet, Link } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import React, { useContext } from "react"
import AppContext from "../../context/AppContext"

function Navigation() {
	const { loggedIn } = useContext(AuthContext)
	const { modalVisible, setModalVisible } = useContext(AppContext)

	const openModal = () => {
		setModalVisible(true)
	}

	return (
		<header>
			<nav id="desktop-nav">
				<div className="logo">
					<p className="logo-text">nommies</p>
				</div>
				<div>
					<ul className="nav-links">
						<li>
							<img
								src="home_button.jpeg"
								alt="home"
								className="nav-icons"
							></img>
							<Link to="/landing">home</Link>
						</li>
						<li>
							<img
								src="bell.png"
								alt="notifications"
								className="nav-icons"
							></img>
							<Link to="/home">notifications</Link>
						</li>
						{loggedIn === true && (
							<>
								<li>
									<img
									// update icon
										src="user_prof.jpeg"
										alt="social"
										className="nav-icons"
									></img>
									<Link to="/social">social</Link>
								</li>
								<li>
									<img
										src="user_prof.jpeg"
										alt="profile"
										className="nav-icons"
									></img>
									<Link to="/user">your profile</Link>
								</li>
							</>
						)}
						{loggedIn === false && (
							<li>
								<img
									src="user_prof.jpeg"
									alt="profile"
									className="nav-icons"
								></img>
								<Link to="/landing" onClick={openModal}>
									sign in
								</Link>
							</li>
						)}
					</ul>
				</div>
			</nav>
			<Outlet></Outlet>
		</header>
	)
}

export default Navigation
