import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./Context/AuthContext";
import "./i18nextInit";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
const root = ReactDOM.createRoot(document.getElementById("root"));
document.addEventListener("DOMContentLoaded", () => {
  const start = new Date().getTime();
  window.addEventListener("beforeunload", () => {
    const end = new Date().getTime();
    const totalTime = (end - start) / 1000;
    const data = {
      date: Date.now(),
      time: totalTime,
      user_id: localStorage.getItem("userID"),
    };
    axios.post(`${process.env.REACT_APP_BASE_URL}pulledStr/averageTime`, data);
  });
});
root.render(
  <>
    <GoogleOAuthProvider
      clientId={
        "750670617713-ui98njvoppd8evq323752skbaok6lr10.apps.googleusercontent.com"
      }
    >
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();
