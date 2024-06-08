import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { GoogleOAuthProvider } from "@react-oauth/google"
import reportWebVitals from "./reportWebVitals"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  // <GoogleOAuthProvider clientId="114694223970-ti04nghjquelhpm2o1hik665mu6kvvu4.apps.googleusercontent.com">
  <GoogleOAuthProvider clientId="679532241648-krbdoaos47u3u8t0go37b3865mn7q2k9.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()