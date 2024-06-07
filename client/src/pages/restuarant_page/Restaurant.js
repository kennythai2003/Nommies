// import logo from "./logo.svg";
import "./restaurant.css";
import Profile from "./components/Profile";
import Navigation from "../common_components/Navigation";
import Album from "./components/Album";
import Comments from "./components/Comments";

function Restaurant() {
  return (
    <body>
      <Navigation></Navigation>
      <Profile></Profile>
      <Comments></Comments>
      <Album></Album>
    </body>
  );
}

export default Restaurant;
