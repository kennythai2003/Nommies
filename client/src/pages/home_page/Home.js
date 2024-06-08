import "./home.css";
import Navigation from "../common_components/Navigation";
import Homepage from "./components/Homepage";
import SearchBar from "./components/Searchbar";

function Home() {
  return (
    <>
      <Navigation></Navigation>
      <SearchBar></SearchBar>
      <Homepage></Homepage>
    </>
  );
}

export default Home;
