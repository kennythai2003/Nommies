import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Restaurant from "./pages/restuarant_page/Restaurant"
import Landing from "./pages/landing_page/Landing"
import User from "./pages/user_profile/User"
import Home from "./pages/home_page/Home"
import Social from "./pages/social_page/Social"

import axious from "axios"
import { AuthContextProvider } from "./context/AuthContext"
import { AppContextProvider } from "./context/AppContext"

axious.defaults.withCredentials = true

export default function App() {
	return (
		<AuthContextProvider>
			<AppContextProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<Landing />} />
						<Route path="home" element={<Home />} />
						<Route path="user" element={<User />} />
						<Route path="social" element={<Social />} />
						<Route path="landing" element={<Landing />} />
						<Route path="restaurant" element={<Restaurant />} />
						<Route path="*" element={<Landing />} />
					</Routes>
				</BrowserRouter>
			</AppContextProvider>
		</AuthContextProvider>
	)
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
