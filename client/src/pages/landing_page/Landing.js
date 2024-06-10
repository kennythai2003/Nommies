// import logo from "./logo.svg";
import "./landing.css";
import Landing from "./components/Landing";
// import Navigation from "./components/Navigation";
import Navigation from "../common_components/Navigation";
// import { GoogleLogin } from "@react-oauth/google";
// import React, { useState, useEffect } from "react";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";

function App() {
  return (
    <>
      <Navigation></Navigation>
      <Landing></Landing>
    </>
  );
}

export default App;
