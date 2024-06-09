// SearchBar.js
import "../styles/searchbar.css"; // Ensure you create and style this CSS file
import {FaSearch} from "react-icons/fa";
import React, {useState} from "react";
import {Outlet, Link} from "react-router-dom";



const SearchBar = () => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("http://localhost:8080/getRestaurants")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
            return value && 
            user && 
            user.name && 
            user.name.includes(value);
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const [results, setResults] = useState([]);

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input 
            placeholder="Search for restaurants, cuisines, or dishes" 
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            />
        </div>
      </div>
      <div className="results">
        {results.map((results, id) => {
          return (
            <Link key={id} to={`/restaurant`} className="result-item">
              {results.name}
            </Link>
          );
        })}
      </div>
      <Outlet></Outlet>
    </div>
  );
};

//{`/restaurant/${result.id}`}

export default SearchBar;
