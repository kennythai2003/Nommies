import "../styles/navigation.css";
import { Outlet, Link } from "react-router-dom";

function Navigation() {
  return (
    <header>
      <nav id="desktop-nav">
        <div className="logo">
          <p className="logo-text">nommies</p>
        </div>
        <div>
          <ul className="nav-links">
            <li>
              {/* <img
                src="home_button.jpeg"
                alt="home"
                className="nav-icons"
              ></img> */}
              <Link to="/home">home</Link>
            </li>
            <li>
              {/* <img
                src="bell.png"
                alt="notifications"
                className="nav-icons"
              ></img> */}
              <a href="#notifications">notifications</a>
            </li>
            <li>
              {/* <img
                src="user_prof.jpeg"
                alt="profile"
                className="nav-icons"
              ></img> */}
              <Link to="/user">your profile</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet></Outlet>
    </header>
  );
}

export default Navigation;
