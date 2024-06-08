import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurant from "./pages/restuarant_page/Restaurant";
import Landing from "./pages/landing_page/Landing";
import User from "./pages/user_profile/User";
import Home from "./pages/home_page/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route index element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="user" element={<User />} />
        <Route path="landing" element={<Landing />} />
        <Route path="restaurant" element={<Restaurant />} />
        <Route path="*" element={<Landing />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
